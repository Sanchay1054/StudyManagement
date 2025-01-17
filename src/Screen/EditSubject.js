import react,{ useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/Edit.module.css';
import { useSession } from '../Session/Session';
import axios from 'axios';

const EditSubject  = () => {

    const location = useLocation();
    const {id,subject,description,study} = location.state;
    const [subjects,setSubjects] = useState([]);
    const [loading,setLoading] = useState(true);
    const {sessionData, updateSession, clearSession} = useSession();
    const ref = useRef([]);
    const [updateloading,setUpdateloading] = useState(true);

    const navigate = useNavigate();

    console.log(id,subject,description,study);

    const logout = () => {
        clearSession();
        console.log(sessionData);
    }

    const fetchSubjects = async () => {
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
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
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
                    <button type="button" className={styles.button}>add</button>
                </form>
                <div className={styles.subjectlist}>
                    {subjects.length==0 ? <div>Fetching...</div>: subjects.map((m,i)=>(
                        <div className={styles.subjectlistcontent} key={i}>{m[1]}
                        <button type="button" className={styles.subjectlistedit} onClick={()=>{navigate("/editsubject",{state:{id:m[0],subject:m[1],description:m[2],study:m[3]}})}}>edit</button></div>
                    ))}
                </div>
            </div>
        )
    }
    
    useEffect(()=>
        {
            if(loading)
            {
                fetchSubjects();
                setLoading(false);
            }
            if(id===undefined || subject===undefined || description===undefined || study===undefined)
            {
                navigate("/subject");
            }
            try
            {
                if(updateloading)
                {
                    ref[0].current.value = subject;
                    ref[1].current.value = description;
                    ref[2].current.value = study;
                    setUpdateloading(false);
                }
            }
            catch(err)
            {
                console.log(err);
            }
    })

    
    return(
        <div >
            <div className={styles.header}><div>Subject
                </div>
                <div className={styles.headercontent}>
                <div className={styles.function}>
                Studying status </div> <select className={styles.study_status} onClick={(e)=>{updateSession({...sessionData, current_study:e.target.value}); fetchSubjects()}}><option>I</option><option>II</option><option>III</option><option>IV</option><option>V</option><option>VI</option><option>VII</option><option>VIII</option><option>IX</option><option>X</option><option>XI</option><option>XII</option><option>I year</option><option>II year</option><option>III year</option><option>IV year</option><option>General</option></select>
                    <button className={styles.logout} onClick={logout}>log out</button>
                </div>
            </div>
                {loading ? <p>Loading...</p> :<div className={styles.container}>
                    <div>{addSubject()}</div>
                    <div className={styles.updatecontent}>
            <div className={styles.content}>
                <div className={styles.contentheader}>Update Subject</div>
                <div  className={styles.formcontent}>
                    Subject
                    <input ref={el => ref.current[0] = el} defaultValue={subject} className={styles.input}type="text" />
                </div>
                <div className={styles.formcontent}>
                    Description
                    <textarea defaultValue={description} ref={el => ref.current[1] = el} rows={5}/>
                </div>
                <div className={styles.formcontent}>
                    Subject Study
                    <select ref={el => ref.current[2] = el} defaultValue={study}><option>I</option><option>II</option><option>III</option><option>IV</option><option>V</option><option>VI</option><option>VII</option><option>VIII</option><option>IX</option><option>X</option><option>XI</option><option>XII</option><option>I year</option><option>II year</option><option>III year</option><option>IV year</option><option>General</option></select>
                </div>
                <div className={styles.button}>update</div>
            </div>
            </div>
            </div>}
        </div>
    )
}

export default EditSubject;