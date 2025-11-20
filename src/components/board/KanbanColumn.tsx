import type { Task, KanbanStage } from '../../types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
    title: string;
    stage: KanbanStage;
    tasks: Task[];
    onTaskClick?: (task: Task) => void;
}

const stageColors: Record<KanbanStage, string> = {
    'backlog': 'bg-gray-100',
    'backlog-verification': 'bg-blue-50',
    'procurement': 'bg-yellow-50',
    'procurement-verification': 'bg-yellow-100',
    'construction': 'bg-orange-50',
    'construction-verification': 'bg-orange-100',
    'handover': 'bg-green-50',
    'done': 'bg-green-100',
};

export function KanbanColumn({ title, stage, tasks, onTaskClick }: KanbanColumnProps) {

    const { setNodeRef, isOver } = useDroppable({
        id: stage,
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'flex flex-col flex-1 min-w-[320px] h-full rounded-lg shadow-sm',
                stageColors[stage],
                isOver && 'ring-2 ring-orange-500 ring-opacity-50'
            )}
        >
            <div className="p-4 font-medium text-gray-700 border-b bg-white/50">
                <h3 className="text-lg">{title}</h3>
                <div className="mt-1 text-sm text-gray-500 font-normal">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </div>
            </div>

            <div className="flex-1 p-3 overflow-y-auto">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}