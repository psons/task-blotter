import React, { Component } from 'react';
import {endeavors} from "../../testdata/test-endeavors";
import {user_domain} from "../../testdata/test-user-domain";


interface ProviderStateI  {
    sprint_max_tasks: number;
    sprint_tasks_added: number;
}

export interface ContextI extends ProviderStateI {
    actions: {
        placeholder: number
        // incrementSprintTasksAdded: () => void;
    }

}

// interface ProviderPropsI {}
const defaultContext: ContextI =   {
    sprint_max_tasks: 2,
    sprint_tasks_added: 0,
    actions: {
        placeholder: 0
    }

}


export const TbContext = React.createContext<ContextI>(defaultContext);

//export const TbProvider = TbContext.Provider;

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example
export class TbProvider extends Component<any, ProviderStateI>{

    constructor(props: any) {
        super(props);
        this.state =  {
            sprint_max_tasks: 6,
            sprint_tasks_added: 0
        }
    }


    // I think the return type is void.  has side effect of updating state.
    handleIncrementSprintTasks = () => {
        this.setState( prevState => {
            return ({
                sprint_max_tasks: 6,
                sprint_tasks_added: prevState.sprint_tasks_added + 1
            });
        });
    }

    render () {
        return (
            <TbContext.Provider value={{
                sprint_max_tasks: this.state.sprint_max_tasks,
                sprint_tasks_added: this.state.sprint_tasks_added,
                actions: {
                    placeholder: 0
                    // incrementSprintTasksAdded: this.handleIncrementSprintTasks
                }
        }}>
                {this.props.children}
            </TbContext.Provider>
        );
    }

}

export const TbConsumer = TbContext.Consumer;

