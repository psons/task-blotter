import React from 'react';
import '../css/t_blotter.css';
import {endeavors} from "../testdata/test-endeavors";
import Story from "./Story";
import Endeavor from "./Endeavor";
// Comment

const testEndeavor = endeavors[0]
const testStory = endeavors[0].story_list[0]; //.story_list[1]

function App() {
    console.log(`testStory name is: ${testStory.name}`);
  return (
    <div className="app full_width_3_col">
      <header className="App-header">
          This is the Top Level Task Blotter App in
            <code> src/components/App.tsx</code>.
      </header>
    <Endeavor _id={testEndeavor._id}
              name={testEndeavor.name}
              maxStories={testEndeavor.maxStories}
              eid={testEndeavor.eid}
              story_list={testEndeavor.story_list}/>
    </div>
  );
}

export default App;
