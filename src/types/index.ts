
export interface IEvent {
    id?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
    date?: string | null;
    duration?: number;
    locations?: string;
    symptomes?: string;
    medications?: string;
}