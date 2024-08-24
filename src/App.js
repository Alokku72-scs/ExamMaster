import React from "react";
import data from "./Data";
// import {useState} from "react";
import Nav from "./components/Nav";
import Contents from "./components/Contents";

function App() {

  //const [dataContainer,setDataContainer] = useState(data);

 
  return (
    <div >
      <Nav />
      <Contents dataContainer={data}/>
    </div>
  );
}

export default App;
