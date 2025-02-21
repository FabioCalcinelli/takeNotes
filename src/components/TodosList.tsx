// TodosList.tsx
import { Todo } from '../interfaces';
import TodoItem from './TodoItem';

interface TodosListProps {
    todos: Todo[];
    onUpdate: (todo_id: number, text: string, switchCompletion: boolean) => void;
}

const TodosList = ({ todos, onUpdate}) => {
    return (
        <div>
            {todos
                .sort((a, b) => b.completed - a.completed)
                .map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={onUpdate}
                    />
                ))}
        </div>
    );
};

export default TodosList;