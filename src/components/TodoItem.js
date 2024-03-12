import React from 'react';
import '../App.css';

function TodoItem({ todo, index, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {todo.isEditing ? (
          <input
            type="text"
            name="username"
            value={todo.username}
            onChange={(e) => handleEditChange(todo.id, e)}
          />
        ) : (
          todo.username
        )}
      </td>
      <td>
        {todo.isEditing ? (
          <select
            name="processPath"
            value={todo.processPath}
            onChange={(e) => handleEditChange(todo.id, e)}
          >
            <option value="Pack">Pack</option>
            <option value="Induct">Induct</option>
            <option value="Rebin">Rebin</option>
            <option value="Pack-other">Pack-other</option>
            <option value="Smartpac">Smartpac</option>
          </select>
        ) : (
          todo.processPath
        )}
      </td>
      <td>
        {todo.isEditing ? (
          <input
            type="text"
            name="durable"
            value={todo.durable}
            onChange={(e) => handleEditChange(todo.id, e)}
          />
        ) : (
          todo.durable
        )}
      </td>
      <td>{todo.date}</td>
      <td>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
        {todo.isEditing ? (
          <button onClick={() => saveEdit(todo.id)}>Save</button>
        ) : (
          <button onClick={() => toggleEdit(todo.id)}>Edit</button>
        )}
      </td>
    </tr>
  );
}

export default TodoItem;
