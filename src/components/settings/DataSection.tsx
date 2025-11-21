"use client";

import { useStore } from "@/lib/store";
import { Download, Trash2, FileJson, FileSpreadsheet } from "lucide-react";

export function DataSection() {
    const state = useStore((state) => state);

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(state, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `product-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportCSV = () => {
        // Flatten data: Goal -> Initiative -> Epic -> Story
        const rows = [];
        const headers = ["Goal", "Initiative", "Epic", "Story", "Status", "Priority", "Points", "Owner"];
        rows.push(headers.join(","));

        state.stories.forEach(story => {
            const epic = state.epics.find(e => e.id === story.epicId);
            const initiative = state.initiatives.find(i => i.id === epic?.initiativeId);
            const goal = state.goals.find(g => g.id === initiative?.goalId);

            const row = [
                `"${goal?.title || ''}"`,
                `"${initiative?.title || ''}"`,
                `"${epic?.title || ''}"`,
                `"${story.title}"`,
                story.status,
                story.priority,
                story.points,
                "U1" // Mock owner
            ];
            rows.push(row.join(","));
        });

        const csvContent = rows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `product-manager-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Data Management</h3>
                <p className="text-sm text-muted-foreground">
                    Export your project data or reset the application.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center gap-2 font-medium">
                        <FileJson className="h-4 w-4 text-blue-500" />
                        Export JSON
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Full backup of all application state including settings.
                    </p>
                    <button
                        onClick={handleExportJSON}
                        className="w-full flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                        <Download className="h-4 w-4" />
                        Download JSON
                    </button>
                </div>

                <div className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center gap-2 font-medium">
                        <FileSpreadsheet className="h-4 w-4 text-green-500" />
                        Export CSV
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Flattened list of stories linked to goals for Excel/Sheets.
                    </p>
                    <button
                        onClick={handleExportCSV}
                        className="w-full flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                        <Download className="h-4 w-4" />
                        Download CSV
                    </button>
                </div>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium text-red-900 dark:text-red-200">Danger Zone</h4>
                        <p className="text-xs text-red-700 dark:text-red-300">
                            This will permanently delete all local data and reset to defaults.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                        <Trash2 className="h-4 w-4" />
                        Reset Data
                    </button>
                </div>
            </div>
        </div>
    );
}
