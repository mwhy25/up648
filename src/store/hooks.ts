import { useStore } from './store';
import type { Task } from '../types';

export const useFilteredTasks = () => {
    return useStore((state) => state.getFilteredTasks());
};

export const useTasksByStage = (stage: Task['stage']) => {
    const tasks = useStore((state) => state.getFilteredTasks());
    return tasks.filter((task) => task.stage === stage);
};

export const useProvinceStats = (provinceId: string) => {
    const tasks = useStore((state) => state.tasks);
    const provinceTasks = tasks.filter((task) => task.province === provinceId);
    const totalTasks = provinceTasks.length;
    const completedTasks = provinceTasks.filter((task) => task.stage === 'done').length;

    return {
        totalTasks,
        completedTasks,
        progressPercentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    };
};

export const useTaskFilters = () => {
    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);
    const resetFilters = useStore((state) => state.resetFilters);
    const projects = useStore((state) => state.projects);
    const provinces = useStore((state) => state.provinces);

    return {
        filters,
        setFilter,
        resetFilters,
        projects,
        provinces,
    };
};