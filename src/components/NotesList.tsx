// NotesList.tsx
import { Note } from '../interfaces';
import NoteItem from './NoteItem';
import {FC} from "react";

interface NotesListProps {
    notes: Note[];
    onUpdate: (note_id: number, piecesText: string[]) => void;
}

const NotesList: FC<NotesListProps> = ({ notes, onUpdate}) => {
    return (
        <div>
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

export default NotesList;
