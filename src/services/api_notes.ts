// api_notes.ts
import { Note } from '../interfaces';

// Base URL of the backend API
export const API_BASE_URL = 'http://localhost:5000';

export async function createNote(piecesText: string[]): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: piecesText.map((text) => ({ text })),
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        const noteId = data.note_id;
        const noteResponse = await fetch(`${API_BASE_URL}/notes/${noteId}`);
        return await noteResponse.json();
    } else {
        console.error('Error creating note:', response.status);
        throw new Error('Failed to create note');
    }
}

export async function getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to get notes');
        }
    } else {
        console.error('Error getting notes:', response.status);
        throw new Error('Failed to get notes');
    }
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

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to update note');
        }
    } else {
        console.error('Error updating note:', response.status);
        throw new Error('Failed to update note');
    }
}

export async function deleteNote(note_id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/notes/${note_id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to delete note');
        }
    } else {
        console.error('Error deleting note:', response.status);
        throw new Error('Failed to delete note');
    }
}
