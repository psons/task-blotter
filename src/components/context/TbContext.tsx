import React, { Component } from 'react';
import {endeavors} from "../../testdata/test-endeavors";
import {user_domain} from "../../testdata/test-user-domain";
import {TaskSprintDispositionT,
    TaskSprintMetaT, StorySprintMetaT, EndeavorSprintMetaT,
    StatsT, TaskT, StoryT, EndeavorT} from "../../types/endeavors";


interface ProviderStateI  {
    sprint_max_tasks: number;
    sprint_tasks_added: number;
    endeavors: EndeavorT[];
    endeavor_meta: EndeavorSprintMetaT[];
}

export interface ContextI extends ProviderStateI {
    actions: {
        changeSprintMax: (delta: number) => void;
        changeEndeavorMax: (eidx: number, delta: number) => void;
        changeStoryMax: (eidx: number, sidx: number, delta: number) => void;
        // registerSprintContribution: (storyTasks: number) => number ;//updateCapacity
    }

}

// this is for use in the defaut context.  todo: further simplify.
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

    // capacityLeft: number;   // run time number of tasks that can be
                            // rendered in the sprint.

    static determineSprintContribution(_capacity: number, _candidates: number) {
        let _acceptedInSprint: number;
        let _newCapacity: number;
        if (_candidates <= _capacity) {
            _acceptedInSprint = _candidates;
        } else /*(_candidates > _capacity)*/ {
            _acceptedInSprint = _capacity;
            // _newCapacity = 0;
        }
        _newCapacity = _capacity - _candidates;
        return [_newCapacity, _acceptedInSprint];
    }

    constructor(props: any) {
        super(props);
        // console.log(`TbProvider constructor: sprint_max_tasks: ${user_domain.sprint_max_tasks}`)

        this.state =  {
            sprint_max_tasks: 6,
            sprint_tasks_added: 0,
            endeavors: endeavors,
            endeavor_meta: TbProvider.buildEndeavorMeta(user_domain.sprint_max_tasks, endeavors)
        }
    }

    static buildEndeavorMeta(_sprint_max_tasks: number, _endeavors: EndeavorT[]){
        let _endeavor_meta: EndeavorSprintMetaT[] = [];
        let _sprintCapacityLeft = _sprint_max_tasks;
        let _contribution: number;
        for ( let eIdx=0 ; eIdx < endeavors.length ; eIdx++ ) {
            // console.log(`buildEndeavorMeta(-): endeavor[${eIdx}].name: ${_endeavors[eIdx].name} endeavor[${eIdx}].eid: ${_endeavors[eIdx].eid}`);
            _endeavor_meta.push(
                    {
                        eid: _endeavors[eIdx].eid,
                        story_meta_list: []
                    }
                )
            // console.log(`buildEndeavorMeta(-): _endeavor_meta[${eIdx}].eid: ${_endeavor_meta[eIdx].eid}`);
            let sprint_full = false;
            for ( let sIdx=0 ; sIdx < endeavors[eIdx].story_list.length ; sIdx++){
                let sprint_ended = false;
                let _currentStory = endeavors[eIdx].story_list[sIdx];
                let _storyCandidateCount = Math.min(_currentStory.taskList.length, _currentStory.maxTasks);
                [_sprintCapacityLeft, _contribution ] = TbProvider.determineSprintContribution(
                                                                        _sprintCapacityLeft, _storyCandidateCount);
                // console.log(`\t currentStory.name: ${_currentStory.name} .sid: ${_currentStory.sid} `);
                if (!sprint_full) {
                    if (!sprint_ended) {
                        if (_sprintCapacityLeft <= 0) {
                            sprint_ended = true;
                            sprint_full = true;  // prevent further iterations from trying to flip sprint_ended true.
                        }
                    }
                }
                // console.log(`\t\t .maxTasks: ${_currentStory.maxTasks} .taskList.length: ${_currentStory.taskList.length}`);
                // console.log(`\t\t _sprintCapacityLeft:${_sprintCapacityLeft} _contribution: ${_contribution}`);
                let _storySprint = {
                    sid: _currentStory.sid,
                    num_tasks_contributed: _contribution,
                    sprint_end: sprint_ended
                }
                _endeavor_meta[eIdx].story_meta_list.push(_storySprint);
                // console.log(`\t\t Pushed meta for ${_currentStory.sid} to _endeavor_meta[eIdx].story_display, which now has length` +
                //             `${_endeavor_meta[eIdx].story_meta_list.length}: ${JSON.stringify(_storySprint)}`)
            }

        }
        return _endeavor_meta;
    }

    handleChangeSprintMaxTasks = (delta: number) => {
        console.log("Got a click to change SprintMaxTask by:", delta);
        this.setState(
            prevState  => {
                return (
                    {sprint_max_tasks: prevState.sprint_max_tasks + delta}
                )
            }
        )
    }

    handleChangeEndeavorMaxStories = (eidx: number, delta: number) => {
        console.log(`Got a click to change maxStories in endeavor by ${delta} for eidx: ${eidx}`);
        let newMax = this.state.endeavors[eidx].maxStories + delta
        // This could have been done with IDs instead of indecies:
        // https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
        this.setState(
            prevState => {
                const newState = Object.assign({}, prevState);
                newState.endeavors[eidx].maxStories = newMax
                return (newState)
            }
        )
    }



    handleChangeStoryMaxTasks = (eidx: number, sidx: number, delta: number) => {
        console.log(`Got a click to change maxTasks in story by ${delta} for eidx,sidx: ${eidx},${sidx}`);
        let newMax = this.state.endeavors[eidx].story_list[sidx].maxTasks + delta
        // This could have been done with IDs instead of indecies:
        // https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
        this.setState(
            prevState => {
                const newState = Object.assign({}, prevState);
                newState.endeavors[eidx].story_list[sidx].maxTasks = newMax
                return (newState)
            }
        )
    }

    static getDerivedStateFromProps(nextProps: any, existingState: ProviderStateI) {

        console.log("React has called the lifecycle method TbProvider.getDerivedStateFromProps(-)")
        return {
            endeavor_meta: TbProvider.buildEndeavorMeta(existingState.sprint_max_tasks, endeavors)
        };
    }

    render () {
        return (
            <TbContext.Provider value={{
                sprint_max_tasks: this.state.sprint_max_tasks,
                sprint_tasks_added: this.state.sprint_tasks_added,
                endeavors: this.state.endeavors,
                endeavor_meta: this.state.endeavor_meta,
                actions: {
                    changeSprintMax: this.handleChangeSprintMaxTasks,
                    changeEndeavorMax: this.handleChangeEndeavorMaxStories,
                    changeStoryMax: this.handleChangeStoryMaxTasks

                }
        }}>
                {this.props.children}
            </TbContext.Provider>
        );
    }
}


const defaultContext: ContextI =   {
    sprint_max_tasks: 2,
    sprint_tasks_added: 0,
    endeavors: emptyEndeavor,
    endeavor_meta: [],
    actions: {
        changeSprintMax: ( delta: number) => {
            console.log(
                "actions.changeSprintMax is using a default, not an implementation in TbContext:" +
                `${delta}`)},
        changeEndeavorMax: (eidx: number, delta: number) => {
            console.log(
                "actions.changeEndeavorMax is using a default, not an implementation in TbContext:" +
                `${delta}`)},
        changeStoryMax: (eidx: number, sidx: number, delta: number) => {
            console.log(
                "actions.changeStoryMax is using a default, not an implementation in TbContext:" +
                `${delta}`)}
    }

}

export const TbContext = React.createContext<ContextI>(defaultContext);

export const TbConsumer = TbContext.Consumer;

