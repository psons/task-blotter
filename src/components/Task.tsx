/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React, {FunctionComponent} from "react";
import {TaskT} from "../types/endeavors"
import {Status} from "./Status";

// This CT component Type is the destructured properties needed by a Component
export interface TaskCT {
    task_t: TaskT;
    is_sprint_candidate: boolean;
}

/**
 *
 * @param task_t  TaskT data destructured from props.
 * @param is_sprint_candidate boolean to set css style based on sprint status.
 * @constructor
 */
const Task: FunctionComponent<TaskCT> = ({task_t, is_sprint_candidate}: TaskCT) => {
    let {status, title, detail, tid} = task_t;
    console.log()
    let sprintRenderStyle = is_sprint_candidate ? " " : "additional_task_out"
    return (
        <div className={"task " + sprintRenderStyle}>
            <Status status={status}></Status>
            <p className="task_title"> {title} </p>
            <p className="task_detail"> {detail}</p>
        </div>
    )
};

export default Task;