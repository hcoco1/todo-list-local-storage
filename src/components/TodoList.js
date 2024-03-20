// src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';
import AuditSummary from './AuditSummary';


function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {
  return (
    <div>
      <AuditSummary todos={todos} />
    
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>AA</th>
          <th>AFE</th>
          <th>Process</th>
          <th>Error</th>
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
    </div>
  );
}

export default TodoList;
