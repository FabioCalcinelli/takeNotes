import React, { useState, useEffect } from 'react';
import "./CreateTodoForm.css"
interface CreateTodoFormProps {
    onCreate: (text: string) => void;
}


const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onCreate }) => {
    const [text, setText] = useState('');
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            if (text.trim() !== '') {
                onCreate(text.trim());
                setText('');
            }
        }, 5000);

        setTimeoutId(newTimeoutId);

        return () => clearTimeout(newTimeoutId);
    }, [text, onCreate]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <textarea
            className="todo-textarea"
            value={text}
            onChange={handleChange}
            placeholder="Todo text"
        />
    );
};
export default CreateTodoForm;