// App.tsx
import {useState, useEffect, useRef, useLayoutEffect} from 'react';
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

    const handleCreateTodo = async (text: string) => {
        try {
            await createTodo(text);
            console.log('Todo created successfully');
            fetchTodos();
        } catch (error) {
            console.error(error);
        }
    };

    const todoColumnRef = useRef<HTMLDivElement | null>(null);
    const noteColumnRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        todoColumnRef.current?.scrollTo(0, todoColumnRef.current?.scrollHeight);
        noteColumnRef.current?.scrollTo(0, noteColumnRef.current?.scrollHeight);
    }, [todos, notes]);

    return (
        <div className="container">
            <div className="column" ref={todoColumnRef}>
                <TodosList
                    todos={todos}
                    onUpdate={handleUpdateTodo}
                />
                <CreateTodoForm onCreate={handleCreateTodo}/>
            </div>
            <div className="column" ref={noteColumnRef}>
                <NotesList
                    notes={notes}
                    onUpdate={handleUpdateNote}
                />
                <CreateNoteForm onCreate={handleCreateNote}/>
            </div>
        </div>
    );
};

export default App;
