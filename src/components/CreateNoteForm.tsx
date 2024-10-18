// CreateNoteForm.tsx
import React, { useState } from 'react';

interface CreateNoteFormProps {
    onCreate: (piecesText: string[]) => void;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onCreate }) => {
    const [piecesText, setPiecesText] = useState<string[]>(['']);

    const handleAddPiece = () => {
        setPiecesText([...piecesText, '']);
    };

    const handlePieceChange = (index: number, text: string) => {
        const newPiecesText = [...piecesText];
        newPiecesText[index] = text;
        setPiecesText(newPiecesText);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(piecesText.filter((text) => text.trim() !== ''));
        setPiecesText(['']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Note</h2>
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
                <button type="submit">Create Note</button>
            </div>
        </form>
    );
};

export default CreateNoteForm;
