import React, { useState, useEffect } from 'react';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import TodoForm from '../components/todo/TodoForm';
import TodoItem from '../components/todo/TodoItem';
import TodoStats from '../components/todo/TodoStats';
import TodoFilter, { FilterType } from '../components/todo/TodoFilter';
import { Card } from '@/components/ui/card';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo]);
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const startEdit = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingId(id);
      setEditText(todo.text);
    }
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }

  const saveEdit = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    setEditingId(null);
    setEditText('');
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Todo List
        </h1>
        
        <Card className="p-6">
          <TodoForm onAddTodo={addTodo} />
          <TodoStats {...stats} />
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {filter === 'all' 
                  ? 'No todos yet. Add one above!' 
                  : `No ${filter} todos.`}
              </p>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  isEditing={editingId === todo.id}
                  editText={editText}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onStartEdit={startEdit}
                  onCancelEdit={cancelEdit}
                  onSaveEdit={saveEdit}
                  onEditTextChange={setEditText}
                />
              ))
            )}
          </div>
        </Card>
        
        <MadeWithApplaa />
      </div>
    </div>
  );
}

export default Index;