/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React from "react"
import {StorySprintMetaT, StoryT, TaskT} from "../types/endeavors";
import Task, {TaskCT} from "./Task";
import {TbContext} from "./context/TbContext";

// Story Component Type
interface StoryCT {
    eidx: number;
    sidx: number;
    story_t: StoryT;  // Story Data Type
    story_meta: StorySprintMetaT;
    is_top: boolean;

}

/**
 * Uses actions methods in the context to manipulate story maxTasks.
 *
 */

class Story extends React.Component<StoryCT, any> {

    // type checking error note relating to ts-ignore in render.:
    // https://github.com/microsoft/TypeScript/issues/49357
    // https://stackoverflow.com/questions/53575461/react-typescript-context-in-react-component-class
    static contextType = TbContext;
    context!: React.ContextType<typeof TbContext>;

    buildRenderTasks( some_tasks: TaskT[], is_sp_cand: boolean, sprint_end: boolean, num_t_contrib: number) {
        let _renderTasks: JSX.Element[] = [];
        let end_sep: JSX.Element = (<div key={0} className="sep sep_sprint_end">
            Tasks after this are beyond sprint_max_tasks: (out of sprint)</div>);
        for ( let tIdx=0 ; tIdx < some_tasks.length ; tIdx++) {
            // console.log(`buildRenderTasks(-) task: ${some_tasks[tIdx].title}`)
            if (   sprint_end  // first iteration beyond sprint capacity
                && tIdx === num_t_contrib
                && is_sp_cand
            ) {
                _renderTasks.push(end_sep); // Push the sprint end separator into the list of elements to render()
                is_sp_cand = false;
            } else if ( tIdx >= num_t_contrib) {
                is_sp_cand = false;  // beyond sprint capacity
            }
            _renderTasks.push(
                <Task key={some_tasks[tIdx].tid} task_t={some_tasks[tIdx]} is_sprint_candidate={is_sp_cand}/>
            );
        }
        return _renderTasks;
    }

    /**
     * Returns JSX to render Story with major parts:
     * - header bar with control to set number of tasks te story should contribute to the sprinrt
     *  - list of Task components with style indicating if each is in or out of the sprint
     */
    render() {
        const {maxTasks, name, taskList} = this.props.story_t;
        const {sid, num_tasks_contributed, sprint_end} = this.props.story_meta
        let controlClassNames="incremetable ";
        // console.log(`Story.render() :: name: ${name}, maxTasks: ${maxTasks}`)
        // console.log(`\t :: sid: ${sid}, num_tasks_contributed: ${num_tasks_contributed} sprint_end: ${sprint_end}`)
        let taskListSlice: TaskT[];
        let is_sprint_candidate: boolean = this.props.is_top; // only top tasks in story can get into sprint
        if (this.props.is_top) {
            // top of taskList: possibly in the sprint
            taskListSlice = taskList.slice(0, maxTasks);
        } else {
            // bottom of taskList: not in the sprint
            taskListSlice = taskList.slice(maxTasks);
            controlClassNames += "not_displayed ";

        }
        // console.log(`taskListSlice map .title-: ${taskListSlice.map( task => task.title)}`)
        return (
                <React.Fragment>
                    <div className="sep sep_story ">
                        <span className={controlClassNames}>
                            <button className="micro-control" onClick={() => this.context.actions.changeStoryMax(
                                this.props.eidx,
                                this.props.sidx,
                                -1)}> - </button>

                            <span className="micro-inline">{maxTasks}</span>
                            <button className="micro-control" onClick={() => this.context.actions.changeStoryMax(
                                this.props.eidx,
                                this.props.sidx
                                , 1)}> + </button>
                        </span>
                    <span>{name}</span>
                    </div>
                    {this.buildRenderTasks( taskListSlice, is_sprint_candidate, sprint_end, num_tasks_contributed)}
                </React.Fragment>
        );
    }
}

export default Story;