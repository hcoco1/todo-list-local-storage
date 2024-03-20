// Updated TodoForm.js
import React from 'react';
import FormInput from './form_components/FormInput';
import FormSelect from './form_components/FormSelect';
import FormTextarea from './form_components/FormTextarea';

function TodoForm({ addTodo, newTodo, setNewTodo }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  return (
    <form onSubmit={addTodo}>
      <div className="form-row">
        <FormInput
          name="username"
          placeholder="Username 🙀"
          value={newTodo.username}
          onChange={handleInputChange}
        />

        <FormSelect
          name="afe"
          value={newTodo.afe}
          onChange={handleInputChange}
          options={[
            { label: 'AFE', value: '' },
            { label: 'AFE1', value: 'AFE1' },
            { label: 'AFE2', value: 'AFE2' },
          ]}
        />
        <FormSelect
          name="processPath"
          value={newTodo.processPath}
          onChange={handleInputChange}
          options={[
            { label: 'Process Path 🔎', value: '' },
            { label: 'Pack', value: 'Pack' },
            { label: 'Induct', value: 'Induct' },
            { label: 'Rebin', value: 'Rebin' },
            { label: 'Pack-other', value: 'Pack-other' },
            { label: 'Smartpac', value: 'Smartpac' },
          ]}
        />
        <FormSelect
          name="error"
          value={newTodo.error}
          onChange={handleInputChange}
          options={[
            { label: 'Error', value: '' },
            { label: 'Error Indicator', value: 'Error Indicator' },
            { label: 'Shortage', value: 'Shortage' },
            { label: 'Wrong Box', value: 'Wrong Box' },
            { label: 'Slam Kickout', value: 'Slam Kickout' },
            { label: 'Missing Item', value: 'Missing Item' },
            { label: 'Damaged', value: 'Damaged' },
            { label: 'Unscannable', value: 'Unscannable' },
          ]}
        />
      </div>
      <FormTextarea
        name="durable"
        placeholder="Audit 🪲"
        value={newTodo.durable}
        onChange={handleInputChange}
        rows="2"
      />
      <button type="submit">Add Audit</button>
    </form>
  );
}

export default TodoForm;