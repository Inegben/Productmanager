import { create } from 'zustand';
import { Goal, Initiative, Epic, Story, User } from '@/types';
import { supabase } from './supabase';

interface AppState {
    goals: Goal[];
    initiatives: Initiative[];
    epics: Epic[];
    stories: Story[];
    users: User[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchData: () => Promise<void>;

    addGoal: (goal: Omit<Goal, 'id' | 'ownerId'>) => Promise<void>;
    addInitiative: (initiative: Omit<Initiative, 'id' | 'ownerId'>) => Promise<void>;
    addEpic: (epic: Omit<Epic, 'id' | 'ownerId'>) => Promise<void>;
    addStory: (story: Omit<Story, 'id' | 'assigneeId'>) => Promise<void>;
    addUser: (user: User) => void; // Kept as local/mock for now as auth handles users

    updateStoryStatus: (storyId: string, status: Story['status']) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
    goals: [],
    initiatives: [],
    epics: [],
    stories: [],
    users: [],
    isLoading: false,
    error: null,

    fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [goalsRes, initiativesRes, epicsRes, storiesRes, profilesRes] = await Promise.all([
                supabase.from('goals').select('*'),
                supabase.from('initiatives').select('*'),
                supabase.from('epics').select('*'),
                supabase.from('stories').select('*'),
                supabase.from('profiles').select('*')
            ]);

            if (goalsRes.error) throw goalsRes.error;
            if (initiativesRes.error) throw initiativesRes.error;
            if (epicsRes.error) throw epicsRes.error;
            if (storiesRes.error) throw storiesRes.error;

            // Map DB snake_case to camelCase if needed, or just rely on JS handling it if we typed it right.
            // Our types use camelCase, DB uses snake_case. We need to map.
            // Actually, Supabase returns data as is. We should probably use a transformer or update types.
            // For speed, I'll map manually here.

            const mapGoal = (g: any): Goal => ({ ...g, ownerId: g.owner_id });
            const mapInitiative = (i: any): Initiative => ({ ...i, goalId: i.goal_id, startDate: i.start_date, endDate: i.end_date, ownerId: i.owner_id });
            const mapEpic = (e: any): Epic => ({ ...e, initiativeId: e.initiative_id, ownerId: e.owner_id });
            const mapStory = (s: any): Story => ({ ...s, epicId: s.epic_id, assigneeId: s.assignee_id });
            const mapUser = (u: any): User => ({ id: u.id, name: u.full_name || u.email, email: u.email, avatar: u.avatar_url || 'U' });

            set({
                goals: (goalsRes.data || []).map(mapGoal),
                initiatives: (initiativesRes.data || []).map(mapInitiative),
                epics: (epicsRes.data || []).map(mapEpic),
                stories: (storiesRes.data || []).map(mapStory),
                users: (profilesRes.data || []).map(mapUser),
                isLoading: false
            });
        } catch (e: any) {
            console.error('Error fetching data:', e);
            set({ error: e.message, isLoading: false });
        }
    },

    addGoal: async (goal) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.from('goals').insert({
            title: goal.title,
            description: goal.description,
            progress: goal.progress,
            color: goal.color,
            owner_id: user.id
        }).select().single();

        if (error) {
            console.error(error);
            return;
        }

        set((state) => ({ goals: [...state.goals, { ...data, ownerId: data.owner_id }] }));
    },

    addInitiative: async (initiative) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.from('initiatives').insert({
            title: initiative.title,
            description: initiative.description,
            goal_id: initiative.goalId,
            status: initiative.status,
            start_date: initiative.startDate,
            end_date: initiative.endDate,
            owner_id: user.id
        }).select().single();

        if (error) {
            console.error(error);
            return;
        }

        set((state) => ({
            initiatives: [...state.initiatives, {
                ...data,
                goalId: data.goal_id,
                startDate: data.start_date,
                endDate: data.end_date,
                ownerId: data.owner_id
            }]
        }));
    },

    addEpic: async (epic) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.from('epics').insert({
            title: epic.title,
            description: epic.description,
            initiative_id: epic.initiativeId,
            status: epic.status,
            priority: epic.priority,
            owner_id: user.id
        }).select().single();

        if (error) {
            console.error(error);
            return;
        }

        set((state) => ({
            epics: [...state.epics, {
                ...data,
                initiativeId: data.initiative_id,
                ownerId: data.owner_id
            }]
        }));
    },

    addStory: async (story) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase.from('stories').insert({
            title: story.title,
            description: story.description,
            epic_id: story.epicId,
            status: story.status,
            priority: story.priority,
            points: story.points,
            assignee_id: user.id
        }).select().single();

        if (error) {
            console.error(error);
            return;
        }

        set((state) => ({
            stories: [...state.stories, {
                ...data,
                epicId: data.epic_id,
                assigneeId: data.assignee_id
            }]
        }));
    },

    addUser: (user) => set((state) => ({ users: [...state.users, user] })),

    updateStoryStatus: async (storyId, status) => {
        // Optimistic update
        set((state) => ({
            stories: state.stories.map((s) => s.id === storyId ? { ...s, status } : s)
        }));

        const { error } = await supabase.from('stories').update({ status }).eq('id', storyId);

        if (error) {
            console.error(error);
            // Revert if error (simplified, ideally we'd refetch or rollback)
        }
    },
}));
