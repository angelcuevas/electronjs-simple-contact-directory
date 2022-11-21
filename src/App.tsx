import React, {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactDirectory from './features/contactDirectory/ContactDirectory';

function App() {
  return <div className="App"><ContactDirectory /></div>
}

export default App;
