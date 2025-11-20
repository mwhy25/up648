import type { ReactNode } from 'react';

interface DataLegendProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export function DataLegend({ title, children, className = '' }: DataLegendProps) {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border ${className}`}>
            <h4 className="text-sm font-medium text-gray-900 mb-3">{title}</h4>
            {children}
        </div>
    );
}

interface LegendItemProps {
    color: string;
    label: string;
    value?: string | number;
}

export function LegendItem({ color, label, value }: LegendItemProps) {
    return (
        <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
                <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className="text-gray-600">{label}</span>
            </div>
            {value && (
                <span className="text-gray-900 font-medium">{value}</span>
            )}
        </div>
    );
}