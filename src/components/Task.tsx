import React from "react";
import {TaskT} from "../types/endeavors"
import {Status} from "./Status";

// type TaskT = {
//     status: string;
//     title: string;
//     detail: string;
//     tid: string;
// }


const Task = ({status, title, detail, tid}: TaskT) => (
    <div className="task" key={tid}>
        <Status status={status}></Status>
        <p className="task_title"> {title} </p>
        <p className="task_detail"> {detail}</p>
    </div>
);

export default Task;