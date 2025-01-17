import react from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSession } from '../Session/Session';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/Topic.module.css';
import axios from 'axios';

const AddStudy = () => {
    const {sessionData, updateSession, clearSession} = useSession();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionData || !sessionData.topicId || sessionData.topicId==undefined|| sessionData.topicId=='' || sessionData.studentId==undefined)
        {
            navigate("/topic");
        }
    })
    return(
        <div>Add subject</div>
    )
}

export default AddStudy;