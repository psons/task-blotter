import React from "react";
import {EndeavorT} from "../types/endeavors";
import Story from "./Story"

interface EndeavorCT {
    endeavor_t: EndeavorT;
    grid_area: string;
}

class Endeavor extends React.Component<EndeavorCT, any> {

    render () {
        // {endeavor_t, grid_area} = this.props.;
        const {_id, name, maxStories, eid, story_list} = this.props.endeavor_t;
        return (
            // going to need to rotate through the grid areas: e1_area, e2_area, e3_area
            // <div className="endeavor e1_area">
            <div className={"endeavor " + this.props.grid_area}>
                <div className="endeavor_head_bar">
                    <div className="endeavor_max_tasks_value">{maxStories}</div>
                    <p className="endeavor_name">{name}</p>
                    <p className="endeavor_tasks_label">Endeavor Tasks</p>
                </div>
                <div className="task_list tasks_list_endeavor_in_sprint">
                    {story_list.map(story => {
                            console.log(`Endeavor in_sprint story: ${story.name}`)
                            return (
                                <Story story_t={story} is_top={true} key={story.sid}></Story>
                            )
                        }
                    )}
                </div>
                <div className="task_list tasks_list_endeavor_out_of_sprint">
                    {story_list.map(story => {
                            console.log(`Endeavor out_of_sprint story: ${story.name}`)
                            return (
                                <Story story_t={story} is_top={false} key={story.sid}></Story>
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

}

// const Endeavor = ({endeavor_t, grid_area}: EndeavorCT) => {
//     const {_id, name, maxStories, eid, story_list} = endeavor_t;
//     return (
//         // going to need to rotate through the grid areas: e1_area, e2_area, e3_area
//         // <div className="endeavor e1_area">
//         <div className={"endeavor " + grid_area}>
//             <div className="endeavor_head_bar">
//                 <div className="endeavor_max_tasks_value">{maxStories}</div>
//                 <p className="endeavor_name">{name}</p>
//                 <p className="endeavor_tasks_label">Endeavor Tasks</p>
//             </div>
//             <div className="task_list tasks_list_endeavor_in_sprint">
//                 {story_list.map(story => {
//                     console.log(`Endeavor in_sprint story: ${story.name}`)
//                     return (
//                         <Story story_t={story} is_top={true} key={story.sid}></Story>
//                     )
//                 }
//                 )}
//             </div>
//             <div className="task_list tasks_list_endeavor_out_of_sprint">
//                 {story_list.map(story => {
//                         console.log(`Endeavor out_of_sprint story: ${story.name}`)
//                         return (
//                             <Story story_t={story} is_top={false} key={story.sid}></Story>
//                         )
//                     }
//                 )}
//             </div>
//             <div className="endeavor_footer">
//                 <div className="show_endeavor_editor">Edit Endeavor</div>
//             </div>
//         </div>
//     );
// }

export default Endeavor;
