import { useState } from 'react';
import { useStore } from '../../store/store';
import { Button } from '../ui/Button';

interface TaskFormData {
    title: string;
    project: string;
    province: string;
    sprint: string;
}

export function TaskForm() {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        project: '',
        province: '',
        sprint: '',
    });

    const { projects, provinces } = useStore((state) => ({
        projects: state.projects,
        provinces: state.provinces,
    }));
    const addTask = useStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.project || !formData.province || !formData.sprint) {
            return;
        }

        addTask({
            title: formData.title,
            project: formData.project,
            province: formData.province,
            sprint: formData.sprint,
            stage: 'backlog',
            creator: 'Current User', // TODO: Add user management
            budgetTotal: 0,
            budgetAbsorbed: 0,
        });

        setFormData({
            title: '',
            project: '',
            province: '',
            sprint: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Title
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Enter task title"
                    />
                </label>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Project
                    <select
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                        <option value="">Select project</option>
                        {projects.map((project) => (
                            <option key={project} value={project}>
                                {project}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Province
                    <select
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                        <option value="">Select province</option>
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Sprint
                    <select
                        value={formData.sprint}
                        onChange={(e) => setFormData({ ...formData, sprint: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                        <option value="">Select sprint</option>
                        <option value="sprint-1">Sprint 1 - October 2025</option>
                        <option value="sprint-2">Sprint 2 - November 2025</option>
                        <option value="sprint-3">Sprint 3 - December 2025</option>
                    </select>
                </label>
            </div>

            <Button type="submit" className="w-full" variant="default">
                Create Task
            </Button>
        </form>
    );
}