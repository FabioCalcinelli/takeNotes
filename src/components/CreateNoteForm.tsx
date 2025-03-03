import { FC, useEffect, useRef, useState } from 'react';
import "./CreateNoteForm.css"

interface CreateNoteFormProps {
    onCreate: (piecesText: string[]) => void;
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({ onCreate }) => {
    const [piecesText, setPiecesText] = useState<string[]>(['']);
    const inputRefs = useRef<HTMLTextAreaElement[]>([]);
    const timeoutId = useRef<number | null>(null);

    const resetForm = () => {
        setPiecesText(['']);
    };

    const handleAddPiece = () => {
        setPiecesText([...piecesText, '']);
    };

    const handlePieceChange = (index: number, text: string) => {
        const newPiecesText = [...piecesText];
        newPiecesText[index] = text;
        setPiecesText(newPiecesText);
        clearTimeoutTimeout();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddPiece();
        }
        clearTimeoutTimeout();
    };

    const clearTimeoutTimeout = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
    };

    const createNote = () => {
        const trimmedPieces = piecesText.filter((text) => text.trim() !== '');
        if (trimmedPieces.length > 0) {
            onCreate(trimmedPieces);
            resetForm();
        }
    };

    useEffect(() => {
        clearTimeoutTimeout();
        timeoutId.current = setTimeout(createNote, 5000);
    }, [piecesText]);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            const lastIndex = inputRefs.current.length - 1;
            inputRefs.current[lastIndex].focus();
        }
    }, [piecesText]);

    return (
        <div className="note-textarea">
            {piecesText.map((text, index) => (
                <textarea
                    key={index}
                    value={text}
                    onChange={(e) => handlePieceChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                        if (el) {
                            inputRefs.current[index] = el;
                        }
                    }}
                    placeholder={`New note piece ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default CreateNoteForm;

