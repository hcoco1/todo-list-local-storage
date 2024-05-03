// Updated TodoForm.js
import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import './TodoForm.css'

function TodoForm({ addTodo, newTodo, setNewTodo }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  return (
    <>

      <form onSubmit={addTodo}>
        <div>
          <h6>Fill out the form to add a new audit:</h6>
        </div>
        <div className="form-row">

{/*           <FormSelect
            name="auditor"
            value={newTodo.auditor}
            onChange={handleInputChange}
            options={[
              { label: 'Auditor', value: '' },
              { label: 'ariavan', value: 'ariaivan' },
              { label: 'yoalugol', value: 'yoalugol' },


            ]}
          /> */}



          <FormSelect
            name="period"
            value={newTodo.period}
            onChange={handleInputChange}
            options={[
              { label: 'Work Shift Hours', value: '' },
              { label: '6:30-10:00 PM', value: '(6:30-10:00 PM)' },
              { label: '10:30 PM-02:00 AM', value: '(10:30 PM-02:00 AM)' },
              { label: '2:30 AM-05:00 AM', value: '(2:30 AM-05:00 AM)' },
              { label: '5:15 AM-07:00 AM', value: '(5:15 AM-07:00 AM)' },
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
              { label: 'Process', value: '' },
              { label: 'AFE1', value: 'AFE1' },
              { label: 'AFE2', value: 'AFE2' },
              { label: 'Pack Singles', value: 'Pack Singles' },
            ]}
          />

          <FormSelect
            name="processPath"
            value={newTodo.processPath}
            onChange={handleInputChange}
            options={[
              { label: 'Sub Process', value: '' },
              { label: 'Pack', value: 'Pack' },
              { label: 'Induct', value: 'Induct' },
              { label: 'Rebin', value: 'Rebin' },
              { label: 'Pack Other', value: 'Pack Other' },
              { label: 'Smartpac', value: 'Smartpac' },
            ]}
          />



        </div>
        <div className="form-row">

          <FormSelect
            name="error"
            value={newTodo.error}
            onChange={handleInputChange}
            options={[
              { label: 'Error', value: '' },
              { label: 'Rebin Error Indicator', value: 'Rebin Error Indicator' },
              { label: 'Induct Error Indicator', value: 'Induct Error Indicator' },
              { label: 'Induct Shortage', value: 'Induct Shortage' },
              { label: 'Induct Damaged', value: 'Induct Damaged' },
              { label: 'Induct Unscannable', value: 'Induct Unscannable' },
              { label: 'Pack Wrong Box', value: 'Pack Wrong Box' },
              { label: 'Slam Kickout', value: 'Slam Kickout' },
              { label: 'Pack Item Missing', value: 'Pack Item Missing' },
              { label: 'Pack Item Damaged', value: 'Pack Item Damaged' },
              { label: 'Pack Item Unscannable', value: 'Pack Item Unscannable' },
              { label: 'Pack Shipment Exception', value: 'Pack Shipment Exception' },
            ]}
          />



          <FormSelect
            name="coaching"
            value={newTodo.coaching}
            onChange={handleInputChange}
            options={[
              { label: 'Coaching', value: '' },
              { label: 'Induct', value: "The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
              { label: 'Induct Trays issues', value: "The auditor coached the associate, focusing on the crucial steps of accurately scanning items and ensuring their correct placement in trays. Accurate placement is critical for maintaining operational efficiency and preventing errors and missing items." },
              { label: 'Induct Damaged', value: "The auditor conducted a comprehensive review to evaluate the handling of damaged items within the Induct process. The team discovered that failures to report and adequately manage damaged items compromised the integrity of the individual items and posed a significant risk of damaging other items within the same tote. " },
              { label: 'Induct Shortage', value: "The auditor conducted a detailed review of missing items. During discussions, the associate acknowledged a few instances of oversight that may have contributed to missing items. However, several incidents involved different totes, suggesting variability in error sources. The team provided the associate with general coaching to enhance observation and improve inspection techniques. " },
              { label: 'Induct Unscannable', value: "The associate was coached to improve the procedures for managing unscannable items, with a particular emphasis on implementing a 'six-side check' by associates on each item and a thorough inspection to verify the presence of a scannable barcode, thereby identifying potential scanning impediments. " },
              { label: 'Rebin', value: "The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
              { label: 'Pack General', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages." },
              { label: 'Pack Item Missing', value: "The team initiated an audit focusing on the procedures for locating missing items (COIN Method). The associate was coached in checking multiple potential locations for missing items, including the floor, alternative chutes, and within the PS (Problem Solve) tote." },
              { label: 'Pack Damaged', value: "The associate was coached regarding the handling and reporting procedures for damaged items to assess the integrity and effectiveness of standard work protocols." },
              { label: 'Pack Wrong Box', value: "The team noted that the associate needed to match the recommended box size (displayed on the screen) with the actual size. Clear and concise instructions regarding box size matching were reiterated to the associate through an audit. The employee was reminded of the potential consequences of non-compliance, including increased kick-outs and operational disruptions." },
              { label: 'Pack Unscannable', value: "The associate was coached to improve the procedures for managing unscannable items, with a particular emphasis on implementing a 'six-side check' by associates on each item and a thorough inspection to verify the presence of a scannable barcode, thereby identifying potential scanning impediments." },
              { label: 'Pack Shipment Exceptions', value: "The associate was coached on the importance of promptly addressing shipment exceptions, like slip printer malfunctions, that can delay the packing process" },
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
        </div>

        <button type="submit">Add Audit</button>
      </form>
    </>


  );
}

export default TodoForm;





