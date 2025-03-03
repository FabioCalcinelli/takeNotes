import {useEffect, useState, useRef} from 'react';
import {Note} from '../interfaces';
import './NoteItem.css'
import {convertTimestampToDateAndTime} from "../helper/convert_timestamp.ts";

interface NoteItemProps {
    note: Note,
    onUpdate: (note_id: number, piecesText: string[]) => void,
}

const NoteItem = ({note, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingPieceId, setEditingPieceId] = useState<number | null>(null);
    const [piecesText, setPiecesText] = useState<string[]>(note.pieces.map((p) => p.text));
    const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
    const lastEditTimeRef = useRef<number>(0);
    const timeoutIdRef = useRef<number | null>(null);

    const handlePieceChange = (index: number, text: string) => {
        const newPiecesText = [...piecesText];
        newPiecesText[index] = text;
        setPiecesText(newPiecesText);
        lastEditTimeRef.current = Date.now();
        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(() => {
            handleSave();
        }, 5000);
    };

    const handleAddPiece = () => {
        setPiecesText([...piecesText, '']);
        textAreaRefs.current = [...textAreaRefs.current, null];
    };

    const handleClick = (index: number) => {
        setEditingPieceId(note.pieces[index].id);
        setIsEditing(true);
    }

    const handleSave = () => {
        if (note.id !== undefined) {
            onUpdate(note.id, piecesText.filter((text) => text.trim() !== ''));
            setIsEditing(false);
            setEditingPieceId(null);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingPieceId(null);
    };

    const handleNoteClick = () => {
        // Do nothing when the note container is clicked
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isEditing) {
                handleCancel();
            } else if (e.key === 'Enter' && !e.shiftKey && isEditing) {
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEditing, handleSave, handleCancel]);

    useEffect(() => {
        if (isEditing && textAreaRefs.current.length > 0) {
            const index = note.pieces.findIndex((piece) => piece.id === editingPieceId);
            if (index !== -1 && textAreaRefs.current[index] !== null) {
                textAreaRefs.current[index].focus();
            }
        }
    }, [isEditing, editingPieceId, note.pieces, textAreaRefs]);

    useEffect(() => {
        const handleBlur = () => {
            if (isEditing) {
                handleSave();
            }
        };

        document.addEventListener('visibilitychange', handleBlur);
        document.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('visibilitychange', handleBlur);
            document.removeEventListener('blur', handleBlur);
        };
    }, [isEditing, handleSave]);

// ...

    return (
        <div className='note' onClick={handleNoteClick}>
            <div className="note-header">
                <h3>#{note.id} - {convertTimestampToDateAndTime(note.creation_timestamp)}</h3>
                <p className="last-update-timestamp">Last updated at: {convertTimestampToDateAndTime(note.last_update_timestamp)}</p>
            </div>
            {isEditing ? (
                <div>
                    {piecesText.map((piece, index) => (
                        <div key={index} className="piece-container">
                <textarea
                    ref={(ref) => {
                        if (textAreaRefs.current[index] === undefined) {
                            textAreaRefs.current[index] = ref;
                        } else {
                            textAreaRefs.current[index] = ref;
                        }
                    }}
                    value={piece}
                    onChange={(e) => handlePieceChange(index, e.target.value)}
                    placeholder={`Piece ${index + 1}`}
                />
                        </div>
                    ))}
                    <div>
                        <button className="button" type="button" onClick={handleAddPiece}>
                            Add Piece
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {note.pieces.map((piece, index) => (
                        <div key={piece.id} onClick={(e) => {
                            e.stopPropagation(); // Prevent the note container click event from being triggered
                            handleClick(index);
                        }} className="piece-container">
                            <span className="piece-text">{piece.text}</span>
                            <span className="piece-timestamp">Last updated at: {convertTimestampToDateAndTime(piece.timestamp)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteItem;
