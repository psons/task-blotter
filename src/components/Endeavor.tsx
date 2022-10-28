import React from "react";
import {EndeavorT, StoryT} from "../types/endeavors";
import Story from "./Story"

const Endeavor = ({_id, name, maxStories, eid, story_list}: EndeavorT) => {
    return (
        <div className="endeavor e1_area">
            <div className="endeavor_head_bar">
                <div className="endeavor_max_tasks_value">2</div>
                <p className="endeavor_name">{name}</p>
                <p className="endeavor_tasks_label">Endeavor Tasks</p>
            </div>
            <div className="task_list tasks_list_endeavor_in_sprint">
                {story_list.map(story => {
                    {console.log(`Endeavor rendering story: ${story.name}`)}
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
