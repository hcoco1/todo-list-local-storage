import React, { useState } from 'react';
import PeriodSummary from './summary/PeriodSummary';
import AFESummary from './summary/AFESummary';
import ErrorSummary from './summary/ErrorSummary';
import moment from 'moment';
import { MDBBtn } from 'mdb-react-ui-kit';


function AuditSummary({ todos }) {
    const [selectedAuditor, setSelectedAuditor] = useState('');
    const [dateSince, setDateSince] = useState('');
    const [dateUntil, setDateUntil] = useState('');
    const resetFilters = () => {
        setDateSince('');
        setDateUntil('');
        setSelectedAuditor('');
    };

    const inlineStyle = { textAlign: 'center', color: 'black', fontWeight: 'bold', marginTop:'10px' }



    const filteredTodos = todos.filter(todo => {
        const matchesAuditor = selectedAuditor ? todo.auditor === selectedAuditor : true;

        // Convert string dates to Date objects for comparison
        const todoDate = new Date(todo.createdAt);
        const sinceDate = dateSince ? new Date(dateSince) : null;
        const untilDate = dateUntil ? new Date(dateUntil) : null;

        // Check if the todo's date is within the "since" and "until" range
        const matchesSince = sinceDate ? todoDate >= sinceDate : true;
        const matchesUntil = untilDate ? todoDate <= untilDate : true;

        return matchesAuditor && matchesSince && matchesUntil;
    });



    return (
        <div div className="header-summary">

            <div>
                <div>
                    <h4 style={inlineStyle}>Filter audits by:</h4>
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
                    <div className="filter-item">
                        <label htmlFor="auditor-select">Auditor:</label>
                        <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
                            <option value="">Audits by all auditors</option>
                            <option value="ariaivan">Audits by ariaivan</option>
                            <option value="yoalugol">Audits by yoalugol</option>
                        </select>

                    </div>
                    <div className="filter-item">
                        <MDBBtn size='sm' className='mx-5' color='warning' onClick={resetFilters}>Reset</MDBBtn>
                    </div>
                </div>


                <h6 style={inlineStyle}>
                    <strong style={{ color: 'red', fontSize: '16px' }}>{filteredTodos.length} Audits found</strong>
                    {dateSince && ` from ${moment(dateSince).format('dddd, MMMM Do YYYY, h:mm a')} `}
                    {dateUntil && ` to ${moment(dateUntil).format('dddd, MMMM Do YYYY, h:mm a')} `}
                    {selectedAuditor && ` by ${selectedAuditor}`}
                </h6>
                <div>

                    <PeriodSummary filteredTodos={filteredTodos} />
                    <AFESummary filteredTodos={filteredTodos} />
                    <ErrorSummary filteredTodos={filteredTodos} />
                </div>

            </div>
        </div>


    )
}

export default AuditSummary
