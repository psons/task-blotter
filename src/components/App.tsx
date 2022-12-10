/**
 * Copyright 2022 Paul Sons all rights reserved.
 */

import React, {Context, ContextType} from 'react';
import '../css/t_blotter.css';
import '../css/layout.css';
import StatPanel from "./StatPanel";
import Endeavor from "./Endeavor";

import {TbContext, TbConsumer} from "./context/TbContext";

/**
 * Class component that:
 *  - knows the top level layout in layout.css
 *  - wraps most or the rest of the components in a TbConsumer defined in TbContext
 */
class App extends React.Component<any, any>{
    static contextType = TbContext;

    constructor(props: any) {
        super(props)
    }

    render() {

        let screenLayout = "full_width_3_col"; // grid container
        // Matches css.  Will need to know about media breaks.
        // Maybe later pass as prop from css variable.
        // see: https://christianheilmann.com/2021/02/08/sharing-data-between-css-and-javascript-using-custom-properties/
        let endeavorGridAreaClasses = ["e1_area", "e2_area", "e3_area"]
        let endeavorColumns = endeavorGridAreaClasses.length;

        let renderEndeavors: JSX.Element[] = [];
        let renderCount = 0

        return (
                <div className={"app " + screenLayout}>
                    <div className="screen_title title_area">Plan Sprint</div>
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
                            /** example of renderprops pattern for context usage.
                             * There is an easier way in a class component.  See Story component.
                             * @param context
                             */

                            (context) => {
                                while ((renderCount < endeavorColumns) && (renderCount < context.endeavors.length)){
                                    renderEndeavors.push(<Endeavor
                                        eidx={renderCount}
                                        endeavor_t={context.endeavors[renderCount]}
                                        endeavor_meta={context.endeavor_meta[renderCount]}
                                        grid_area={endeavorGridAreaClasses[renderCount]}
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
