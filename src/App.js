import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // ADD
  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
  };

  // DELETE
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // TOGGLE
  const handleToggle = (index) => {
    setTodos(
      todos.map((item, i) =>
        i === index ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="logo">
        <h1 className="text-logo">To Do List</h1>

        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
        />

        <button onClick={handleAdd}>Add</button>

        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>

      <h2 className="text-lg">Task List</h2>

      <div className="todos">
        {todos.map((item, index) => {
          if (!showCompleted && item.isCompleted) return null;

          return (
            <div className="todos-flex" key={index}>
              <div className="todo-left">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(index)}
                />

                <span className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </span>
              </div>

              <button
                onClick={() => handleDelete(index)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <div className="footer">
        Completed: {todos.filter(t => t.isCompleted).length} | 
        Uncompleted: {todos.filter(t => !t.isCompleted).length}
      </div>
    </>
  );
}

export default App;