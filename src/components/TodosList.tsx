// TodosList.tsx
import { Todo } from '../interfaces';
import TodoItem from './TodoItem';

interface TodosListProps {
    todos: Todo[];
    onUpdate: (todo_id: number, text: string, switchCompletion: boolean) => void;
    onDelete: (todo_id: number) => void;
}

const TodosList = ({ todos, onUpdate, onDelete}) => {
    return (
        <div>
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