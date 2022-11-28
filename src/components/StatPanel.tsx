import React from "react";
import {StatsT} from "../types/endeavors"
import {TbConsumer} from "./context/TbContext";


// interface StatsPanelCT {
//     stats_t: StatsT;
// }

const StatPanel = () => {
    return (
        <TbConsumer>
            {/*Implemented as a render prop that gets context object as a param*/}
            {/*// de-structure context of type ContextI to get data and actions*/}
            { ({sprint_max_tasks, actions, endeavors}) => {
                return (
                    <div className="statistics_panel util_area">
                        <div className="label_val_pair">
                            <span className="sprint_tasks setting_label">Sprint Max: </span>
                            <button className="counter-action decrement" onClick={() => actions.changeSprintMax(-1)}> - </button>
                            <span className="setting_value">{sprint_max_tasks}</span>
                            <button className="counter-action increment" onClick={() => actions.changeSprintMax(1)}> + </button>
                        </div>
                        <div className="label_val_pair">
                            <span className="sprint_endeavors setting_label">Endeavors: </span>
                            <span className="setting_value">{endeavors.length}</span>
                        </div>
                    </div>
                )
            }

            }
        </TbConsumer>

    )
}

export default StatPanel;