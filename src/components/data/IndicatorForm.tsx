import { useStore } from '../../store/store';
import { Button } from '../ui/Button';
import type { Province } from '../../types';
import { useState } from 'react';

export function IndicatorForm() {
    const { provinces } = useStore();
    const { updateProvince, addIndicator } = useStore((state) => ({
        updateProvince: state.updateProvince,
        addIndicator: state.addIndicator
    }));
    const [uploading, setUploading] = useState(false);

    const handleAddIndicator = () => {
        const name = prompt('Enter indicator name (e.g., "digital_literacy"):');
        if (!name) return;

        addIndicator('', name.toLowerCase());
    };

    // CSV Export of current indicators
    const handleDownloadCsv = () => {
        // union of indicator keys across provinces
        const keys = new Set<string>(['provinceId', 'provinceName']);
        provinces.forEach(p => Object.keys(p.indicators).forEach(k => keys.add(k)));
        const headers = Array.from(keys);

        const esc = (val: any) => {
            if (val == null) return '';
            const s = String(val);
            return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
        };

        const rows = provinces.map((p) => {
            const row: Record<string, string | number> = {
                provinceId: p.id,
                provinceName: p.name,
            };
            headers.forEach(h => {
                if (h === 'provinceId' || h === 'provinceName') return;
                const v = (p.indicators as any)[h];
                row[h] = typeof v === 'number' ? v : (v ?? '');
            });
            return headers.map(h => esc(row[h] ?? '')).join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'province-indicators.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // CSV Import to update indicators in bulk
    const handleUploadCsv = async (file: File) => {
        setUploading(true);
        try {
            const text = await file.text();
            const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
            if (lines.length < 2) return;
            const headers = lines[0].split(',').map(h => h.trim());
            const idIdx = headers.findIndex(h => h.toLowerCase() === 'provinceid');
            const nameIdx = headers.findIndex(h => h.toLowerCase() === 'provincename');

            const indicatorCols = headers.filter(h => h.toLowerCase() !== 'provinceid' && h.toLowerCase() !== 'provincename');

            const byId: Record<string, Province> = Object.fromEntries(provinces.map(p => [p.id, p]));
            const byName: Record<string, Province> = Object.fromEntries(provinces.map(p => [p.name.toLowerCase(), p]));

            for (let i = 1; i < lines.length; i++) {
                const raw = lines[i];
                // naive CSV split (works for our simple template without embedded commas)
                const cols = raw.split(',');
                if (cols.length === 0) continue;
                const pid = idIdx >= 0 ? cols[idIdx]?.trim() : '';
                const pname = nameIdx >= 0 ? cols[nameIdx]?.trim().toLowerCase() : '';
                const target = (pid && byId[pid]) || (pname && byName[pname]);
                if (!target) continue;

                const updated: Province = { ...target, indicators: { ...target.indicators } };
                indicatorCols.forEach((key) => {
                    const kIdx = headers.indexOf(key);
                    if (kIdx < 0) return;
                    const v = cols[kIdx];
                    if (v == null || v === '') return;
                    const num = Number(v);
                    if (!Number.isNaN(num)) {
                        (updated.indicators as any)[key] = num;
                    }
                });
                updateProvince(updated.id, updated);
            }
        } finally {
            setUploading(false);
        }
    };


    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleDownloadCsv}
                        variant="outline"
                        className="bg-green-600 text-white hover:bg-green-700 border-0"
                    >
                        Download CSV
                    </Button>
                    <label className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded border cursor-pointer hover:bg-gray-50">
                        <input
                            type="file"
                            accept=".csv,text/csv"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) void handleUploadCsv(f);
                                e.currentTarget.value = '';
                            }}
                        />
                        {uploading ? 'Uploading...' : 'Upload CSV'}
                    </label>
                </div>
                <Button onClick={handleAddIndicator} variant="outline" className="border-gray-300">
                    Add New Indicator Field
                </Button>
            </div>

            <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">Province</th>
                            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">Indicators</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {provinces.map((province) => (
                            <tr key={province.id} className="hover:bg-gray-50">
                                <td className="py-4">
                                    <div className="text-sm font-medium text-gray-900">{province.name}</div>
                                </td>
                                <td className="py-4">
                                    <div className="space-y-2">
                                        {Object.keys(province.indicators)
                                            .sort((a, b) => {
                                                const p = (id: string) => (id.toLowerCase() === 'icor2024' ? 0 : id.toLowerCase() === 'icor2025' ? 1 : 2);
                                                const pa = p(a), pb = p(b);
                                                if (pa !== pb) return pa - pb;
                                                return a.localeCompare(b);
                                            })
                                            .map((key) => {
                                                const value = (province.indicators as any)[key];
                                                const label = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                                const isRatio = key.includes('ratio');
                                                const isIcor = key.toLowerCase().startsWith('icor');
                                                return (
                                                    <div key={key} className="text-sm text-gray-500">
                                                        {label}:{isRatio ? ` 1:${value}` : isIcor ? ` ${value}` : ` ${value}%`}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}