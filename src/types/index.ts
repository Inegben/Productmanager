export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "todo" | "in-progress" | "review" | "done";
export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

export interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

// --- Strategy Layer ---

export interface Goal {
    id: string;
    title: string;
    description: string;
    progress: number; // 0-100
    color: string;
    ownerId: string;
}

export interface Initiative {
    id: string;
    title: string;
    description: string;
    goalId: string;
    status: Status;
    startDate: string;
    endDate: string;
    ownerId: string;
}

// --- Execution Layer ---

export interface Epic {
    id: string;
    title: string;
    description: string;
    initiativeId: string; // Link to Strategy
    status: Status;
    priority: Priority;
    ownerId: string;
}

export interface Story {
    id: string;
    title: string;
    description: string;
    epicId: string;
    status: Status;
    priority: Priority;
    points: number;
    assigneeId?: string;
}
