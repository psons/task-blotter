import React, {FunctionComponent} from "react"
import {StoryT, TaskT} from "../types/endeavors";
import Task, {TaskCT} from "./Task";

import {endeavors} from "../testdata/test-endeavors";
import Endeavor from "./Endeavor";

// Story Component Type
interface StoryCT {
    story_t: StoryT;  // Story Data Type
    is_top: boolean;
    // going to need to add some data here to tell it how to conditionally
    // style its tasks.
}

const Story = ( {story_t, is_top}: StoryCT ) =>
{
    const {maxTasks, name, taskList} = story_t;
    let taskListSlice: TaskT[];
    let is_sprint_candidate: boolean = is_top; // only top tasks in story can get into sprint
    if (is_top) {
        // top of taskList: possibly in the sprint
        taskListSlice = taskList.slice(0, maxTasks);
        // when is_top, we might hit the end of the sprint size of maxTasks and need to render
        // the following separator, and set all other is_sprint_candidate to false
        // <div class="sep sep_sprint_end">Tasks after this are beyond MaxTasks:</div>
    } else {
        // bottom of taskList: not in the sprint
        taskListSlice = taskList.slice(maxTasks);
    }
    console.log(`taskListSlice map .title-: ${taskListSlice.map( task => task.title)}`)
    // suppress display of separator for empty task lists.
    let classNames="sep sep_story "
    if (taskListSlice.length < 1){
        classNames= "not_displayed";
    }

    // Leaving renderTasks code commented, as example of the type that works
    // for the expanded array expression below in JSX.
    // let renderTasks: JSX.Element[];
    // renderTasks = [];
    // let renderCount = 0;
    return (
        <div>
            <div className={classNames}> {name} - {maxTasks}
            </div>
            {/*{ renderTasks }*/}
            {taskListSlice.map(task =>
                <Task key={task.tid} task_t={task} is_sprint_candidate={is_sprint_candidate}/>)
            }
        </div>
);
}

export default Story;