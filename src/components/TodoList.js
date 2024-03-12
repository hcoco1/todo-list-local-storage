// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>AA</th>
          <th>Process</th>
          <th>Durable</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
            handleEditChange={handleEditChange}
            saveEdit={saveEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
