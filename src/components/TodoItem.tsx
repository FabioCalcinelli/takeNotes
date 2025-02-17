// TodoItem.tsx
import { useState } from 'react';
import { Todo } from '../interfaces';
import './TodoItem.css'
import {convertTimestampToDateAndTime} from "../helper/convert_timestamp.ts";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (todo_id: number, text: string, switchCompletion: boolean) => void;
    onDelete: (todo_id: number) => void;
}

const TodoItem = ({ todo, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSave = () => {
        if (todo.id !== undefined) {
            onUpdate(todo.id, text, false);
            setIsEditing(false);
        }
    };

    const handleSwitchCompletion = () => {
        if (todo.id !== undefined) {
            onUpdate(todo.id, text, true);
        }
    };

    return (
        <div className={`todo ${todo.completed ? 'completed' : 'uncompleted'}`}>
            <div className="todo-header">
                <h3>#{todo.id} - {convertTimestampToDateAndTime(todo.timestamp)}</h3>
                {todo.completion_timestamp && (
                    <p className="completion-timestamp">
                        {todo.completed ? 'Completed at: ' : 'Last completed at: '}
                        {convertTimestampToDateAndTime(todo.completion_timestamp)}
                    </p>
                )}
            </div>
            {isEditing ? (
                <div>
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Todo text"
                    />
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>{todo.text}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => todo.id !== undefined && onDelete(todo.id)}>
                        Delete
                    </button>
                    <button onClick={handleSwitchCompletion}>
                        {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;