// api.ts
import { Note } from '../interfaces';

// Base URL of the backend API
const API_BASE_URL = 'http://localhost:5000';

export async function createNote(piecesText: string[]): Promise<{ message: string; note_id: number }> {
    const response = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: piecesText,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create note');
    }

    return await response.json();
}

export async function getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get notes');
    }

    const notes = await response.json();
    return notes as Note[];
}

export async function updateNote(note_id: number, piecesText: string[]): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/notes/${note_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: piecesText,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update note');
    }

    return await response.json();
}

export async function deleteNote(note_id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/notes/${note_id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete note');
    }

    return await response.json();
}
