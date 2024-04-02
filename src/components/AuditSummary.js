import React, { useState } from 'react';
import PeriodSummary from './summary/PeriodSummary';
import AFESummary from './summary/AFESummary';
import ErrorSummary from './summary/ErrorSummary';


function AuditSummary({ todos }) {
    const [selectedAuditor, setSelectedAuditor] = useState('');
    const [dateSince, setDateSince] = useState('');
    const [dateUntil, setDateUntil] = useState('');



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

                <h3>Filter by date, time and auditor name to show the Charts.</h3>

                <div className="filter-container">
                    <div className="filter-item">
                        <input id="date-since" type="datetime-local" value={dateSince} onChange={e => setDateSince(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <input id="date-until" type="datetime-local" value={dateUntil} onChange={e => setDateUntil(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
                            <option value="">Audits by all auditors</option>
                            <option value="ariaivan">Audits by ariaivan</option>
                            <option value="yoalugol">Audits by yoalugol</option>
                            <option value="Guest">Audits by Guest</option>
                        </select>
                    </div>
                    <h4>Filtered Charts: {filteredTodos.length}</h4>
                </div>
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
