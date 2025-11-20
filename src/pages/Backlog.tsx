import { TaskForm } from '../components/backlog/TaskForm';
import { useStore } from '../store/store';
import { TaskCard } from '../components/board/TaskCard';

function Backlog() {
    const tasks = useStore((state) => state.tasks);
    const sprintGroups = tasks.reduce((groups, task) => {
        if (!groups[task.sprint]) {
            groups[task.sprint] = [];
        }
        groups[task.sprint].push(task);
        return groups;
    }, {} as Record<string, typeof tasks>);

    return (
        <div className="space-y-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Backlog</h2>
                    <div className="space-y-8">
                        {Object.entries(sprintGroups).map(([sprint, sprintTasks]) => (
                            <div key={sprint} className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    {sprint === 'sprint-1' && 'Sprint 1 - October 2025'}
                                    {sprint === 'sprint-2' && 'Sprint 2 - November 2025'}
                                    {sprint === 'sprint-3' && 'Sprint 3 - December 2025'}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {sprintTasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-1 mt-8 md:mt-0">
                    <div className="sticky top-24">
                        <TaskForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Backlog;