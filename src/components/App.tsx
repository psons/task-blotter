import React from 'react';
import '../css/t_blotter.css';
import {endeavors} from "../testdata/test-endeavors";
import Story from "./Story";

// Comment

const testStory = endeavors[0].story_list[0]; //.story_list[1]

function App() {
    console.log(`testStory name is: ${testStory.name}`);
  return (
    <div className="app full_width_3_col">
      <header className="App-header">
        {/*see logo import above*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          This is the Top Level Task Blotter App in <code>src/App.tsx</code>.
        </p>
        <Story name={testStory.name} maxTasks={testStory.maxTasks} sid={testStory.sid} taskList={testStory.taskList} ></Story>
      </header>
    </div>
  );
}

export default App;
