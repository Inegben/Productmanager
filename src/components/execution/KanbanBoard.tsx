"use client";

import { useStore } from "@/lib/store";
import { Status, Story } from "@/types";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus, Circle, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const COLUMNS: { id: Status; label: string; icon: React.ReactNode }[] = [
    { id: "todo", label: "To Do", icon: <Circle className="h-4 w-4" /> },
    { id: "in-progress", label: "In Progress", icon: <Clock className="h-4 w-4 text-blue-500" /> },
    { id: "review", label: "Review", icon: <AlertCircle className="h-4 w-4 text-yellow-500" /> },
    { id: "done", label: "Done", icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
];

export function KanbanBoard() {
    const stories = useStore((state) => state.stories);
    const updateStoryStatus = useStore((state) => state.updateStoryStatus);

    const handleStatusChange = (storyId: string, newStatus: Status) => {
        updateStoryStatus(storyId, newStatus);
    };

    return (
        <div className="flex h-[calc(100vh-12rem)] gap-6 overflow-x-auto pb-4">
            {COLUMNS.map((column) => {
                const columnStories = stories.filter((s) => s.status === column.id);

                return (
                    <div key={column.id} className="flex h-full w-80 flex-col rounded-xl border bg-secondary/30">
                        {/* Column Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-card/50 rounded-t-xl">
                            <div className="flex items-center gap-2">
                                {column.icon}
                                <span className="font-medium">{column.label}</span>
                                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                                    {columnStories.length}
                                </span>
                            </div>
                            <button className="text-muted-foreground hover:text-foreground">
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Stories Container */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {columnStories.map((story) => (
                                <div
                                    key={story.id}
                                    className="group relative flex flex-col gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="text-sm font-medium leading-tight">{story.title}</span>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-[10px] font-medium px-1.5 py-0.5 rounded uppercase",
                                                story.priority === 'critical' ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" :
                                                    story.priority === 'high' ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400" :
                                                        "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                                            )}>
                                                {story.priority}
                                            </span>
                                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">
                                                {story.points}
                                            </div>
                                        </div>

                                        {/* Simple Move Actions for Demo */}
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {column.id !== 'todo' && (
                                                <button
                                                    onClick={() => handleStatusChange(story.id, COLUMNS[COLUMNS.findIndex(c => c.id === column.id) - 1].id)}
                                                    className="text-[10px] hover:bg-secondary px-1 rounded"
                                                >
                                                    ←
                                                </button>
                                            )}
                                            {column.id !== 'done' && (
                                                <button
                                                    onClick={() => handleStatusChange(story.id, COLUMNS[COLUMNS.findIndex(c => c.id === column.id) + 1].id)}
                                                    className="text-[10px] hover:bg-secondary px-1 rounded"
                                                >
                                                    →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
