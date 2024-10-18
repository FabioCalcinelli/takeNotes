// NotesList.tsx
import React from 'react';
import { Note } from '../interfaces';
import NoteItem from './NoteItem';

interface NotesListProps {
    notes: Note[];
    onUpdate: (note_id: number, piecesText: string[]) => void;
    onDelete: (note_id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>All Notes</h2>
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NotesList;
