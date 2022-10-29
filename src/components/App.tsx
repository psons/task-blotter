import React from 'react';
import '../css/t_blotter.css';
import '../css/layout.css';
import {endeavors} from "../testdata/test-endeavors";
import StatPanel from "./StatPanel";
import Endeavor from "./Endeavor";
import {StatsT} from "../types/endeavors";
// Comment

function App() {
    console.log("Top Level Task Blotter App:src/components/App.tsx.")
    var screenLayout = "full_width_3_col"; // grid container
    let endeavorGridAreas = ["e1_area", "e2_area", "e3_area"]
    let renderEndeavors = [];
    let renderCount = 0
    let endeavorColumns = 3;
    while ((renderCount < endeavorColumns) && (renderCount < endeavors.length)){
        renderEndeavors.push(<Endeavor
            endeavor_t={endeavors[renderCount]}
            grid_area={endeavorGridAreas[renderCount]}
            key={endeavors[renderCount].eid}
        />);
        renderCount++;
    }
    let ec = endeavors.length;

    // todo this will become application state, and tasks becomes user modifiable
    let stats_t: StatsT = {task_count: 6, endeavor_count: ec}
    return (
    <div className={"app " + screenLayout}>
        <div className="screen_title title_area">Plan Sprint</div>
        <StatPanel stats_t={stats_t}  />
        <div className="b3_area">
            <div className="menu_choice">Goals</div>
        </div>
        <div className="b2_area">
            <div className="menu_choice">Plan</div>
        </div>
        <div className="b1_area">
            <div className="menu_choice">Todo</div>
        </div>

        { renderEndeavors }
    </div>
  );
}

export default App;
