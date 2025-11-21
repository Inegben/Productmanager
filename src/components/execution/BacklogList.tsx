"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, MoreHorizontal, Circle, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Story, Status, Priority } from "@/types";

export function BacklogList() {
    const epics = useStore((state) => state.epics);
    const stories = useStore((state) => state.stories);
    const [expandedEpics, setExpandedEpics] = useState<Record<string, boolean>>({});

    const toggleEpic = (epicId: string) => {
        setExpandedEpics(prev => ({ ...prev, [epicId]: !prev[epicId] }));
    };

    const getStatusIcon = (status: Status) => {
        switch (status) {
            case "done": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "in-progress": return <Circle className="h-4 w-4 text-blue-500 fill-blue-500/20" />;
            case "review": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            default: return <Circle className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case "critical": return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
            case "high": return "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400";
            case "medium": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
            default: return "text-muted-foreground bg-secondary";
        }
    };

    return (
        <div className="space-y-4">
            {epics.map((epic) => {
                const epicStories = stories.filter(s => s.epicId === epic.id);
                const isExpanded = expandedEpics[epic.id] ?? true;

                return (
                    <div key={epic.id} className="rounded-lg border bg-card shadow-sm">
                        {/* Epic Header */}
                        <div
                            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                            onClick={() => toggleEpic(epic.id)}
                        >
                            <button className="text-muted-foreground hover:text-foreground">
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{epic.title}</span>
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        Epic
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{epicStories.length} issues</span>
                                <button className="p-1 hover:bg-secondary rounded">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Stories List */}
                        {isExpanded && (
                            <div className="border-t divide-y">
                                {epicStories.map((story) => (
                                    <div key={story.id} className="flex items-center gap-3 p-3 pl-11 hover:bg-secondary/30 group transition-colors">
                                        <div className="mt-0.5">{getStatusIcon(story.status)}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{story.title}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded uppercase", getPriorityColor(story.priority))}>
                                                {story.priority}
                                            </span>
                                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">
                                                {story.points}
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">
                                                U1
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {epicStories.length === 0 && (
                                    <div className="p-4 pl-11 text-sm text-muted-foreground italic">
                                        No stories in this epic yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
