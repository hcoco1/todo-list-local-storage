import React from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardSubTitle,
  MDBCardText,
  MDBBtn,
  MDBCardFooter
} from 'mdb-react-ui-kit';

function TodoCard({ todo, onDelete }) {

 
  const handleTextClick = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied!'))
      .catch(err => console.error('Error copying text: ', err));
  };

  return (
    <MDBCard border='primary' background='light' className='text-black mb-3'>
      <MDBCardHeader className="d-flex justify-content-between text-muted" tag="p">
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => handleTextClick(todo.username)}>
          <strong>Associate: </strong>{todo.username}
        </span>
        
        <span
          style={{ cursor: 'pointer' }}          > 
          <strong>Period: </strong>{todo.period} {/* Change 'otherField' to the actual field you want to display */}
        </span>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardSubTitle className="mb-1 text-start">
          {/* Here, showing the period, AFE, process, and error without copy functionality */}
          <strong>- AFE:</strong> {todo.afe} <strong>- Process:</strong> {todo.processPath} <strong>- Error:</strong> {todo.error}
        </MDBCardSubTitle>
        <MDBCardText>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleTextClick(todo.coaching)}>
            <strong>- General Coaching:</strong>{todo.coaching}
          </span>
        </MDBCardText>
        <MDBCardText  className="mb-0">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleTextClick(todo.durable)}>
            <strong>- Observations:</strong>{todo.durable}
          </span>
        </MDBCardText>           
      </MDBCardBody>
      <MDBCardFooter className=" d-flex justify-content-between text-muted" tag="p">
        <span
          style={{ cursor: 'pointer' }}
          >
          <strong>Created by: </strong>{todo.auditor}
        </span>
        
        <span
          style={{ cursor: 'pointer' }}          > 
          <MDBBtn size='sm' color='danger' onClick={() => onDelete(todo.id)}>Delete</MDBBtn> {/* Change 'otherField' to the actual field you want to display */}
        </span>
      </MDBCardFooter>
    </MDBCard>
  );
}

export default TodoCard;

    

