// NotesList.tsx
import { Note } from '../interfaces';
import NoteItem from './NoteItem';
import {FC} from "react";

interface NotesListProps {
    notes: Note[];
    onUpdate: (note_id: number, piecesText: string[]) => void;
    onDelete: (note_id: number) => void;
}

const NotesList: FC<NotesListProps> = ({ notes, onUpdate, onDelete }) => {
    return (
        <div>
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
