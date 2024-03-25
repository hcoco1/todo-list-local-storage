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

      <FormSelect
          name="period"
          value={newTodo.period}
          onChange={handleInputChange}
          options={[
            { label: 'Period', value: '' },
            { label: '6:30 -10:00 PM', value: '1' },
            { label: '10:30 PM -02:00 AM', value: '2' },
            { label: '2:30 AM -05:00 AM', value: '3' },
            { label: '5:15 AM -07:00 AM', value: '4' },
          ]}
        />
        <FormInput
          name="username"
          placeholder="Username"
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
            { label: 'SINGLES', value: 'SINGLES' },
          ]}
        />
        <FormSelect
          name="processPath"
          value={newTodo.processPath}
          onChange={handleInputChange}
          options={[
            { label: 'Process', value: '' },
            { label: 'Pack', value: 'Pack' },
            { label: 'Induct', value: 'Induct' },
            { label: 'Rebin', value: 'Rebin' },
            { label: 'Pack Other', value: 'Other' },
            { label: 'Smartpac', value: 'Smartpac' },
          ]}
        />
        <FormSelect
          name="error"
          value={newTodo.error}
          onChange={handleInputChange}
          options={[
            { label: 'Error', value: '' },
            { label: 'Error I', value: 'Error I' },
            { label: 'Shortage', value: 'Shortage' },
            { label: 'Wrong Box', value: 'Wrong Box' },
            { label: 'Kickout', value: 'Kickout' },
            { label: 'Missing Item', value: 'Missing Item' },
            { label: 'Damaged', value: 'Damaged' },
            { label: 'Unscannable', value: 'Unscannable' },
            { label: 'Shipment E', value: 'Shipment E' },
          ]}
        />
      </div>

      <FormSelect
        name="coaching"
        value={newTodo.coaching}
        onChange={handleInputChange}
        options={[
          { label: 'General pre-build coaching', value: '' },
          { label: 'Induct', value: "The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
          { label: 'Rebin', value: "The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
          { label: 'Pack', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages." },
          { label: 'Slam Kickout', value: "The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs." },
          { label: 'None', value: " " },
        ]}
      />
      <FormTextarea
        name="durable"
        placeholder="Personalized Coaching"
        value={newTodo.durable}
        onChange={handleInputChange}
        rows="2"
      />
      <button type="submit">Add Audit</button>
    </form>
  );
}

export default TodoForm;