import React, { useState } from 'react';
import PeriodSummary from './summary/PeriodSummary';
import AFESummary from './summary/AFESummary';
import ErrorSummary from './summary/ErrorSummary';
import moment from 'moment';
import { MDBBtn } from 'mdb-react-ui-kit';
import SubSummary from './summary/SubSummary';
import './AuditSummary.css'


function AuditSummary({ todos, currentUser }) {
    const [selectedAuditor, setSelectedAuditor] = useState('');
    const [dateSince, setDateSince] = useState('');
    const [dateUntil, setDateUntil] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');

    const resetFilters = () => {
        setDateSince('');
        setDateUntil('');
        

    };


    const inlineStyle = { textAlign: 'center', color: 'black', fontWeight: 'bold', marginTop: '10px' }



    const filteredTodos = todos.filter(todo => {
        // This line ensures we're only looking at todos where the auditor matches the current user
        const matchesAuditor = todo.auditor === currentUser.displayName;

        const matchesUsername = selectedUsername ? todo.username === selectedUsername : true;
        const todoDate = new Date(todo.createdAt);
        const sinceDate = dateSince ? new Date(dateSince) : null;
        const untilDate = dateUntil ? new Date(dateUntil) : null;
        const matchesSince = sinceDate ? todoDate >= sinceDate : true;
        const matchesUntil = untilDate ? todoDate <= untilDate : true;

        // Now, the return statement includes the matchesAuditor condition as well
        return matchesAuditor && matchesUsername && matchesSince && matchesUntil;
    });



    return (
        <div className="NotesContainer">

            <div className='chartsFilter'>
                <div>
                    <h6>Filter charts data by:</h6>
                </div>
                <div className="filter-container">
                    <div className="filter-item">
                        <label htmlFor="date-since">From:</label>
                        <input id="date-since" type="datetime-local" value={dateSince} onChange={e => setDateSince(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="date-until">To:</label>
                        <input id="date-until" type="datetime-local" value={dateUntil} onChange={e => setDateUntil(e.target.value)} />
                    </div>

                    {/*                     <div className="filter-item">
                        <label htmlFor="auditor-select">Auditor:</label>
                        <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
                            <option value="">Audits by all auditors</option>
                            <option value="ariaivan">Audits by ariaivan</option>
                            <option value="yoalugol">Audits by yoalugol</option>
                        </select>

                    </div> */}
                    <div className="filter-item">
                        <MDBBtn size='sm' color='warning' onClick={resetFilters}>Reset</MDBBtn>
                    </div>
                </div>


                <h6 style={inlineStyle}>
                    <strong style={{ color: 'red', fontSize: '16px' }}>{filteredTodos.length} Audits are visualized on the charts </strong>
                    {dateSince && ` from ${moment(dateSince).format('dddd, MMMM Do YYYY, h:mm a')} `}
                    {dateUntil && ` to ${moment(dateUntil).format('dddd, MMMM Do YYYY, h:mm a')} `}

                </h6>
            </div>











            <ErrorSummary filteredTodos={filteredTodos} />
            <PeriodSummary filteredTodos={filteredTodos} />
            <AFESummary filteredTodos={filteredTodos} />
            <SubSummary filteredTodos={filteredTodos} />




        </div>

    )
}

export default AuditSummary
