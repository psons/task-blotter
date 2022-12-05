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

class Endeavor extends React.Component<EndeavorCT, any> {

    static contextType = TbContext;
    context!: React.ContextType<typeof TbContext>;

    buildRenderStories(stories: StoryT[], story_displays: StorySprintMetaT[], is_top: boolean) {

        let _renderStories: JSX.Element[] = [];
        // while ... && sIdx <= this.context.endeavors[sIdx].maxStories
        for ( let sIdx=0 ; sIdx < stories.length  ; sIdx++) {
            // console.log(`Endeavor in_sprint story: ${stories[sIdx].name}`)
            _renderStories.push(
                <Story eidx={this.props.eidx} sidx={sIdx} story_t={stories[sIdx]} story_meta={story_displays[sIdx]}
                       is_top={is_top} key={stories[sIdx].sid}></Story>
            )
        }
        return _renderStories;
    }

    render () {
        // {endeavor_t, grid_area} = this.props.;
        const {_id, name, maxStories, eid, story_list} = this.props.endeavor_t;
        const {eid: eid_meta, story_meta_list: story_display_list} = this.props.endeavor_meta;
        // console.log(`Endeavor: eid:${eid} eid_meta: ${eid_meta}`)

        return (
            // going to need to rotate through the grid areas: e1_area, e2_area, e3_area
            // <div className="endeavor e1_area">
            <div className={"endeavor " + this.props.grid_area}>
                <div className="endeavor_head_bar">
                        <span className="incremetable">
                            <button className="micro-control" onClick={() => this.context.actions.changeEndeavorMax(
                                this.props.eidx,
                                -1)}> - </button>

                            <span className="micro-inline">{maxStories}</span>
                            <button className="micro-control" onClick={() => this.context.actions.changeEndeavorMax(
                                this.props.eidx, 1)}> + </button>
                        </span>
                    {/*<div className="endeavor_max_stories_value">{maxStories}</div>*/}
                    <span className="endeavor_name">{name}</span>
                </div>
                <div className="task_list tasks_list_endeavor_in_sprint">
                    {this.buildRenderStories(story_list, story_display_list, true)}
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
