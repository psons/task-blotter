import React, { Component } from 'react';
import {endeavors} from "../../testdata/test-endeavors";
import {user_domain} from "../../testdata/test-user-domain";


interface ProviderStateI  {
    sprint_max_tasks: number;
    sprint_tasks_added: number;
}

export interface ContextI extends ProviderStateI {
    actions: {
        changeSprintMax: (delta:number) => void
        // incrementSprintTasksAdded: () => void;
    }

}


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

    // state =  {
    //         sprint_max_tasks: 6,
    //         sprint_tasks_added: 0
    //     }


    handleChangeSprintMaxTasks = (delta: number) => {
        console.log("Got a click to change SprintMaxTask", delta);
        this.setState(
            prevState  => (
                {sprint_max_tasks: prevState.sprint_max_tasks + delta}
            )
        )
    }



    render () {
        return (
            <TbContext.Provider value={{
                sprint_max_tasks: this.state.sprint_max_tasks,
                sprint_tasks_added: this.state.sprint_tasks_added,
                actions: {
                    changeSprintMax: this.handleChangeSprintMaxTasks
                    // incrementSprintTasksAdded: this.handleIncrementSprintTasks
                }
        }}>
                {this.props.children}
            </TbContext.Provider>
        );
    }

}


// interface ProviderPropsI {}
const defaultContext: ContextI =   {
    sprint_max_tasks: 2,
    sprint_tasks_added: 0,
    actions: {
        changeSprintMax: (delta: number) => {
            console.log(
                "actions.changeSprintMax  is using a default, not an implementation in TbContext:" +
                `${delta}`)}
    }
}

export const TbContext = React.createContext<ContextI>(defaultContext);

export const TbConsumer = TbContext.Consumer;

