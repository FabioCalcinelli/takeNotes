import {useState, useEffect, FC} from 'react';
import "./CreateTodoForm.css"
import "./TodoItem.css"
interface CreateTodoFormProps {
    onCreate: (text: string) => void;
}


const CreateTodoForm: FC<CreateTodoFormProps> = ({ onCreate }) => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (text.trim() !== '') {
                onCreate(text.trim());
                setText('');
            }
        }
    };

    return (
        <textarea
            className="todo"
            value={text}
            onChange={handleChange}
            placeholder="Todo text"
            onKeyDown={handleKeyDown}
        />
    );
};
export default CreateTodoForm;