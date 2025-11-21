"use client";

import { RoadmapView } from "@/components/strategy/RoadmapView";
import { CalendarRange } from "lucide-react";

export default function RoadmapPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Roadmap</h1>
                    <p className="text-muted-foreground">
                        Timeline view of strategic initiatives for 2026.
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                    <CalendarRange className="h-4 w-4" />
                    <span>2026</span>
                </div>
            </div>

            <RoadmapView />
        </div>
    );
}
