// App.tsx
import React, {useState, useEffect} from 'react';
import {Note, Todo} from './interfaces';
import {getAllNotes, createNote, updateNote, deleteNote} from './services/api_notes';
import CreateNoteForm from './components/CreateNoteForm';
import NotesList from './components/NotesList';
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "./services/api_todos";

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        fetchNotes();
        fetchTodos();
    }, []);

    const fetchNotes = async () => {
        try {
            const notes = await getAllNotes();
            console.log('Fetched notes:', notes);
            setNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const fetchTodos = async () => {
        try {
            const todos = await getAllTodos();
            console.log('Fetched todos:', todos);
            setTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleUpdateNote = async (note_id: number, piecesText: string[]) => {
        try {
            await updateNote(note_id, piecesText);
            console.log('Note updated successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteNote = async (note_id: number) => {
        try {
            await deleteNote(note_id);
            console.log('Note deleted successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateNote = async (piecesText: string[]) => {
        try {
            await createNote(piecesText);
            console.log('Note created successfully');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTodo = async (todo_id: number, text: string) => {
        try {
            await updateTodo(todo_id, text);
            console.log('Todo updated successfully');
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTodo = async (todo_id: number) => {
        try {
            await deleteTodo(todo_id);
            console.log('Todo deleted successfully');
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTodo = async (text: string) => {
        try {
            await createTodo(text);
            console.log('Todo created successfully');
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Notes App</h1>
            <CreateNoteForm onCreate={handleCreateNote}/>
            <NotesList
                notes={notes}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
            />
            <CreateTodoForm onCreate={handleCreateTodo}/>
            <TodosList
                todos={todos}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}/>
        </div>
    );
};

export default App;
