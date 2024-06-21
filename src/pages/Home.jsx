import React, { useState } from "react";
import "./style.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  
  function startEditTodo(id, text) {
    setEditTodoId(id);
    setEditTodoText(text);
  }

  function saveEditedTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editTodoText } : todo
      )
    );
    setEditTodoId(null); // Limpa o estado de edição
  }

  function addTodo() {
    if (input.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  }

  function toggleTodoCompletion(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function markAllCompleted() {
    const allCompleted = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    setTodos(updatedTodos);
  }

  function filteredTodos() {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }

  return (
    <>
      <h1>Todos</h1>
      <div className="todo-app">
        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="mark-all-button"
            onClick={markAllCompleted}
            title="Marcar todas como completas / incompletas"
          >
            {todos.every((todo) => todo.completed) ? "" : ""}
          </button>

          
        </div>
        <ul className="todo-list">
  {filteredTodos().map((todo) => (
   <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
   <div className="todo-content">
     <div className="left-content">
       <input
         type="checkbox"
         checked={todo.completed}
         onChange={() => toggleTodoCompletion(todo.id)}
       />
       {editTodoId === todo.id ? (
         <input
           type="text"
           className="edit-input"
           value={editTodoText}
           onChange={(e) => setEditTodoText(e.target.value)}
           onBlur={() => saveEditedTodo(todo.id)}
           onKeyPress={(e) => {
             if (e.key === "Enter") saveEditedTodo(todo.id);
           }}
         />
       ) : (
         <span className="todo-text" onDoubleClick={() => startEditTodo(todo.id, todo.text)}>{todo.text}</span>
       )}
     </div>
     <button className="delete-button" onClick={() => removeTodo(todo.id)}>X</button>
   </div>

  
 </li>
  
  ))}
</ul>


        <div className="footer">
          <span className="item-count">{todos.length} item(s) left!</span>
          <div className="filters">
            <button
              className={filter === "all" ? "selected" : ""}
              onClick={() => setFilter("all")}
              style={filter === "all" ? { border: "1px solid red" } : {}}
            >
              All
            </button>
            <button
              className={filter === "active" ? "selected" : ""}
              onClick={() => setFilter("active")}
              style={filter === "active" ? { border: "1px solid red" } : {}}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "selected" : ""}
              onClick={() => setFilter("completed")}
              style={filter === "completed" ? { border: "1px solid red" } : {}}
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted} className="clear-completed-btn">Clear completed</button>
        </div>
      </div>
    </>
  );
}
