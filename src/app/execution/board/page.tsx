"use client";

import { KanbanBoard } from "@/components/execution/KanbanBoard";
import { Filter } from "lucide-react";

export default function BoardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Sprint</h1>
                    <p className="text-muted-foreground">
                        Sprint 24.1 • Jan 1 - Jan 14
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-secondary">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                    <div className="flex -space-x-2 ml-2">
                        <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">U1</div>
                        <div className="h-8 w-8 rounded-full border-2 border-background bg-blue-500/20 flex items-center justify-center text-xs text-blue-500 font-medium">U2</div>
                    </div>
                </div>
            </div>

            <KanbanBoard />
        </div>
    );
}
