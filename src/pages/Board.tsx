import { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '../store/store';
import { KanbanColumn } from '../components/board/KanbanColumn';
import { TaskCard } from '../components/board/TaskCard';
import { BoardFilters } from '../components/board/BoardFilters';
import type { Task } from '../types';
import { createPortal } from 'react-dom';
import { TaskModal } from '../components/board/TaskModal';

const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'backlog-verification', title: 'Backlog Verification' },
    { id: 'procurement', title: 'Procurement' },
    { id: 'procurement-verification', title: 'Procurement Verification' },
    { id: 'construction', title: 'Construction' },
    { id: 'construction-verification', title: 'Construction Verification' },
    { id: 'handover', title: 'Handover' },
    { id: 'done', title: 'Done' },
] as const;

export default function Board() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const tasks = useStore((state) => state.getFilteredTasks());
    const moveTask = useStore((state) => state.moveTask);
    const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

    function handleTaskClick(task: Task) {
        setSelectedTask(task);
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const task = tasks.find((t) => t.id === active.id);
            if (task) {
                moveTask(task.id, over.id as Task['stage']);
            }
        }

        setActiveId(null);
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <BoardFilters />

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 flex gap-6 overflow-x-auto pb-4 mt-4">
                    <SortableContext items={columns.map(col => col.id)} strategy={horizontalListSortingStrategy}>
                        {columns.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                title={column.title}
                                stage={column.id}
                                tasks={tasks.filter((task) => task.stage === column.id)}
                                onTaskClick={handleTaskClick}
                            />
                        ))}
                    </SortableContext>
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeTask && <TaskCard task={activeTask} />}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
}