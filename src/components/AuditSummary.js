import React from 'react'
import PeriodSummary from'./summary/PeriodSummary';
import AFESummary from './summary/AFESummary';
import ErrorSummary from './summary/ErrorSummary';
import Greeting from './Greeting';

function AuditSummary({todos}) {
    return (
        <div>
            <Greeting todos={todos}/>
            <PeriodSummary todos={todos} />
            <AFESummary todos={todos} />
            <ErrorSummary todos={todos} /></div>
    )
}

export default AuditSummary
