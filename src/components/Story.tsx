import React from "react"
import {StoryT, TaskT} from "../types/endeavors";
import Task from "./Task";

const Story = ({maxTasks, name, sid, taskList}: StoryT) => (

    // <div className="task_list tasks_list_endeavor_in_sprint">
    <div className="task_list tasks_list_endeavor_in_sprint">
        {/*{ Story component-}*/}
        <div className="sep sep_story"> {name}
        </div>
        {/*console.log(`task: status=${task.status} title=${task.title}`)*/}
        {taskList.map(task =>
            <Task
                status={task.status}
                title={task.title}
                detail={task.detail}
                tid={task.tid}/>
        )}
        {/*<div className="task">*/}
        {/*    <div className="task_status"> d</div>*/}
        {/*    <p className="task_title"> Head 1, 1, 1 </p>*/}
        {/*    <p className="task_detail"> Body for E1, S1, T1 Is potentially many lines and may wrap again and again,*/}
        {/*        depending on column width</p>*/}
        {/*</div>*/}
    </div>
        );

export default Story;