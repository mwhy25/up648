import { create } from 'zustand';
import { type Task, type Province } from '../types';
import { mockTasks, mockProvinces, mockProjects } from './mockData';
import { provinceCoordinates } from '../data/provinces';

interface FilterState {
    project: string | null;
    province: string | null;
    creator: string | null;
    sprint: string | null;
    overlays: string[];
    title: string | null;
}

interface TaskStore {
    // Tasks
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    moveTask: (taskId: string, newStage: Task['stage']) => void;

    // Provinces
    provinces: Province[];
    addProvince: (province: Omit<Province, 'id'>) => void;
    updateProvince: (provinceId: string, updates: Partial<Province>) => void;
    deleteProvince: (provinceId: string) => void;
    addIndicator: (category: string, name: string) => void;

    // Projects
    projects: string[];

    // Filters
    filters: FilterState;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    resetFilters: () => void;

    // Filtered Data
    getFilteredTasks: () => Task[];
}

const defaultFilters: FilterState = {
    project: null,
    province: null,
    creator: null,
    sprint: null,
    overlays: [],
    title: null,
};

export const useStore = create<TaskStore>((set, get) => ({
    // Initial Data
    tasks: mockTasks,
    provinces: (() => {
        const base = mockProvinces.map((p) => ({
            ...p,
            indicators: {
                ...p.indicators,
                icor2024: (p as any).indicators.icor2024 ?? 5,
                icor2025: (p as any).indicators.icor2025 ?? 4.8,
            },
        }));
        const existing = new Set(base.map(p => p.id));
        const titleCase = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const placeholders: Province[] = [] as any;
        Object.entries(provinceCoordinates).forEach(([id, coords]) => {
            if (!existing.has(id)) {
                placeholders.push({
                    id,
                    name: titleCase(id),
                    code: id.slice(0, 2).toUpperCase(),
                    coordinates: coords as any,
                    indicators: {
                        gdp: 5,
                        unemployment: 5,
                        povertyRate: 10,
                        infrastructureIndex: 70,
                        urbanizationRate: 50,
                        internetAccess: 75,
                        literacyRate: 98,
                        schoolEnrollment: 93,
                        teacherRatio: 16,
                        icor2024: 5,
                        icor2025: 4.8,
                    },
                } as Province);
            }
        });
        return [...base, ...placeholders];
    })(),
    projects: mockProjects,
    filters: defaultFilters,

    // Indicator Actions
    addIndicator: (_, name) => {
        set((state) => ({
            provinces: state.provinces.map(province => {
                const updatedIndicators = { ...province.indicators };
                if (!(name in updatedIndicators)) {
                    updatedIndicators[name] = 0;
                }
                return {
                    ...province,
                    indicators: updatedIndicators
                };
            })
        }));
    },

    // Task Actions
    addTask: (taskData) => {
        const task: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
    },

    // Province Actions
    addProvince: (provinceData) => {
        const province: Province = {
            ...provinceData,
            id: `province-${Date.now()}`
        };
        set((state) => ({ provinces: [...state.provinces, province] }));
    },

    updateProvince: (provinceId, updates) => {
        set((state) => ({
            provinces: state.provinces.map((province) =>
                province.id === provinceId
                    ? { ...province, ...updates }
                    : province
            ),
        }));
    },

    deleteProvince: (provinceId) => {
        set((state) => ({
            provinces: state.provinces.filter((province) => province.id !== provinceId),
        }));
    },

    updateTask: (taskId, updates) => {
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.id !== taskId) return task;
                const now = new Date();
                const newTask = { ...task, ...updates, updatedAt: now } as Task;
                const logs = [] as NonNullable<Task['budgetLogs']>;
                const note = (updates as any).budgetNote as string | undefined;
                if (typeof updates.budgetTotal === 'number' && updates.budgetTotal !== task.budgetTotal) {
                    logs.push({ at: now, field: 'budgetTotal', from: task.budgetTotal, to: updates.budgetTotal, note });
                }
                if (typeof updates.budgetAbsorbed === 'number' && updates.budgetAbsorbed !== task.budgetAbsorbed) {
                    logs.push({ at: now, field: 'budgetAbsorbed', from: task.budgetAbsorbed, to: updates.budgetAbsorbed, note });
                }
                if (logs.length > 0) {
                    newTask.budgetLogs = [...(task.budgetLogs || []), ...logs];
                }
                return newTask;
            }),
        }));
    },

    moveTask: (taskId, newStage) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId
                    ? { ...task, stage: newStage, updatedAt: new Date() }
                    : task
            ),
        }));
    },

    // Filter Actions
    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        }));
    },

    resetFilters: () => {
        set({ filters: defaultFilters });
    },

    // Filtered Data
    getFilteredTasks: () => {
        const { tasks, filters } = get();
        return tasks.filter((task) => {
            if (filters.project && task.project !== filters.project) return false;
            if (filters.province && task.province !== filters.province) return false;
            if (filters.creator && task.creator !== filters.creator) return false;
            if (filters.sprint && task.sprint !== filters.sprint) return false;
            if (filters.title && !task.title.toLowerCase().includes(String(filters.title).toLowerCase())) return false;
            return true;
        });
    },
}));