/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React from "react";
import {EndeavorT, EndeavorSprintMetaT, StoryT, StorySprintMetaT} from "../types/endeavors";
import Story from "./Story"
import {TbContext} from "./context/TbContext";

interface EndeavorCT {
    eidx: number;
    endeavor_t: EndeavorT;
    endeavor_meta: EndeavorSprintMetaT;
    grid_area: string;
}

/**
 * Display component corresponding to the top level of the Endeavor, Story, and Task
 * data hierarchy.
 */
class Endeavor extends React.Component<EndeavorCT, any> {

    static contextType = TbContext;
    context!: React.ContextType<typeof TbContext>;

    /**
     * Builds and returns the task list JSX elements to display for stories in this endeavor.
     * Two cases are supported:
     *      - is_in_sprint informs the Story component to renter its parts that are
     *      in sprint according to the metadata.
     *      - else informs the Story component to renter its parts that are
     *      out of the sprint according to the metadata.
     * @param stories the list of stories in this endeavor.
     * @param story_displays the list of display metadata about stores in this Endeavor.
     * @param is_in_sprint true if the task list to render is in sprint.
     * @param maxStories is the number of stories endeavor is configured to contribute tasks into the sprint
     */
    buildRenderStories(
        stories: StoryT[], story_displays: StorySprintMetaT[],
        is_in_sprint: boolean, maxStories: number=-1)  {
        let _renderStories: JSX.Element[] = [];
        for ( let sIdx=0 ; sIdx < stories.length  ; sIdx++) {
            // console.log(`Endeavor in_sprint story: ${stories[sIdx].name}`)
            if (is_in_sprint ) {
                // in the sprint, push only stories less than maxStories
                if (sIdx < maxStories) {
                    _renderStories.push(
                        <Story eidx={this.props.eidx} sidx={sIdx}
                               story_t={stories[sIdx]} story_meta={story_displays[sIdx]}
                               is_top={is_in_sprint} key={stories[sIdx].sid}></Story>)
                }
            } else {
                _renderStories.push(
                    // below the sprint, push everything
                    <Story eidx={this.props.eidx} sidx={sIdx}
                           story_t={stories[sIdx]} story_meta={story_displays[sIdx]}
                           is_top={is_in_sprint} key={stories[sIdx].sid}></Story>)
            }
        }
        return _renderStories;
    }

    /**
     * returns JSX to render Endeavor with major parts:
     *  - header bar with control to set number of stories
     *  - list of Story components included in sprint.
     *  - list of Story components not included in sprint.
     *
     * uses:
     *  - real data via props.endeavor_t
     *  - metdata for rendering logic via props.endeavor_meta
     */
    render () {
        // {endeavor_t, grid_area} = this.props.;
        const {_id, name, maxStories, eid, story_list} = this.props.endeavor_t;
        const {eid: eid_meta, story_meta_list: story_display_list} = this.props.endeavor_meta;
        // console.log(`Endeavor: eid:${eid} eid_meta: ${eid_meta}`)

        return (
            // going to need to rotate through the grid areas: e1_area, e2_area, e3_area
            <div className={"endeavor " + this.props.grid_area}>
                <div className="endeavor_head_bar">
                        <span className="incremetable">
                            <button className="micro-control"
                                onClick={() => this.context.actions.changeEndeavorMax(
                                this.props.eidx, -1)}> - </button>

                            <span className="micro-inline">{maxStories}</span>
                            <button className="micro-control"
                                onClick={() => this.context.actions.changeEndeavorMax(
                                this.props.eidx, 1)}> + </button>
                        </span>
                    {/*<div className="endeavor_max_stories_value">{maxStories}</div>*/}
                    <span className="endeavor_name">{name}</span>
                </div>
                <div className="task_list tasks_list_endeavor_in_sprint">
                    {this.buildRenderStories(story_list,
                        story_display_list, true,
                        this.context.endeavors[this.props.eidx].maxStories)}
                </div>
                <div className="task_list tasks_list_endeavor_out_of_sprint">
                    {this.buildRenderStories(story_list, story_display_list, false)}
                </div>
                <div className="endeavor_footer">
                    <div className="show_endeavor_editor">Edit Endeavor</div>
                </div>
            </div>
        );
    }

}

export default Endeavor;
