export interface Piece {
    id?: number; // ID might not be present when creating
    text: string;
    timestamp?: string; // Timestamp might not be present when creating
}

export interface Note {
    id?: number; // ID might not be present when creating
    timestamp?: string;
    last_update_timestamp?: string;
    pieces: Piece[];
}

export interface Todo {
    last_update_timestamp?: string;
    id?: number;
    text: string;
    timestamp?: string;
    completion_timestamp?: string;
    completed: boolean;
}

