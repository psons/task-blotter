import React from "react";
import {EndeavorT} from "../types/endeavors";
import Story from "./Story"

interface EndeavorCT {
    endeavor_t: EndeavorT;
    grid_area: string;
}

// const Endeavor = ({_id, name, maxStories, eid, story_list}: EndeavorT) => {
const Endeavor = ({endeavor_t, grid_area}: EndeavorCT) => {
    const {_id, name, maxStories, eid, story_list} = endeavor_t;
    return (
        // going to need to rotate through the grid areas: e1_area, e2_area, e3_area
        // <div className="endeavor e1_area">
        <div className={"endeavor " + grid_area}>
            <div className="endeavor_head_bar">
                <div className="endeavor_max_tasks_value">{maxStories}</div>
                <p className="endeavor_name">{name}</p>
                <p className="endeavor_tasks_label">Endeavor Tasks</p>
            </div>
            <div className="task_list tasks_list_endeavor_in_sprint">
                {story_list.map(story => {
                    console.log(`Endeavor rendering story: ${story.name}`)
                    return (
                        <Story story_t={story} key={story.sid}></Story>
                    )
                }
                )}
            </div>
            <div className="endeavor_footer">
                <div className="show_endeavor_editor">Edit Endeavor</div>
            </div>
        </div>
    );
}

export default Endeavor;
