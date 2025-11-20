import { useRef, useEffect, useState } from 'react';
import type { Province } from '../../types';

interface Props {
    provinces: Province[];
    metric: string;
    getValue: (province: Province) => number;
    formatValue?: (value: number) => string;
    className?: string;
    sortAscending?: boolean;
}

export function ProvinceChart({
    provinces,
    metric,
    getValue,
    formatValue = (v: number) => `${v.toFixed(1)}%`,
    className = '',
    sortAscending = false
}: Props) {
    const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sort provinces by value
        const sortedProvinces = [...provinces].sort((a, b) =>
            sortAscending ? getValue(a) - getValue(b) : getValue(b) - getValue(a)
        );

        // Find max and average values for scaling/reference
        const values = provinces.map(getValue);
        const maxValue = Math.max(...values, 1);
        const avgValue = values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1);
        const scale = (canvas.height - 60) / maxValue; // Leave space for labels

        // Draw bars
        const barWidth = (canvas.width - 40) / provinces.length;
        const gap = 2;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Find hovered province
            const barIndex = Math.floor((x - 20) / barWidth);
            const province = sortedProvinces[barIndex];

            if (province && x >= 20 && x <= canvas.width - 20) {
                const value = getValue(province);
                const barHeight = value * scale;
                const barY = canvas.height - 30 - barHeight;

                if (y >= barY && y <= canvas.height - 30) {
                    setHoveredProvince(province);
                    return;
                }
            }

            setHoveredProvince(null);
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        // Draw chart
        sortedProvinces.forEach((province, i) => {
            const value = getValue(province);
            const barHeight = value * scale;
            const x = 20 + i * barWidth;
            const y = canvas.height - 30 - barHeight;

            // Draw bar
            ctx.fillStyle = province === hoveredProvince
                ? '#0ea5e9' // sky-500 for hover
                : getBarColor(value, maxValue);
            ctx.fillRect(x, y, barWidth - gap, barHeight);

            // Draw value
            ctx.fillStyle = '#374151';
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(formatValue(value), x + (barWidth - gap) / 2, y - 4);

            // Draw province name
            ctx.save();
            ctx.translate(x + (barWidth - gap) / 2, canvas.height - 10);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(province.name, 0, 0);
            ctx.restore();

            // Draw hover tooltip
            if (province === hoveredProvince) {
                const tooltipX = x + (barWidth - gap) / 2;
                const tooltipY = y - 20;
                const tooltipText = `${province.name}: ${formatValue(value)}`;
                const tooltipWidth = ctx.measureText(tooltipText).width + 16;
                const tooltipHeight = 24;

                // Background
                ctx.fillStyle = '#1f2937'; // gray-800
                ctx.beginPath();
                ctx.roundRect(
                    tooltipX - tooltipWidth / 2,
                    tooltipY - tooltipHeight,
                    tooltipWidth,
                    tooltipHeight,
                    4
                );
                ctx.fill();

                // Text
                ctx.fillStyle = '#ffffff';
                ctx.fillText(tooltipText, tooltipX, tooltipY - tooltipHeight / 2 + 4);
            }
        });

        // Draw average reference line and label
        const avgY = canvas.height - 30 - avgValue * scale;
        ctx.save();
        ctx.strokeStyle = '#6b7280'; // gray-500
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(20, avgY);
        ctx.lineTo(canvas.width - 20, avgY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#374151'; // gray-700
        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`Avg: ${formatValue(avgValue)}`, canvas.width - 24, Math.max(12, avgY - 6));
        ctx.restore();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [provinces, metric, getValue, formatValue, sortAscending, hoveredProvince]);

    return (
        <div className={className}>
            <div className="mb-2 text-sm font-medium text-gray-900">{metric}</div>
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-auto"
            />
        </div>
    );
}

function getBarColor(value: number, maxValue: number): string {
    const ratio = value / maxValue;
    if (ratio >= 0.75) return '#22c55e'; // green-500
    if (ratio >= 0.5) return '#f97316';  // orange-500
    if (ratio >= 0.25) return '#eab308'; // yellow-500
    return '#ef4444';                    // red-500
}