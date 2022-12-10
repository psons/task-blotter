/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React, { Component } from 'react';
import {endeavors} from "../../testdata/test-endeavors";
import {user_domain} from "../../testdata/test-user-domain";
import {EndeavorSprintMetaT, EndeavorT} from "../../types/endeavors";

/**
 * Defines the top level state for the App
 */
interface ProviderStateI  {
    sprint_max_tasks: number;
    sprint_tasks_added: number;             // runtime state that will not be persisted
    endeavors: EndeavorT[];
    endeavor_meta: EndeavorSprintMetaT[];   // runtime state that will not be persisted
}

/**
 * Adds action methods to the state to create the context
 */
export interface ContextI extends ProviderStateI {
    actions: {
        changeSprintMax: (delta: number) => void;
        changeEndeavorMax: (eidx: number, delta: number) => void;
        changeStoryMax: (eidx: number, sidx: number, delta: number) => void;
    }
}

const emptyEndeavorList: EndeavorT[] = [] // for use in the default context.

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example
export class TbProvider extends Component<any, ProviderStateI>{

    /**
     * Loads initial data state, and makes a call to initialize the meta data.
     * @param props
     */
    constructor(props: any) {
        super(props);
        // console.log(`TbProvider constructor: sprint_max_tasks: ${user_domain.sprint_max_tasks}`)
        this.state =  {
            sprint_max_tasks: user_domain.sprint_max_tasks,
            sprint_tasks_added: 0,
            endeavors: endeavors,
            endeavor_meta: TbProvider.buildEndeavorMeta(user_domain.sprint_max_tasks, endeavors)
        }
    }

    /**
     * Returns the number of tasks that will fit in the sprint list and the new capacity of the list
     * @param _capacity existing capacity of the list on entry
     * @param _candidates number of tasks caller would like to add to the sprint
     */
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

    /** sets metadata in a parallel structure to the Endeavors with info to render
     * stories and tasks correctly based on sprint inclusion.
     * */
    static buildEndeavorMeta(_sprint_max_tasks: number, _endeavors: EndeavorT[]){
        let _endeavor_meta: EndeavorSprintMetaT[] = [];
        let _sprintCapacityLeft = _sprint_max_tasks;
        let _contribution: number;
        for ( let eIdx=0 ; eIdx < endeavors.length ; eIdx++ ) {
            // console.log(`buildEndeavorMeta(-): endeavor[${eIdx}].name: ${_endeavors[eIdx].name}
            // endeavor[${eIdx}].eid: ${_endeavors[eIdx].eid}`);
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
                let _storyCandidateCount = 0;
                if (sIdx < endeavors[eIdx].maxStories ) {
                    /** the Endeavor eIdx is configured to include this story,
                     * so it may contribute some tasks to the sprint.
                     */
                    _storyCandidateCount = Math.min(_currentStory.taskList.length, _currentStory.maxTasks);
                }
                [_sprintCapacityLeft, _contribution ] = TbProvider.determineSprintContribution(
                                                                        _sprintCapacityLeft, _storyCandidateCount);
                // console.log(`\t currentStory.name: ${_currentStory.name} .sid: ${_currentStory.sid} `);
                if (!sprint_full) {
                    if (!sprint_ended) {
                        if (_sprintCapacityLeft <= 0) {
                            sprint_ended = true;
                            sprint_full = true;  // prevent further iterations from flipping sprint_ended true.
                        }
                    }
                }
                let _storySprint = {
                    sid: _currentStory.sid,
                    num_tasks_contributed: _contribution,
                    sprint_end: sprint_ended
                }
                _endeavor_meta[eIdx].story_meta_list.push(_storySprint);
            }
        }
        return _endeavor_meta;
    }

    /**
     * implements user action to increment or decrement the number of tasks that should be included in the sprint.
     * @param delta amount to change SprintMaxTask by (should save back to UserDomainT.sprint_task_count)
     */
    handleChangeSprintMaxTasks = (delta: number) => {
        // console.log("Got a click to change SprintMaxTask by:", delta);
        this.setState(
            prevState  => {
                return (
                    {sprint_max_tasks: prevState.sprint_max_tasks + delta}
                )
            }
        )
    }

    /**
     * implements user action to increment or decrement the number of stories from an endeavor
     * that may be contributing tasks to sprint.
     * @param eidx  the index of the EndeavorT in state.endeavors to update.
     * @param delta amount to change the EndeavorT.maxStories by
     */
    handleChangeEndeavorMaxStories = (eidx: number, delta: number) => {
        // console.log(`Got a click to change maxStories in endeavor by ${delta} for eidx: ${eidx}`);
        let stories = this.state.endeavors[eidx].story_list.length
        let newMax = Math.min(this.state.endeavors[eidx].maxStories + delta, stories);
        newMax = Math.max(newMax, 0);
        // This could have been done with IDs instead of indices:
        // https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
        this.setState(
            prevState => {
                const newState = Object.assign({}, prevState);
                newState.endeavors[eidx].maxStories = newMax
                return (newState)
            }
        )
    }

    /**
     * implements user action to increment or decrement the number of tasks a story
     * that may be contributing tasks to sprint.
     * @param eidx  the index of the EndeavorT in state.endeavors to update.
     * @param sidx  the index of the StoryT in state.endeavors[eidx].story_list to update.
     * @param delta amount to change the StoryT.maxStories by.
     */
    handleChangeStoryMaxTasks = (eidx: number, sidx: number, delta: number) => {
        // console.log(`Got a click to change maxTasks in story by ${delta} for eidx,sidx: ${eidx},${sidx}`);

        let tasks = this.state.endeavors[eidx].story_list[sidx].taskList.length;
        let newMax = Math.min(this.state.endeavors[eidx].story_list[sidx].maxTasks + delta, tasks);
        newMax = Math.max(newMax, 0);
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

    /**
     * React lifecycle method called to update the state used in (re) rendering components.
     * @param nextProps  Pros for the upcoming render cycle.
     * @param existingState State from the past render cycle.
     */
    static getDerivedStateFromProps(nextProps: any, existingState: ProviderStateI) {
        // console.log("React has called the lifecycle method TbProvider.getDerivedStateFromProps(-)")
        return {
            endeavor_meta: TbProvider.buildEndeavorMeta(existingState.sprint_max_tasks, endeavors)
        };
    }

    /**
     * Renders the provider that makes value / context data available to all descendant app components,
     * which is the whole App.
     */
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

/**
 * Default value for if TBContext is consumed when not under a provider.
 */
const defaultContext: ContextI =   {
    sprint_max_tasks: 2,
    sprint_tasks_added: 0,
    endeavors: emptyEndeavorList,
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

