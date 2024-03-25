// src/components/TodoItem.js
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
            <option value="AFE1">AFE1</option>
            <option value="AFE2">AFE2</option>
            <option value="Singles">Singles</option>

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
            <option value="Error I">Error I</option>
            <option value="shortage">Shortage</option>
            <option value="Wrongbox">Wrong Box</option>
            <option value="kickout">Kickout</option>
            <option value="missing">Missing Item</option>
            <option value="damaged">Damaged</option>
            <option value="unscannable">Unscannable</option>
            <option value="Shipment E">Shipment E</option>
          </select>
        ) : (
          todo.error
        )}
      </td>

      <td>
        {todo.isEditing ? (
          <select
            name="coaching"
            value={todo.coaching}
            onChange={(e) => handleEditChange(todo.id, e)}
          >
            <option value="The auditor identified vital areas needing improvement, including item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The associate acknowledged instances of oversight and received personalized coaching to address each issue. The coaching emphasized enhancing observation and inspection techniques, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items.">Induct</option>
            <option value="After identifying items directed to incorrect chutes, the team conducted a focused research on chute allocation accuracy within the Rebin process. The research revealed that the root cause was a combination of hurried work pace and misinterpretation of chute IDs. The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy.">Rebin</option>
            <option value="The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages. Specific challenges included incorrect box sizes being chosen, missed or inaccurate item scans, improper item placement leading to potential damage during transit, and inconsistencies in labeling practices.">Pack</option>
            <option value="The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs.">Slam Kickout</option>
            <option value=" ">None</option>

          </select>
        ) : (
          todo.coaching
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
