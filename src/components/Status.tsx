


// The following 'name', 'pat_str', 'pattern' values are supported
// in tldocument.py for the text version task_blotter called tlog.py.
// # name, val, pat_str, pattern
// ('abandoned', 'a', "^[aA] *-"),
// ('completed', 'x', "^[xX] *-"),
// ('scheduled', 's', "^[sS] *-"),
// ('in_progress', '/', r'^[\/\\] *-'),
// ('unfinished', 'u', "^[uU] *-"),
// ('do', 'd', "^[dD] *-")

import React from "react";



// init map: https://stackoverflow.com/questions/35654495
var status_map = new Map([
    ['abandoned', 'a'],
    ['completed', 'x',],
    ['scheduled', 's'],
    ['in_progress', '/'],
    ['unfinished', 'u'],
    ['do', 'd'],]);

interface StatusT {
    status: string;
}

const Status = ({status}: StatusT) => (
    <div className="task_status">{status_map.get(status)}</div>
)

export {Status}