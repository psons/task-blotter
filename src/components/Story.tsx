import React from "react"
import {StoryT} from "../types/endeavors";
import Task from "./Task";

interface StoryCT {
    story_t: StoryT;
    // going to need to add some data here to tell it how to conditionally
    // style its tasks.
}

const Story = ( {story_t}: StoryCT ) =>
{
    const {maxTasks, name, taskList} = story_t;
    return (
        // <div className="task_list tasks_list_endeavor_in_sprint">
        <div>
            <div className="sep sep_story"> {name}
            </div>
            {taskList.map(task =>
                <Task key={task.tid} task_t={task}/>
            )}
        </div>
    );
}

export default Story;