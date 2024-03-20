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
            name="afe"
            value={todo.afe}
            onChange={(e) => handleEditChange(todo.id, e)}
          >
            <option value="af1">AFE1</option>
            <option value="afe2">AFE2</option>

          </select>
        ) : (
          todo.afe
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
          <select
            name="error"
            value={todo.error}
            onChange={(e) => handleEditChange(todo.id, e)}
          >
            <option value="errorindicator">Error Indicator</option>
            <option value="shortage">Shortage</option>
            <option value="wrongbox">Wrong Box</option>
            <option value="slamkickout">Slam Kickout</option>
            <option value="missing">Missing Item</option>
            <option value="damaged">Damaged</option>
            <option value="unscannable">Unscannable</option>
          </select>
        ) : (
          todo.error
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
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>❌</button>
        {todo.isEditing ? (
          <button onClick={() => saveEdit(todo.id)}>✅</button>
        ) : (
          <button onClick={() => toggleEdit(todo.id)}>🖋</button>
        )}
      </td>
    </tr>
  );
}

export default TodoItem;
