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
            { label: 'Singles', value: 'Singles' },
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
          { label: 'Coaching', value: '' },
          { label: 'Induct', value: "The auditor identified vital areas needing improvement, including item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The associate acknowledged instances of oversight and received personalized coaching to address each issue. The coaching emphasized enhancing observation and inspection techniques, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
          { label: 'Rebin', value: "After identifying items directed to incorrect chutes, the team conducted a focused research on chute allocation accuracy within the Rebin process. The research revealed that the root cause was a combination of hurried work pace and misinterpretation of chute IDs. The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
          { label: 'Pack', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages. Specific challenges included incorrect box sizes being chosen, missed or inaccurate item scans, improper item placement leading to potential damage during transit, and inconsistencies in labeling practices." },
          { label: 'Slam Kickout', value: "The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs." },
          { label: 'None', value: " " },
        ]}
      />
      <FormTextarea
        name="durable"
        placeholder="Observations"
        value={newTodo.durable}
        onChange={handleInputChange}
        rows="2"
      />
      <button type="submit">Add Audit</button>
    </form>
  );
}

export default TodoForm;