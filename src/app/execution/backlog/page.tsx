"use client";

import { BacklogList } from "@/components/execution/BacklogList";
import { Plus } from "lucide-react";

export default function BacklogPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Backlog</h1>
                    <p className="text-muted-foreground">
                        Manage and prioritize your product backlog.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Create Issue
                </button>
            </div>

            <BacklogList />
        </div>
    );
}
