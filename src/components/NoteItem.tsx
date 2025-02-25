// NoteItem.tsx
import {useEffect, useState} from 'react';
import {Note} from '../interfaces';
import './NoteItem.css'
import {convertTimestampToDateAndTime} from "../helper/convert_timestamp.ts";
interface NoteItemProps {
    note: Note,
    onUpdate: (note_id: number, piecesText: string[]) => void,
}

const NoteItem = ({note, onUpdate}) => {
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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isEditing) {
                setIsEditing(false);
            } else if (e.key === 'Enter' && !e.shiftKey && isEditing) {
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing, handleSave]);

    return (
        <div className='note' onClick={() => setIsEditing(true)}>
            <div className="note-header">
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
                    </div>
                </div>
            ) : (
                <div>
                    {note.pieces.map((piece) => (
                        <p key={piece.id}>{piece.text}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteItem;
