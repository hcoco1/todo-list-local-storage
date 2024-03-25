const TableComponent = ({ data, title }) => (
  <div>
  {/*   <h2>{title}</h2> */}
    <table>
      <thead>
        <tr>
          <th>{title.split(' ')[0]}</th>
          <th>Total</th>
          <th>I</th>
          <th>II</th>
          <th>III</th>
          <th>IV</th>
          
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            
            <td>{key}</td>
            <td>{value.total}</td>
            <td>{value.period1}</td>
            <td>{value.period2}</td>
            <td>{value.period3}</td>
            <td>{value.period4}</td>
            
          </tr>
        ))}
        
        
      </tbody>
    </table>
  </div>
);


export default TableComponent;
