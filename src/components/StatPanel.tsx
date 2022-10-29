import React from "react";
import {StatsT} from "../types/endeavors"
interface StatsPanelCT {
    stats_t: StatsT;
}

const StatPanel = ({stats_t}: StatsPanelCT) => {
    const {task_count, endeavor_count} = stats_t;
    return (
        <div className="statistics_panel util_area">
            <div className="label_val_pair">
                <span className="sprint_tasks setting_label">Plan Tasks: </span>
                <span className="setting_value">{task_count}</span>
            </div>
            <div className="label_val_pair">
                <span className="sprint_endeavors setting_label">Endeavors: </span>
                <span className="setting_value">{endeavor_count}</span>
            </div>
        </div>

    )
}

export default StatPanel;