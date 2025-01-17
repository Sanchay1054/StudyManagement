import react, { useEffect, useRef, useState } from 'react';
import { useSession } from '../Session/Session';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Subject.module.css';
import axios from 'axios';

const Subject = () => {

    const {sessionData, updateSession, clearSession} = useSession();
    const [subjects,setSubjects] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const studyref = useRef();
    const [addsubjectname,setAddsubjectname] = useState('');

    const color = ['#FF0','#0F0','#A00'];

    const logout = () => {
        clearSession();
        console.log(sessionData);
    }

    const fetchSubjects = async () => {
        const subjectsarray = [[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],[1,'Agile','It deals with the principles of managing software engineering...'],]
        try
        {
        await axios.post("http://localhost:5000/subject",{studentId:sessionData.studentId,current_study:sessionData.current_study}).then((res)=>
        {
            if(res.data.status=="fetched")
            {
                setSubjects(res.data.subject);
                console.log(res.data);
            }
            else
            {
                console.log("error");
                setError("not Valid")
            }
        })
    }
    catch(err)
    {
        console.log(err);
        setError("Check your connection")
    }
    }

    const fetchTopic = (subjectId,name) => {
        updateSession({
            ...sessionData,
            subjectId:subjectId
        })
        navigate("/topic",{state:{subjectId,subjectname:name}});
    }

    const renderSubjects = () => {
        if(subjects.length==0)
        {
            return(
                <div>{error=='' ? <p>Not Fetched</p> : error}</div>
            )
        }
        return(
            <div className={styles.content}>
                {subjects.map((m,i)=>(<div key={i} className={styles.subject} style={{}}>
                    {/* <div style={{borderRadius:'20px 20px 0px 0px',backgroundColor: color[i%3], height: '5vh'}}>
                    </div> */}
                    <div className={styles.subjectcontent}>
                        <div style={{borderRadius:'10px',backgroundColor: color[i%3], padding:'10px'}} className={styles.subjectheader} onClick={()=>{fetchTopic(m[0],m[1])}}>{m[1]}</div>
                        <div className={styles.subjectdescription}>{m[2]}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        )
    }

    const fetchAddSubject = async (subject) => {
        await axios.post("http://localhost:5000/addsubject",{studentId:sessionData.studentId,subject:subject,study:sessionData.current_study}).then((res)=>
        {
            console.log(res.data);
        }).catch((err)=>
        {
            console.log(err.message);
        })
    }

    const addSubject = () => {
        return(
            <div className={styles.addsubject}>
                <form className={styles.subjectform}>
                    <div className={styles.addsubjectheader}>ADD SUBJECT</div>
                    <p>Subject Name
                    <input type="text"/>
                    </p>
                    <p>Description
                    <textarea rows="5" placeholder='Type the desciption here...'/>
                    </p>
                    <button type="button" className={styles.button} onClick={()=>{fetchAddSubject("hi")}}>add</button>
                </form>
                <div className={styles.subjectlist}>
                    {subjects.length==0 ? <div>{error=='' ? <p>Fetching...</p> : error}</div>: subjects.map((m,i)=>(
                        <div className={styles.subjectlistcontent} key={i}>{m[1]}
                        <button type="button" className={styles.subjectlistedit} onClick={()=>{navigate("/editsubject",{state:{id:m[0],subject:m[1],description:m[2],study:m[3]}})}}>edit</button></div>
                    ))}
                </div>
            </div>
        )
    }

    useEffect(()=>{
        if(sessionData==null)
        {
            navigate("/login");
        }
        else if(loading)
        {
            fetchSubjects();
            if(sessionData.study_status)
            {
                studyref.current.value = sessionData.current_study
            }
            setLoading(false);
        }
    })

    return(
        <div>
            <div className={styles.header}><div>Subject
                </div>
                <div className={styles.headercontent}>
                <div className={styles.function}>
                Studying status </div> <select ref={studyref} className={styles.study_status} onChange={(e)=>{updateSession({...sessionData, current_study:e.target.value}); setLoading(true)}}><option>I</option><option>II</option><option>III</option><option>IV</option><option>V</option><option>VI</option><option>VII</option><option>VIII</option><option>IX</option><option>X</option><option>XI</option><option>XII</option><option>I year</option><option>II year</option><option>III year</option><option>IV year</option><option>General</option></select>
                    <button className={styles.logout} onClick={logout}>log out</button>
                </div>
            </div>
                {loading ? <p>Loading...</p> : <div className={styles.bodycontainer}>{addSubject()}{renderSubjects()}</div>}
        </div>
    )
}

export default Subject;