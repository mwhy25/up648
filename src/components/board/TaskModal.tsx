import { useMemo, useState } from 'react';
import type { Task } from '../../types';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/store';

interface TaskModalProps {
    task: Task;
    onClose: () => void;
}

export function TaskModal({ task, onClose }: TaskModalProps) {
    const [amount, setAmount] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [files, setFiles] = useState<FileList | null>(null);
    const updateTask = useStore(s => s.updateTask);

    const [plannedPct, setPlannedPct] = useState<string>('');
    const [actualPct, setActualPct] = useState<string>('');
    const [status, setStatus] = useState<'on_track' | 'at_risk' | 'delayed'>('on_track');
    const [activities, setActivities] = useState<string>('');
    const [issues, setIssues] = useState<string>('');
    const [nextMilestone, setNextMilestone] = useState<string>('');
    const [nextDate, setNextDate] = useState<string>('');
    const [evidence, setEvidence] = useState<FileList | null>(null);
    const [sCurveFinancial, setSCurveFinancial] = useState<string | null>(null);
    const [sCurvePhysical, setSCurvePhysical] = useState<string | null>(null);

    const baseTotal = Math.max(1, task.budgetTotal);
    const rawPct = useMemo(() => Math.round((task.budgetAbsorbed / baseTotal) * 100), [task, baseTotal]);
    const barWidth = Math.max(0, Math.min(100, rawPct));
    const overLimit = rawPct > 100;

    const preview = useMemo(() => {
        const add = Number(amount) || 0;
        const nextAbsorbed = Math.max(0, task.budgetAbsorbed + add);
        const nextRaw = Math.round((nextAbsorbed / baseTotal) * 100);
        return {
            raw: nextRaw,
            width: Math.max(0, Math.min(100, nextRaw)),
            over: nextRaw > 100,
        };
    }, [amount, task, baseTotal]);

    function saveAbsorptionLog() {
        const add = Number(amount) || 0;
        if (add === 0) return;
        const newAbsorbed = Math.max(0, task.budgetAbsorbed + add);
        updateTask(task.id, { budgetAbsorbed: newAbsorbed, budgetNote: note || undefined } as any);
        setAmount('');
        setNote('');
    }

    const plannedNum = Math.max(0, Math.min(100, Number(plannedPct) || 0));
    const actualNum = Math.max(0, Math.min(100, Number(actualPct) || 0));
    const variance = Number((actualNum - plannedNum).toFixed(1));

    function saveMonitoringUpdate() {
        setPlannedPct('');
        setActualPct('');
        setStatus('on_track');
        setActivities('');
        setIssues('');
        setNextMilestone('');
        setNextDate('');
        setEvidence(null);
        window.alert('Monitoring update saved');
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
                        <div className="mt-1 text-sm text-gray-500">
                            {task.project} • {task.province} • {task.sprint}
                        </div>

               
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 p-2 rounded hover:bg-gray-100"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="text-sm text-gray-700">Budget absorption</div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>Current</span>
                                <span className={cn('font-medium', overLimit && 'text-red-600')}>{rawPct}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded">
                                <div className={cn('h-2 rounded', overLimit ? 'bg-red-500' : 'bg-green-500')} style={{ width: `${barWidth}%` }} />
                            </div>
                        </div>

                        <div className="space-y-2 mt-3">
                            <label className="block text-xs text-gray-600 ">Add absorption amount (IDR)</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                placeholder="e.g. 5000000"
                            />
                            <label className="block text-xs text-gray-600 mt-2">Note</label>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                                placeholder="Reason or comment"
                            />
                            <div className="text-xs text-gray-500">
                                Budget total: {task.budgetTotal.toLocaleString('id-ID')} • Absorbed: {task.budgetAbsorbed.toLocaleString('id-ID')}
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Preview after adding</span>
                                    <span className={cn('font-medium', preview.over && 'text-red-600')}>{preview.raw}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded">
                                    <div className={cn('h-2 rounded', preview.over ? 'bg-red-500' : 'bg-green-500')} style={{ width: `${preview.width}%` }} />
                                </div>
                            </div>
                            <div className="pt-2">
                                <button onClick={saveAbsorptionLog} className="px-3 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">Save log</button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="text-sm text-gray-700">Upload project presentation</div>
                        <label className={cn(
                            'flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded cursor-pointer',
                            'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 text-sm'
                        )}>
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFiles(e.target.files)}
                                accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg,.webp,.zip"
                            />
                            <span>Click to choose file</span>
                            <span className="text-xs text-gray-400">PDF, PPT, DOC, images, or ZIP</span>
                        </label>

                        {files && files.length > 0 && (
                            <div className="border rounded p-3 text-sm">
                                <div className="font-medium mb-2">Selected file</div>
                                <ul className="list-disc ml-5 space-y-1">
                                    {[...Array(files.length)].map((_, i) => (
                                        <li key={i}>{files.item(i)?.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* S-Curve images */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">S-Curve — Financial Plan</div>
                        <div className="border rounded p-3 bg-gray-50">
                            {sCurveFinancial ? (
                                <img src={sCurveFinancial} alt="S-curve Financial" className="w-full h-56 object-contain bg-white rounded" />
                            ) : (
                                <div className="h-56 bg-white rounded flex items-center justify-center">
                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                        <rect x="0" y="0" width="200" height="100" fill="white" />
                                        <path d="M10 90 C 40 80, 60 60, 90 40 S 150 20, 190 10" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                                        <path d="M10 90 C 40 85, 60 70, 90 55 S 150 35, 190 25" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                                        <text x="12" y="12" fontSize="8" fill="#64748b">Planned vs Actual</text>
                                        <circle cx="170" cy="80" r="3" fill="#0ea5e9" />
                                        <text x="176" y="83" fontSize="7" fill="#475569">Actual</text>
                                        <circle cx="170" cy="90" r="3" fill="#f59e0b" />
                                        <text x="176" y="93" fontSize="7" fill="#475569">Planned</text>
                                    </svg>
                                </div>
                            )}
                            <div className="mt-3">
                                <label className={cn('flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded cursor-pointer','border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 text-sm')}>
                                    <input type="file" accept=".png,.jpg,.jpeg,.webp,.svg" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSCurveFinancial(URL.createObjectURL(f)); }} />
                                    <span>Upload financial S-curve</span>
                                    <span className="text-xs text-gray-400">PNG, JPG, WEBP, or SVG</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">S-Curve — Physical Plan</div>
                        <div className="border rounded p-3 bg-gray-50">
                            {sCurvePhysical ? (
                                <img src={sCurvePhysical} alt="S-curve Physical" className="w-full h-56 object-contain bg-white rounded" />
                            ) : (
                                <div className="h-56 bg-white rounded flex items-center justify-center">
                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                        <rect x="0" y="0" width="200" height="100" fill="white" />
                                        <path d="M10 90 C 30 75, 50 65, 80 45 S 140 28, 190 15" stroke="#16a34a" strokeWidth="2" fill="none" />
                                        <path d="M10 90 C 30 78, 50 70, 80 55 S 140 35, 190 25" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="4 3" />
                                        <text x="12" y="12" fontSize="8" fill="#64748b">Planned vs Actual</text>
                                        <circle cx="170" cy="80" r="3" fill="#16a34a" />
                                        <text x="176" y="83" fontSize="7" fill="#475569">Actual</text>
                                        <circle cx="170" cy="90" r="3" fill="#ef4444" />
                                        <text x="176" y="93" fontSize="7" fill="#475569">Planned</text>
                                    </svg>
                                </div>
                            )}
                            <div className="mt-3">
                                <label className={cn('flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded cursor-pointer','border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 text-sm')}>
                                    <input type="file" accept=".png,.jpg,.jpeg,.webp,.svg" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSCurvePhysical(URL.createObjectURL(f)); }} />
                                    <span>Upload physical S-curve</span>
                                    <span className="text-xs text-gray-400">PNG, JPG, WEBP, or SVG</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">Construction Monitoring Update</div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Planned progress (%)</label>
                                <input type="number" value={plannedPct} onChange={(e) => setPlannedPct(e.target.value)}
                                       className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" placeholder="e.g. 45" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Actual progress (%)</label>
                                <input type="number" value={actualPct} onChange={(e) => setActualPct(e.target.value)}
                                       className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" placeholder="e.g. 42" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="text-gray-600">Variance</div>
                            <div className={cn('px-2 py-1 rounded text-xs font-medium', variance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                                {variance}%
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1 ">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full border rounded px-2 py-2 text-sm bg-white">
                                <option value="on_track">On track</option>
                                <option value="at_risk">At risk</option>
                                <option value="delayed">Delayed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Key activities</label>
                            <textarea value={activities} onChange={(e) => setActivities(e.target.value)} rows={3}
                                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Issues / risks</label>
                            <textarea value={issues} onChange={(e) => setIssues(e.target.value)} rows={3}
                                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Next milestone</label>
                                <input type="text" value={nextMilestone} onChange={(e) => setNextMilestone(e.target.value)}
                                       className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" placeholder="e.g. Structure completion" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Expected date</label>
                                <input type="date" value={nextDate} onChange={(e) => setNextDate(e.target.value)}
                                       className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Evidence photos/documents</label>
                            <label className={cn(
                                'flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded cursor-pointer',
                                'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 text-sm'
                            )}>
                                <input type="file" className="hidden" multiple onChange={(e) => setEvidence(e.target.files)} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.zip" />
                                <span>Click to add evidence</span>
                                <span className="text-xs text-gray-400">PDF, DOC, images, or ZIP</span>
                            </label>
                            {evidence && evidence.length > 0 && (
                                <div className="border rounded p-3 text-sm mt-3">
                                    <div className="font-medium mb-2">Selected</div>
                                    <ul className="list-disc ml-5 space-y-1">
                                        {[...Array(evidence.length)].map((_, i) => (
                                            <li key={i}>{evidence.item(i)?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button onClick={saveMonitoringUpdate} className="px-4 py-2 text-sm rounded bg-emerald-600 text-white hover:bg-emerald-700">Save update</button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 text-sm rounded bg-orange-600 text-white opacity-60 cursor-not-allowed"
                        title="Display only"
                        disabled
                    >
                        Save (disabled)
                    </button>
                </div>

                 {/* Budget Logs */}
                {task.budgetLogs && task.budgetLogs.length > 0 && (
                    <div className="mt-6">
                        <div className="text-sm font-medium text-gray-900 mb-2">Budget logs</div>
                        <div className="divide-y divide-gray-100 border rounded">
                            {[...task.budgetLogs].reverse().map((log, i) => (
                                <div key={i} className="p-3 flex items-start justify-between text-sm">
                                    <div className="min-w-0 pr-3 text-gray-700">
                                        <span className={cn('px-2 py-0.5 rounded border mr-2',
                                            log.field === 'budgetAbsorbed' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                        )}>
                                            {log.field === 'budgetAbsorbed' ? 'Absorbed' : 'Total'}
                                        </span>
                                        <span>{log.from.toLocaleString()} → <span className="font-semibold">{log.to.toLocaleString()}</span></span>
                                        {log.note && <span className="ml-2 italic text-gray-500">“{log.note}”</span>}
                                    </div>
                                    <div className="shrink-0 text-xs text-gray-500">{new Date(log.at).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
