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
  const inlineStyle = { marginRight: '60px' }


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
          <strong>Work Shift Hours: </strong>{todo.period.startsWith('(') && todo.period.endsWith(')') ? todo.period.slice(1, -1) : todo.period}
        </span>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardSubTitle className="mb-1 text-start">
          <span style={inlineStyle}><strong>- AFE:</strong> {todo.afe}</span>
          <span style={inlineStyle}><strong>- Process:</strong> {todo.processPath}</span>
          <span style={inlineStyle}><strong>- Error:</strong> {todo.error}</span>
        </MDBCardSubTitle>

        <MDBCardText>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleTextClick(todo.coaching)}>
            <strong>- General Coaching:  </strong> ({todo.createdAt}). {todo.coaching}
          </span>
        </MDBCardText>
        <MDBCardText className="mb-0">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleTextClick(todo.durable)}>
            <strong>- Observations: </strong>{todo.durable}
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
          <strong>Created at: </strong>{todo.createdAt}
        </span>
        <span
          style={{ cursor: 'pointer' }}          >
          <MDBBtn size='sm' color='danger' onClick={() => onDelete(todo.id)}>
            <i className="fa-solid fa-trash-can"></i></MDBBtn>

        </span>
      </MDBCardFooter>
    </MDBCard>
  );
}

export default TodoCard;



