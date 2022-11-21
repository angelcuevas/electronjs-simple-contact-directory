import React from 'react'
import Home from './components/Home';
import {
    BrowserRouter,
    Routes, Route
} from "react-router-dom";
import AddForm from './components/AddForm';


const ContactDirectory = () => {

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="add" element={<AddForm />} />
                    <Route path="edit" element={<AddForm />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default ContactDirectory