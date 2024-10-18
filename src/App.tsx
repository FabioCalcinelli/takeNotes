// App.tsx
import React, { useState, useEffect } from 'react';
import { Note } from './interfaces';
import { getAllNotes, createNote, updateNote, deleteNote } from './services/api';
import CreateNoteForm from './components/CreateNoteForm';
import NotesList from './components/NotesList';

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const notes = await getAllNotes();
            console.log('Fetched notes:', notes);
            setNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // No changes needed, the code is already correct

    const handleUpdateNote = async (note_id: number, piecesText: string[]) => {
        try {
            await updateNote(note_id, piecesText);
            console.log('Note updated successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteNote = async (note_id: number) => {
        try {
            await deleteNote(note_id);
            console.log('Note deleted successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateNote = async (piecesText: string[]) => {
        try {
            await createNote(piecesText);
            console.log('Note created successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Notes App</h1>
            <CreateNoteForm onCreate={handleCreateNote} />
            <NotesList
                notes={notes}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
            />
        </div>
    );
};

export default App;
