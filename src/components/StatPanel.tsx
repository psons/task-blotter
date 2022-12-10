/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React from "react";
import {TbConsumer} from "./context/TbContext";

/**
 * Allows the user to chang the number of tasks to pull into the sprint.
 * @constructor
 */
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
                            <button className="micro-control" onClick={() => actions.changeSprintMax(-1)}> - </button>
                            <span className="micro-inline">{sprint_max_tasks}</span>
                            <button className="micro-control" onClick={() => actions.changeSprintMax(1)}> + </button>
                        </div>
                        <div className="label_val_pair">
                            <span className="sprint_endeavors setting_label">Endeavors: </span>
                            <span className="micro-inline">{endeavors.length}</span>
                        </div>
                    </div>
                )
            }

            }
        </TbConsumer>

    )
}

export default StatPanel;