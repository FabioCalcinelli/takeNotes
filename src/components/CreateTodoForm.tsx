// CreateTodoForm.tsx
import React, { useState } from 'react';

interface CreateTodoFormProps {
    onCreate: (text: string) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onCreate }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Todo</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Todo text"
            />
            <button type="submit">Create Todo</button>
        </form>
    );
};

export default CreateTodoForm;