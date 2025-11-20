import { useState, useRef } from 'react';
import { useStore } from '../store/store';
import { ProvinceChart } from '../components/data/ProvinceChart';

// tabs removed; charts now render as a single vertical stack

type SortState = {
    gdp: boolean;
    unemployment: boolean;
    poverty: boolean;
    infrastructure: boolean;
    urbanization: boolean;
    internet: boolean;
    literacy: boolean;
    enrollment: boolean;
    teacherRatio: boolean;
};

export default function Overview() {
    const { provinces, tasks, filters } = useStore((s) => ({ provinces: s.provinces, tasks: s.tasks, filters: s.filters }));
    const chartsRef = useRef<HTMLDivElement>(null);
    const chartAnchors = {
        icor2024: useRef<HTMLDivElement>(null),
        icor2025: useRef<HTMLDivElement>(null),
        gdp: useRef<HTMLDivElement>(null),
        unemployment: useRef<HTMLDivElement>(null),
        poverty: useRef<HTMLDivElement>(null),
        infrastructure: useRef<HTMLDivElement>(null),
        urbanization: useRef<HTMLDivElement>(null),
        internet: useRef<HTMLDivElement>(null),
        literacy: useRef<HTMLDivElement>(null),
        enrollment: useRef<HTMLDivElement>(null),
        teacherRatio: useRef<HTMLDivElement>(null),
    } as const;
    const [chartSort, _] = useState<SortState>({
        gdp: false,
        unemployment: false,
        poverty: false,
        infrastructure: false,
        urbanization: false,
        internet: false,
        literacy: false,
        enrollment: false,
        teacherRatio: false
    });

    // Calculate task statistics
    const taskStats = {
        total: tasks.length,
        backlog: tasks.filter(t => t.stage === 'backlog').length,
        backlogVerification: tasks.filter(t => t.stage === 'backlog-verification').length,
        procurement: tasks.filter(t => t.stage === 'procurement').length,
        procurementVerification: tasks.filter(t => t.stage === 'procurement-verification').length,
        construction: tasks.filter(t => t.stage === 'construction').length,
        constructionVerification: tasks.filter(t => t.stage === 'construction-verification').length,
        handover: tasks.filter(t => t.stage === 'handover').length,
        done: tasks.filter(t => t.stage === 'done').length,
    };

    // Calculate summary statistics
    const stats = {
        avgGDP: provinces.reduce((sum, p) => sum + p.indicators.gdp, 0) / provinces.length,
        avgUnemployment: provinces.reduce((sum, p) => sum + p.indicators.unemployment, 0) / provinces.length,
        avgPovertyRate: provinces.reduce((sum, p) => sum + p.indicators.povertyRate, 0) / provinces.length,
        avgInfrastructure: provinces.reduce((sum, p) => sum + p.indicators.infrastructureIndex, 0) / provinces.length,
        avgUrbanization: provinces.reduce((sum, p) => sum + p.indicators.urbanizationRate, 0) / provinces.length,
        avgInternet: provinces.reduce((sum, p) => sum + p.indicators.internetAccess, 0) / provinces.length,
        avgLiteracy: provinces.reduce((sum, p) => sum + p.indicators.literacyRate, 0) / provinces.length,
        avgEnrollment: provinces.reduce((sum, p) => sum + p.indicators.schoolEnrollment, 0) / provinces.length,
        avgTeacherRatio: provinces.reduce((sum, p) => sum + p.indicators.teacherRatio, 0) / provinces.length
    };

    // no overlay->tab mapping needed; we only scroll to charts

    function avgForOverlay(id: string): string {
        switch (id) {
            case 'gdp': return `${stats.avgGDP.toFixed(1)}%`;
            case 'unemployment': return `${stats.avgUnemployment.toFixed(1)}%`;
            case 'poverty': return `${stats.avgPovertyRate.toFixed(1)}%`;
            case 'infrastructure': return `${stats.avgInfrastructure.toFixed(1)}%`;
            case 'urbanization': return `${stats.avgUrbanization.toFixed(1)}%`;
            case 'internet': return `${stats.avgInternet.toFixed(1)}%`;
            case 'literacy': return `${stats.avgLiteracy.toFixed(1)}%`;
            case 'enrollment': return `${stats.avgEnrollment.toFixed(1)}%`;
            case 'teacherRatio': return `1:${stats.avgTeacherRatio.toFixed(1)}`;
            case 'icor2024': {
                const avg = provinces.reduce((s, p) => s + ((p.indicators as any).icor2024 ?? 0), 0) / provinces.length;
                return `${avg.toFixed(2)}`;
            }
            case 'icor2025': {
                const avg = provinces.reduce((s, p) => s + ((p.indicators as any).icor2025 ?? 0), 0) / provinces.length;
                return `${avg.toFixed(2)}`;
            }
            default: return '-';
        }
    }

    function avgForOverlayNumeric(id: string): number {
        switch (id) {
            case 'gdp': return provinces.reduce((s, p) => s + p.indicators.gdp, 0) / provinces.length;
            case 'unemployment': return provinces.reduce((s, p) => s + p.indicators.unemployment, 0) / provinces.length;
            case 'poverty': return provinces.reduce((s, p) => s + p.indicators.povertyRate, 0) / provinces.length;
            case 'infrastructure': return provinces.reduce((s, p) => s + p.indicators.infrastructureIndex, 0) / provinces.length;
            case 'urbanization': return provinces.reduce((s, p) => s + p.indicators.urbanizationRate, 0) / provinces.length;
            case 'internet': return provinces.reduce((s, p) => s + p.indicators.internetAccess, 0) / provinces.length;
            case 'literacy': return provinces.reduce((s, p) => s + p.indicators.literacyRate, 0) / provinces.length;
            case 'enrollment': return provinces.reduce((s, p) => s + p.indicators.schoolEnrollment, 0) / provinces.length;
            case 'teacherRatio': return provinces.reduce((s, p) => s + p.indicators.teacherRatio, 0) / provinces.length;
            case 'icor2024': return provinces.reduce((s, p) => s + (((p.indicators as any).icor2024) ?? 0), 0) / provinces.length;
            case 'icor2025': return provinces.reduce((s, p) => s + (((p.indicators as any).icor2025) ?? 0), 0) / provinces.length;
            default: return 0;
        }
    }

    function badgeFor(id: string, value: number): string {
        // Simple thresholds; adjust per metric semantics
        if (id === 'icor2024' || id === 'icor2025' || id === 'unemployment' || id === 'poverty' || id === 'teacherRatio') {
            // Lower is better
            if (value <= 5) return 'bg-green-100 text-green-800';
            if (value <= 10) return 'bg-yellow-100 text-yellow-800';
            return 'bg-red-100 text-red-800';
        }
        // Higher is better
        if (value >= 75) return 'bg-green-100 text-green-800';
        if (value >= 50) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    }

    function goToChartFor(id: string) {
        const ref = (chartAnchors as any)[id] as React.RefObject<HTMLDivElement> | undefined;
        const target = ref?.current || chartsRef.current;
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const provinceAttention = (() => {
        const now = Date.now();
        return provinces.map(p => {
            const pTasks = tasks.filter(t => t.province === p.id);
            const total = pTasks.length || 1;
            const done = pTasks.filter(t => t.stage === 'done').length;
            const progress = (done / total) * 100;
            const daysLagAvg = pTasks.length > 0
                ? pTasks.reduce((s, t) => s + Math.floor((now - t.updatedAt.getTime()) / (1000 * 60 * 60 * 24)), 0) / pTasks.length
                : 0;
            const overBudget = pTasks.filter(t => t.budgetAbsorbed > t.budgetTotal).length;
            const ind = p.indicators;
            const risk = (
                (100 - Math.min(100, ind.infrastructureIndex)) * 0.25 +
                ind.povertyRate * 0.25 +
                (100 - Math.min(100, ind.internetAccess)) * 0.15 +
                ind.unemployment * 0.1 +
                Math.max(0, 30 - ind.teacherRatio) * 0.05 +
                Math.max(0, 50 - progress) * 0.15 +
                Math.min(100, daysLagAvg) * 0.05
            );
            return {
                id: p.id,
                name: p.name,
                risk: Number(risk.toFixed(1)),
                progress: Number(progress.toFixed(1)),
                overBudget,
                tasks: pTasks.length,
            };
        }).sort((a, b) => b.risk - a.risk).slice(0, 5);
    })();

    

    const projectAttention = (() => {
        const now = Date.now();
        const byProject: Record<string, typeof tasks> = {} as any;
        tasks.forEach(t => {
            byProject[t.project] = byProject[t.project] || [];
            byProject[t.project].push(t);
        });
        return Object.entries(byProject).map(([project, list]) => {
            const total = list.length || 1;
            const done = list.filter(t => t.stage === 'done').length;
            const progress = (done / total) * 100;
            const overBudget = list.filter(t => t.budgetAbsorbed > t.budgetTotal).length;
            const stalled = list.filter(t => (now - t.updatedAt.getTime()) / (1000 * 60 * 60 * 24) > 10).length;
            const backlogHeavy = list.filter(t => t.stage === 'backlog' || t.stage === 'backlog-verification').length;
            const score = overBudget * 3 + stalled * 2 + backlogHeavy * 1 + Math.max(0, 50 - progress) / 10;
            return {
                project,
                score: Number(score.toFixed(1)),
                progress: Number(progress.toFixed(1)),
                overBudget,
                stalled,
                total: list.length,
            };
        }).sort((a, b) => b.score - a.score).slice(0, 5);
    })();

    const taskAttention = (() => {
        const now = Date.now();
        return tasks.map(t => {
            const daysSinceUpdate = Math.floor((now - t.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
            const stalled = daysSinceUpdate > 10 ? 1 : 0;
            const overBudget = t.budgetAbsorbed > t.budgetTotal ? 1 : 0;
            const earlyStage = (t.stage === 'backlog' || t.stage === 'backlog-verification') ? 1 : 0;
            const score = overBudget * 3 + stalled * 2 + earlyStage * 1;
            return {
                id: t.id,
                title: t.title,
                project: t.project,
                province: t.province,
                stage: t.stage,
                daysSinceUpdate,
                overBudget: overBudget === 1,
                score: Number(score.toFixed(1)),
            };
        }).sort((a, b) => b.score - a.score || b.daysSinceUpdate - a.daysSinceUpdate).slice(0, 8);
    })();

    

    

    const [budgetLogLimit, setBudgetLogLimit] = useState(10);

    return (
        <div className="w-full space-y-6">
            {/* AI Recommendations */}
            <div className="p-6 rounded-lg border shadow-sm w-full bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-700 shadow-sm">
                            {/* Sparkles icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M12 3l2.122 5.303L19.5 10.5l-5.378 2.197L12 18l-2.122-5.303L4.5 10.5l5.378-2.197L12 3z"/>
                                <path d="M6 2.5l1.061 2.651L9.75 6.25 7.061 7.349 6 10l-1.061-2.651L2.25 6.25l2.689-1.099L6 2.5z"/>
                                <path d="M18 2.5l1.061 2.651L21.75 6.25 19.061 7.349 18 10l-1.061-2.651L14.25 6.25l2.689-1.099L18 2.5z"/>
                            </svg>
                        </span>
                        <h3 className="text-lg font-semibold text-orange-900 tracking-tight">AI Recommendations</h3>
                    </div>
                    <span className="text-xs text-orange-700/80">Auto-generated from current indicators and tasks</span>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Projects Needing Attention</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {projectAttention.map((p) => (
                                <div key={`proj-${p.project}`} className="flex items-center justify-between p-3 bg-white/80 rounded border border-orange-200 hover:shadow-md hover:border-orange-300 transition">
                                    <div>
                                        <div className="font-medium text-gray-900">{p.project}</div>
                                        <div className="text-xs text-gray-600">Progress {p.progress}% • Over budget {p.overBudget} • Stalled {p.stalled}</div>
                                    </div>
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-orange-600/10 text-orange-800 border border-orange-300">Score {p.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Tasks Needing Attention</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {taskAttention.map((t) => (
                                <div key={`task-${t.id}`} className="flex items-center justify-between p-3 bg-white/80 rounded border border-amber-200 hover:shadow-md hover:border-amber-300 transition">
                                    <div className="min-w-0">
                                        <div className="font-medium text-gray-900 truncate">{t.title}</div>
                                        <div className="text-xs text-gray-600 truncate">{t.project} • {t.province} • {t.stage.replace('-', ' ')}</div>
                                        <div className="text-xs text-gray-600">{t.overBudget ? 'Over budget' : 'On budget'} • {t.daysSinceUpdate}d since update</div>
                                    </div>
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-amber-600/10 text-amber-800 border border-amber-300">Score {t.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Provinces Needing Attention</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {provinceAttention.map((p) => (
                                <div key={`prov-${p.id}`} className="flex items-center justify-between p-3 bg-white/80 rounded border border-red-200 hover:shadow-md hover:border-red-300 transition">
                                    <div>
                                        <div className="font-medium text-gray-900">{p.name}</div>
                                        <div className="text-xs text-gray-600">Progress {p.progress}% • Over budget {p.overBudget} • Tasks {p.tasks}</div>
                                    </div>
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-red-600/10 text-red-800 border border-red-300">Risk {p.risk}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Task Overview */}
            <div className="bg-white p-6 rounded-lg border shadow-sm w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Task Overview</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Total Tasks</div>
                        <div className="text-2xl font-semibold text-gray-900">{taskStats.total}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Backlog</span>
                            <span className="font-medium">{taskStats.backlog}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Backlog Verification</span>
                            <span className="font-medium">{taskStats.backlogVerification}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Procurement</span>
                            <span className="font-medium">{taskStats.procurement}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Procurement Verification</span>
                            <span className="font-medium">{taskStats.procurementVerification}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Construction</span>
                            <span className="font-medium">{taskStats.construction}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Construction Verification</span>
                            <span className="font-medium">{taskStats.constructionVerification}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Handover</span>
                            <span className="font-medium">{taskStats.handover}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Done</span>
                            <span className="font-medium">{taskStats.done}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicator Summary + Charts side-by-side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Indicator Summary</h3>
                            <span className="text-xs text-gray-500">Click a card to view charts</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {(filters.overlays.length > 0 ? filters.overlays : ['icor2024','icor2025','gdp','unemployment','poverty','infrastructure','urbanization','internet','literacy','enrollment','teacherRatio']).map((id) => (
                            <button
                                key={id}
                                onClick={() => goToChartFor(id)}
                                className="text-left p-4 rounded-lg border hover:border-orange-300 hover:bg-orange-50/40 transition"
                            >
                                <div className="text-sm text-gray-500 mb-1">
                                    {id === 'gdp' && 'Average GDP Growth'}
                                    {id === 'unemployment' && 'Average Unemployment'}
                                    {id === 'poverty' && 'Average Poverty Rate'}
                                    {id === 'infrastructure' && 'Infrastructure Index'}
                                    {id === 'urbanization' && 'Urbanization Rate'}
                                    {id === 'internet' && 'Internet Access'}
                                    {id === 'literacy' && 'Literacy Rate'}
                                    {id === 'enrollment' && 'School Enrollment'}
                                    {id === 'teacherRatio' && 'Teacher Ratio'}
                                    {id === 'icor2024' && 'ICOR 2024'}
                                    {id === 'icor2025' && 'ICOR 2025'}
                                </div>
                                {(() => {
                                    const numeric = avgForOverlayNumeric(id);
                                    const label = avgForOverlay(id);
                                    const badgeCls = badgeFor(id, numeric);
                                    return (
                                        <div className="text-2xl font-semibold text-gray-900">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${badgeCls}`}>
                                                {label}
                                            </span>
                                        </div>
                                    );
                                })()}
                            </button>
                        ))}
                    </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Recent Budget Changes</h3>
                            <span className="text-xs text-gray-500">Auto-logged when budgets are updated</span>
                        </div>
                        {(() => {
                            const allEntries = tasks.flatMap(t =>
                                (t.budgetLogs || []).map(log => ({
                                    at: log.at,
                                    field: log.field,
                                    from: log.from,
                                    to: log.to,
                                    taskId: t.id,
                                    title: t.title,
                                    project: t.project,
                                    province: t.province,
                                }))
                            ).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
                            const entries = allEntries.slice(0, budgetLogLimit);

                            if (entries.length === 0) {
                                return <div className="text-sm text-gray-500">No budget changes yet.</div>;
                            }

                            return (
                                <>
                                <div className="divide-y divide-gray-100">
                                    {entries.map((e, idx) => (
                                        <div key={`${e.taskId}-${idx}`} className="py-3 flex items-start justify-between">
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-gray-900 truncate">{e.title}</div>
                                                <div className="text-xs text-gray-500 truncate">{e.project} • {e.province}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 mr-2">
                                                        {e.field === 'budgetAbsorbed' ? 'Absorbed' : 'Total'}
                                                    </span>
                                                    <span className="text-gray-700">{e.from.toLocaleString()} → <span className="font-semibold">{e.to.toLocaleString()}</span></span>
                                                </div>
                                                <div className="text-xs text-gray-500">{new Date(e.at).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {allEntries.length > budgetLogLimit && (
                                    <div className="pt-3 flex justify-center">
                                        <button onClick={() => setBudgetLogLimit(budgetLogLimit + 20)} className="text-sm text-blue-600 hover:text-blue-700">Show more</button>
                                    </div>
                                )}
                                {allEntries.length > 10 && budgetLogLimit > 10 && (
                                    <div className="pt-1 flex justify-center">
                                        <button onClick={() => setBudgetLogLimit(10)} className="text-xs text-gray-500 hover:text-gray-700">Show less</button>
                                    </div>
                                )}
                                </>
                            );
                        })()}
                    </div>
                </div>

                <div ref={chartsRef} className="bg-white p-6 rounded-lg border shadow-sm w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Province Performance Charts</h3>
                    </div>
                    <div className="space-y-6">
                        <div ref={chartAnchors.icor2024}>
                            <ProvinceChart
                                provinces={provinces}
                                metric="ICOR 2024"
                                getValue={(p) => (p.indicators as any).icor2024 ?? 0}
                                sortAscending={false}
                            />
                        </div>
                        <div ref={chartAnchors.icor2025}>
                            <ProvinceChart
                                provinces={provinces}
                                metric="ICOR 2025"
                                getValue={(p) => (p.indicators as any).icor2025 ?? 0}
                                sortAscending={false}
                            />
                        </div>
                        <div ref={chartAnchors.gdp}>
                            <ProvinceChart provinces={provinces} metric="GDP Growth Rate" getValue={(p) => p.indicators.gdp} sortAscending={chartSort.gdp} />
                        </div>
                        <div ref={chartAnchors.unemployment}>
                            <ProvinceChart provinces={provinces} metric="Unemployment Rate" getValue={(p) => p.indicators.unemployment} sortAscending={chartSort.unemployment} />
                        </div>
                        <div ref={chartAnchors.poverty}>
                            <ProvinceChart provinces={provinces} metric="Poverty Rate" getValue={(p) => p.indicators.povertyRate} sortAscending={chartSort.poverty} />
                        </div>
                        <div ref={chartAnchors.infrastructure}>
                            <ProvinceChart provinces={provinces} metric="Infrastructure Index" getValue={(p) => p.indicators.infrastructureIndex} sortAscending={chartSort.infrastructure} />
                        </div>
                        <div ref={chartAnchors.urbanization}>
                            <ProvinceChart provinces={provinces} metric="Urbanization Rate" getValue={(p) => p.indicators.urbanizationRate} sortAscending={chartSort.urbanization} />
                        </div>
                        <div ref={chartAnchors.internet}>
                            <ProvinceChart provinces={provinces} metric="Internet Access" getValue={(p) => p.indicators.internetAccess} sortAscending={chartSort.internet} />
                        </div>
                        <div ref={chartAnchors.literacy}>
                            <ProvinceChart provinces={provinces} metric="Literacy Rate" getValue={(p) => p.indicators.literacyRate} sortAscending={chartSort.literacy} />
                        </div>
                        <div ref={chartAnchors.enrollment}>
                            <ProvinceChart provinces={provinces} metric="School Enrollment" getValue={(p) => p.indicators.schoolEnrollment} sortAscending={chartSort.enrollment} />
                        </div>
                        <div ref={chartAnchors.teacherRatio}>
                            <ProvinceChart provinces={provinces} metric="Student-Teacher Ratio" getValue={(p) => p.indicators.teacherRatio} sortAscending={chartSort.teacherRatio} />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}