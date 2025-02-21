// TodoItem.tsx
import {ChangeEvent, useState, MouseEvent} from 'react';
import {Todo} from '../interfaces';
import './TodoItem.css'
import {convertTimestampToDateAndTime} from "../helper/convert_timestamp.ts";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (todo_id: number, text: string, switchCompletion: boolean) => void;
}

const TodoItem = ({todo, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSave = () => {
        if (todo.id !== undefined) {
            onUpdate(todo.id, text, false);
            setIsEditing(false);
        }
    };

    const handleSwitchCompletion = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (todo.id !== undefined) {
            onUpdate(todo.id, text, true);
        }
    };

    const CompletionButton = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className={todo.completed ? 'red-button' : 'green-button'}
                    onClick={handleSwitchCompletion}
                >
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
            </div>
        );
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
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSave();
                        }
                    }}
                    placeholder="Todo text"
                    autoFocus
                />
                    <CompletionButton />
                </div>
            ) : (
                <div>
                    <p onClick={() => setIsEditing(true)}>{todo.text}</p>
                    <CompletionButton />
                </div>
            )}
        </div>
    );
};

export default TodoItem;