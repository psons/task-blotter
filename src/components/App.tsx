import React, {Context, ContextType} from 'react';
import '../css/t_blotter.css';
import '../css/layout.css';
import StatPanel from "./StatPanel";
import Endeavor from "./Endeavor";

import {TbContext, TbConsumer} from "./context/TbContext";

class App extends React.Component<any, any>{
    static contextType = TbContext;

    constructor(props: any) {
        super(props)
        console.log("Top Level Task Blotter class constructor App:src/components/App.tsx.")
    }

    render() {
        let screenLayout = "full_width_3_col"; // grid container
        let endeavorGridAreas = ["e1_area", "e2_area", "e3_area"]
                // Matches css.
                // Maybe pass as prop from css variable.
        let endeavorColumns = endeavorGridAreas.length;
        let renderEndeavors: JSX.Element[] = [];
        let renderCount = 0

        // todo this will become application state, and tasks becomes user modifiable
        // let stats_t: StatsT = {task_count: user_domain.sprint_max_tasks, endeavor_count: ec}
        return (
                <div className={"app " + screenLayout}>
                    <div className="screen_title title_area">Plan Sprint</div>
                    {/*<StatPanel stats_t={stats_t}  />*/}
                    <StatPanel />
                    <div className="b3_area">
                        <div className="menu_choice">Goals</div>
                    </div>
                    <div className="b2_area">
                        <div className="menu_choice">Plan</div>
                    </div>
                    <div className="b1_area">
                        <div className="menu_choice">Todo</div>
                    </div>
                    <TbConsumer>
                        {
                            (context) => {
                                while ((renderCount < endeavorColumns) && (renderCount < context.endeavors.length)){
                                    renderEndeavors.push(<Endeavor
                                        eidx={renderCount}
                                        endeavor_t={context.endeavors[renderCount]}
                                        endeavor_meta={context.endeavor_meta[renderCount]}
                                        grid_area={endeavorGridAreas[renderCount]}
                                        key={context.endeavors[renderCount].eid}
                                    />);
                                    renderCount++;
                                }

                                return (
                                 <React.Fragment>
                                     { renderEndeavors }
                                 </React.Fragment>
                                )
                            }
                        }
                    </TbConsumer>
                </div>
        );

    }

}


export default App;
