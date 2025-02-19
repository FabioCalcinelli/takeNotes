// App.tsx
import {useState, useEffect} from 'react';
import {Note, Todo} from './interfaces';
import {getAllNotes, createNote, updateNote, deleteNote} from './services/api_notes';
import CreateNoteForm from './components/CreateNoteForm';
import CreateTodoForm from './components/CreateTodoForm';
import NotesList from './components/NotesList';
import TodosList from './components/TodosList';
import './App.css';
import {createTodo, deleteTodo, getAllTodos, updateTodo} from "./services/api_todos";

const App = () => {
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

    const handleUpdateTodo = async (todo_id: number, text: string, switchCompletion: boolean) => {
        try {
            await updateTodo(todo_id, text, switchCompletion);
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
        <div className="container">
            <div className="column">
                <div className="scrollable">
                    <TodosList
                        todos={todos}
                        onUpdate={handleUpdateTodo}
                        onDelete={handleDeleteTodo}
                    />
                </div>
                <CreateTodoForm onCreate={handleCreateTodo}/>
            </div>
            <div className="column">
                <div className="scrollable">
                    <NotesList
                        notes={notes}
                        onUpdate={handleUpdateNote}
                        onDelete={handleDeleteNote}
                    />
                </div>
                <CreateNoteForm onCreate={handleCreateNote}/>
            </div>
        </div>
    );
};

export default App;
