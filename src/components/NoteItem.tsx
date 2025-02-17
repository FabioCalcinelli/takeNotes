// NoteItem.tsx
import {useState} from 'react';
import {Note} from '../interfaces';
import './NoteItem.css'
import {convertTimestampToDateAndTime} from "../helper/convert_timestamp.ts";
interface NoteItemProps {
    note: Note,
    onUpdate: (note_id: number, piecesText: string[]) => void,
    onDelete: (note_id: number) => void,
}

const NoteItem = ({note, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [piecesText, setPiecesText] = useState<string[]>(note.pieces.map((p) => p.text));

    const handlePieceChange = (index: number, text: string) => {
        const newPiecesText = [...piecesText];
        newPiecesText[index] = text;
        setPiecesText(newPiecesText);
    };

    const handleAddPiece = () => {
        setPiecesText([...piecesText, '']);
    };

    const handleSave = () => {
        if (note.id !== undefined) {
            onUpdate(note.id, piecesText.filter((text) => text.trim() !== ''));
            setIsEditing(false);
        }
    };

    return (
        <div className='note'>
            <div className="note-metadata">
                <h3>#{note.id} - {convertTimestampToDateAndTime(note.creation_timestamp)}</h3>
                <p className="completion-timestamp">Last updated at: {convertTimestampToDateAndTime(note.last_update_timestamp)}</p>
            </div>
            {isEditing ? (
                <div>
                    {piecesText.map((text, index) => (
                        <input
                            key={index}
                            type="text"
                            value={text}
                            onChange={(e) => handlePieceChange(index, e.target.value)}
                            placeholder={`Piece ${index + 1}`}
                        />
                    ))}
                    <div>
                        <button type="button" onClick={handleAddPiece}>
                            Add Piece
                        </button>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <ul>
                        {note.pieces.map((piece) => (
                            <li key={piece.id}>{piece.text}</li>
                        ))}
                    </ul>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => note.id !== undefined && onDelete(note.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default NoteItem;
