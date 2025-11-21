"use client";

import { useStore } from "@/lib/store";
import { GoalCard } from "@/components/strategy/GoalCard";
import { Plus } from "lucide-react";

export default function GoalsPage() {
    const goals = useStore((state) => state.goals);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Strategic Goals</h1>
                    <p className="text-muted-foreground">
                        Define and track high-level objectives for your product.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    New Goal
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
}
