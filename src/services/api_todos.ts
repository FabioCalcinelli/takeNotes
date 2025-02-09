import {Todo} from '../interfaces';
import {API_BASE_URL} from "./api_notes";

export async function createTodo(text: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pieces: text,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        const todoId = data.todo_id;
        const noteResponse = await fetch(`${API_BASE_URL}/todos/${todoId}`);
        return await noteResponse.json();
    } else {
        console.error('Error creating todo:', response.status);
        throw new Error('Failed to create todo');
    }
}

export async function getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to get todos');
        }
    } else {
        console.error('Error getting todos:', response.status);
        throw new Error('Failed to get todos');
    }
}

export async function updateTodo(todo_id: number, text: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/todos/${todo_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
        }),
    });

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to update todo');
        }
    } else {
        console.error('Error updating todo:', response.status);
        throw new Error('Failed to update todo');
    }
}

export async function deleteTodo(todo_id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/todos/${todo_id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        try {
            return await response.json();
        } catch (error) {
            console.error('Error parsing response:', error);
            throw new Error('Failed to delete todo');
        }
    } else {
        console.error('Error deleting todo:', response.status);
        throw new Error('Failed to delete todo');
    }
}
