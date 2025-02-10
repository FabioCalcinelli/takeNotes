// TodosList.tsx
import React from 'react';
import { Todo } from '../interfaces';
import TodoItem from './TodoItem';

interface TodosListProps {
    todos: Todo[];
    onUpdate: (todo_id: number, text: string) => void;
    onDelete: (todo_id: number) => void;
}

const TodosList: React.FC<TodosListProps> = ({ todos, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>All Todos</h2>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodosList;