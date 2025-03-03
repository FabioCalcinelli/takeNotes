import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FC } from "react";
import "./CreateNoteForm.css"

interface CreateNoteFormProps {
    onCreate: (piecesText: string[]) => void;
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({ onCreate }) => {
    const [piecesText, setPiecesText] = useState<string[]>(['']);
    const inputRefs = useRef<HTMLTextAreaElement[]>([]);
    const timeoutId = useRef<number | null>(null);
    const piecesTextRef = useRef<string[]>(piecesText);

    // Sync ref with current state
    useEffect(() => {
        piecesTextRef.current = piecesText;
    }, [piecesText]);

    const handleAddPiece = () => {
        setPiecesText([...piecesText, '']);
    };

    const handlePieceChange = (index: number, text: string) => {
        const newPiecesText = [...piecesText];
        newPiecesText[index] = text;
        setPiecesText(newPiecesText);

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            // Use ref to get latest state
            onCreate(piecesTextRef.current.filter((text) => text.trim() !== ''));
        }, 5000) as unknown as number;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCreate(piecesText.filter((text) => text.trim() !== ''));
        setPiecesText(['']);
    };

    const handleKeyDown = (index: number, e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddPiece();
        }

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            // Use ref to get latest state
            onCreate(piecesTextRef.current.filter((text) => text.trim() !== ''));
        }, 5000) as unknown as number;
    };

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

