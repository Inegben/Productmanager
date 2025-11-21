"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";
import { Plus, User as UserIcon, Mail, Shield } from "lucide-react";
import { User } from "@/types";

export function TeamSection() {
    const users = useStore((state) => state.users);
    const addUser = useStore((state) => state.addUser);

    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' });

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            id: `u-${Date.now()}`,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.name.substring(0, 2).toUpperCase()
        };
        addUser(user);
        setIsAdding(false);
        setNewUser({ name: '', email: '', role: 'Member' });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage who has access to this project.
                    </p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add Member
                </button>
            </div>

            {isAdding && (
                <div className="rounded-lg border bg-secondary/20 p-4">
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    required
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    placeholder="John Doe"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    placeholder="john@example.com"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <select
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option>Admin</option>
                                    <option>Member</option>
                                    <option>Viewer</option>
                                </select>
                            </div>
                        </div>

                        {/* Mock Login Details Generator */}
                        <div className="rounded bg-card p-3 text-xs text-muted-foreground border border-dashed">
                            <p className="font-semibold mb-1">Login Details (Auto-Generated)</p>
                            <p>Username: {newUser.email || '...'}</p>
                            <p>Temporary Password: <span className="font-mono bg-secondary px-1 rounded">Temp#{Math.floor(Math.random() * 9000) + 1000}</span></p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                Send Invite
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b bg-secondary/30 p-4 text-xs font-medium text-muted-foreground">
                    <div className="col-span-5">User</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-2">Role</div>
                </div>
                <div className="divide-y">
                    {users.map((user) => (
                        <div key={user.id} className="grid grid-cols-12 items-center p-4 text-sm">
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                    {user.avatar}
                                </div>
                                <span className="font-medium">{user.name}</span>
                            </div>
                            <div className="col-span-5 text-muted-foreground">
                                {user.email}
                            </div>
                            <div className="col-span-2">
                                <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                                    Member
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
