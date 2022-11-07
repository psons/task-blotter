import React, {Context, ContextType} from 'react';
import '../css/t_blotter.css';
import '../css/layout.css';
import {endeavors} from "../testdata/test-endeavors";
import {user_domain} from "../testdata/test-user-domain";
import StatPanel from "./StatPanel";
import Endeavor from "./Endeavor";
import {EndeavorT, StatsT} from "../types/endeavors";

import {TbContext, TbProvider} from "./context/TbContext";
import {ContextI} from "./context/TbContext";
// Comment

class App extends React.Component<any, any>{
    static contextType = TbContext;
    // const contextType: ContextI;
    // const context: ContextType<Context<ContextI>>;

    // trackCapacity(requestCount: number) {
    //
    // }
    capacityLeft: number;

    // pass updateCapacity to Story Components so they can call back and
    // let the App know how many tasks are being rendered as in the sprint.
    // it should the least of the storyMaxTasks or the number of tasks
    // actually in the story
    updateCapacity (storyTasks: number): number {
        let acceptedInSprint: number;
        if (storyTasks <= this.capacityLeft) {
            acceptedInSprint = storyTasks;
            this.capacityLeft = this.capacityLeft - acceptedInSprint;
            return acceptedInSprint;
        } else /*(storyTasks > this.capacityLeft)*/ {
            acceptedInSprint = this.capacityLeft;
            this.capacityLeft = 0;
            return acceptedInSprint;
        }
    }

    constructor(props: any) {

        super(props)
        // var context: ContextType<Context<ContextI>>
        // let appContext: ReactContext<ContextI> ;
        // let appContext = this.context;
        //
        console.log(`App: sprint_max_tasks: ${user_domain.sprint_max_tasks}`)
        // this.state = {date: new Date()};
        this.capacityLeft = user_domain.sprint_max_tasks;

        console.log("Top Level Task Blotter class constructor App:src/components/App.tsx.")
        for ( let eIdx=0 ; eIdx < endeavors.length ; eIdx++ ) {
            console.log(`endeavor[${eIdx}].name: ${endeavors[eIdx].name}`);
            for ( let sIdx=0 ; sIdx < endeavors[eIdx].story_list.length ; sIdx++){
                let currentStory = endeavors[eIdx].story_list[sIdx];
                let length = currentStory.taskList.length
                let storyMaxTasks = currentStory.maxTasks
                let sprintCandidateCount = length < storyMaxTasks ? length : storyMaxTasks;
                let sprintContribution = this.updateCapacity(sprintCandidateCount);
                console.log(`\tcurrentStory.name: ${currentStory.name} .maxTasks ${currentStory.maxTasks} ` +
                    `.taskList.length ${currentStory.taskList.length} sprintContribution ${sprintContribution}`);
                for ( let tIdx=0 ; tIdx < endeavors[eIdx].story_list[sIdx].taskList.length; tIdx++) {
                    console.log(`\t\ttask[${tIdx}].title: ${endeavors[eIdx].story_list[sIdx].taskList[tIdx].title}`);
                    console.log(`\t\tcapacityLeft: ${this.capacityLeft}`)
                }
            }
        }
    }

    render() {
        let screenLayout = "full_width_3_col"; // grid container
        let endeavorGridAreas = ["e1_area", "e2_area", "e3_area"]
        let renderEndeavors = [];
        let renderCount = 0
        let endeavorColumns = 3;

        while ((renderCount < endeavorColumns) && (renderCount < endeavors.length)){
            renderEndeavors.push(<Endeavor
                endeavor_t={endeavors[renderCount]}
                grid_area={endeavorGridAreas[renderCount]}
                key={endeavors[renderCount].eid}
            />);
            renderCount++;
        }
        let ec = endeavors.length;

        // todo this will become application state, and tasks becomes user modifiable
        let stats_t: StatsT = {task_count: user_domain.sprint_max_tasks, endeavor_count: ec}
        return (
                <div className={"app " + screenLayout}>
                    <div className="screen_title title_area">Plan Sprint</div>
                    {/*<StatPanel stats_t={stats_t}  />*/}
                    <StatPanel stats_t={stats_t}  />
                    <div className="b3_area">
                        <div className="menu_choice">Goals</div>
                    </div>
                    <div className="b2_area">
                        <div className="menu_choice">Plan</div>
                    </div>
                    <div className="b1_area">
                        <div className="menu_choice">Todo</div>
                    </div>
                    { renderEndeavors }
                </div>
        );

    }

}


export default App;
