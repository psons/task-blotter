import React from "react";
import {TaskT} from "../types/endeavors"
import {Status} from "./Status";

// This CT component Type is the destructured properties needed by a Component
interface TaskCT {
    task_t: TaskT;
}

// const Task = ({status, title, detail, tid}: TaskT) => (
const Task = ({task_t}: TaskCT) => {
    let {status, title, detail, tid} = task_t;
    console.log()
    return (
        <div className="task">
            <Status status={status}></Status>
            <p className="task_title"> {title} </p>
            <p className="task_detail"> {detail}</p>
        </div>
    )
};

export default Task;