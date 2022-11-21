import React, {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [names, setNames] = useState<string[]>(["asdasdasd", "asdasdsa"])
  useEffect(()=>{
    if(window.api){
      window.api.getNames().then((rows:any[])=>{
        setNames(rows.map(r=>r.name))
      })
      
    }
    console.log("STUFF",window.api)
  },[])

  return (
    <div className="App">
        <h3>Names</h3>
        {
          names.map((name,i)=>{
            return <p key={i}>{name}</p>
          })
        }
    </div>
  );
}

export default App;
