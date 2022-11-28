import React, { Component } from 'react';
import {endeavors} from "../../testdata/test-endeavors";
import {user_domain} from "../../testdata/test-user-domain";
import {TaskSprintDispositionT,
    TaskSprintT, StorySprintT, EndeavorSprintT,
    StatsT, TaskT, StoryT, EndeavorT} from "../../types/endeavors";


interface ProviderStateI  {
    sprint_max_tasks: number;
    sprint_tasks_added: number;
    endeavors: EndeavorT[];
}

export interface ContextI extends ProviderStateI {
    actions: {
        changeSprintMax: (delta: number) => void;
        // registerSprintContribution: (storyTasks: number) => number ;//updateCapacity
    }

}

// this is for use in the defau;t context.  todo: further simplify.
const emptyEndeavor = [
        {
            "_id": "",
            "name": "",
            "maxStories": 0,
            "eid": "",
            "story_list": [
            ]
        }
    ]


//export const TbProvider = TbContext.Provider;

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example
export class TbProvider extends Component<any, ProviderStateI>{

    capacityLeft: number;   // run time number of tasks that can be
                            // rendered in the sprint.

    // pass updateCapacity to Story Components so they can call back and
    // let the App know how many tasks are being rendered as in the sprint.
    // it should the least of the storyMaxTasks or the number of tasks
    // actually in the story
    determineSprintContribution = (_capacity: number, _candidates: number): [number, number] => {
        let _acceptedInSprint: number;
        let _newCapacity: number;
        if (_candidates <= _capacity) {
            _acceptedInSprint = _candidates;
            _newCapacity = _capacity - _acceptedInSprint;
        } else /*(_candidates > _capacity)*/ {
            _acceptedInSprint = _capacity;
            _newCapacity = 0;
        }
        return [_newCapacity, _acceptedInSprint];

    }


    constructor(props: any) {
        super(props);
        console.log(`TbProvider constructor: sprint_max_tasks: ${user_domain.sprint_max_tasks}`)
        this.capacityLeft = user_domain.sprint_max_tasks;  // gets reset each time we buildEndeavorMeta(-)

        // compose state of sprint_display and endeavors.

        this.buildEndeavorMeta(user_domain.sprint_max_tasks, endeavors);


        this.state =  {
            sprint_max_tasks: 6,
            sprint_tasks_added: 0,
            endeavors: endeavors
        }

        // for ( let eIdx=0 ; eIdx < this.state.endeavors.length ; eIdx++ ) {
        //     console.log(`endeavor[${eIdx}].name: ${this.state.endeavors[eIdx].name}`);
        //     for ( let sIdx=0 ; sIdx < this.state.endeavors[eIdx].story_list.length ; sIdx++){
        //         let currentStory = this.state.endeavors[eIdx].story_list[sIdx];
        //         let length = currentStory.taskList.length
        //         let storyMaxTasks = currentStory.maxTasks
        //         let sprintCandidateCount = length < storyMaxTasks ? length : storyMaxTasks;
        //         let sprintContribution = this.updateCapacity(sprintCandidateCount);
        //         console.log(`\tcurrentStory.name: ${currentStory.name} .maxTasks ${currentStory.maxTasks} ` +
        //             `.taskList.length ${currentStory.taskList.length} sprintContribution ${sprintContribution}`);
        //         for ( let tIdx=0 ; tIdx < endeavors[eIdx].story_list[sIdx].taskList.length; tIdx++) {
        //             console.log(`\t\ttask[${tIdx}].title: ${endeavors[eIdx].story_list[sIdx].taskList[tIdx].title}`);
        //             console.log(`\t\tcapacityLeft: ${this.capacityLeft}`)
        //         }
        //     }
        // }
    }



    buildEndeavorMeta = (_sprint_max_tasks: number, _endeavors: EndeavorT[]) => {
        let _endeavor_meta: EndeavorSprintT[] = [];
        let _sprintCapacityLeft = _sprint_max_tasks;
        let _contribution: number;
        for ( let eIdx=0 ; eIdx < endeavors.length ; eIdx++ ) {
            console.log(`buildEndeavorMeta(-): endeavor[${eIdx}].name: ${_endeavors[eIdx].name} endeavor[${eIdx}].eid: ${_endeavors[eIdx].eid}`);
            _endeavor_meta.push(
                    {
                        eid: _endeavors[eIdx].eid,
                        story_display: []
                    }
                )
            console.log(`buildEndeavorMeta(-): _endeavor_meta[${eIdx}].eid: ${_endeavor_meta[eIdx].eid}`);
            for ( let sIdx=0 ; sIdx < endeavors[eIdx].story_list.length ; sIdx++){
                let _currentStory = endeavors[eIdx].story_list[sIdx];
                let _storyCandidateCount = Math.min(_currentStory.taskList.length, _currentStory.maxTasks);
                [_sprintCapacityLeft, _contribution ] = this.determineSprintContribution(_sprintCapacityLeft, _storyCandidateCount);
                console.log(`\t currentStory.name: ${_currentStory.name} .sid: ${_currentStory.sid} `);
                console.log(`\t\t .maxTasks: ${_currentStory.maxTasks} .taskList.length: ${_currentStory.taskList.length}`);
                console.log(`\t\t _sprintCapacityLeft:${_sprintCapacityLeft} _contribution: ${_contribution}`);
                let _storySprint = {
                    sid: _currentStory.sid,
                    num_tasks_contributed: _contribution,
                    sprint_end: _sprintCapacityLeft === 0 ? true : false
                }
                _endeavor_meta[eIdx].story_display.push(_storySprint);
                console.log(`\t\t Pushed meta for ${_currentStory.sid} to _endeavor_meta[eIdx].story_display, which now has length` +
                            `${_endeavor_meta[eIdx].story_display.length}: ${JSON.stringify(_storySprint)}`)
                 // sprintContribution {sprintContribution}`);


            }

        }
    }




    handleChangeSprintMaxTasks = (delta: number) => {
        console.log("Got a click to change SprintMaxTask", delta);
        // todo call buildEndeavorMeta(-) here and add the _endeavor_meta to state.
        this.setState(
            prevState  => {
                //this.capacityLeft = this.state.sprint_max_tasks; // needed for rerender
                return (
                    {sprint_max_tasks: prevState.sprint_max_tasks + delta}
                )
            }
        )
    }



    render () {

        return (
            <TbContext.Provider value={{
                sprint_max_tasks: this.state.sprint_max_tasks,
                sprint_tasks_added: this.state.sprint_tasks_added,
                endeavors: this.state.endeavors,
                actions: {
                    changeSprintMax: this.handleChangeSprintMaxTasks,
                    // registerSprintContribution: this.updateCapacity,
                    // incrementSprintTasksAdded: this.handleIncrementSprintTasks
                }
        }}>
                {this.props.children}
            </TbContext.Provider>
        );
    }

}


// interface ProviderPropsI {}
const defaultContext: ContextI =   {
    sprint_max_tasks: 2,
    sprint_tasks_added: 0,
    endeavors: emptyEndeavor,
    actions: {
        changeSprintMax: (delta: number) => {
            console.log(
                "actions.changeSprintMax is using a default, not an implementation in TbContext:" +
                `${delta}`)},
        // registerSprintContribution: (storyTasks: number) => {
        //     console.log(
        //         "actions.registerSprintContribution is using a default, not an implementation in TbContext:" +
        //         `${storyTasks}`);
        //     return 0;
        // }
    }

}

export const TbContext = React.createContext<ContextI>(defaultContext);

export const TbConsumer = TbContext.Consumer;

