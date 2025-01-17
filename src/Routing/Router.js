import react from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import Subject from '../Screen/Subject';
import Topic from '../Screen/Topic';
import EditSubject from '../Screen/EditSubject';
import AddStudy from '../Screen/AddStudy';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/subject" element={<Subject/>}/>
                <Route path="/topic" element={<Topic/>}/>
                <Route path="/editsubject" element={<EditSubject/>}/>
                <Route path="/addstudy" element={<AddStudy/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;