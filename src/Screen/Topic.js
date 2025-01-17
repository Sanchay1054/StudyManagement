import react, { useEffect, useRef, useState } from 'react';
import { useSession } from '../Session/Session';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/Topic.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Topic = () => {

    const {sessionData, updateSession, clearSession} = useSession();
    const [topics,setTopics] = useState([[1,2,3],[1,2,3]]);
    const [loading,setLoading] = useState(true);
    const [topicload,setTopicload] = useState({topicId:'',topic:'topic1',description:''});
    const [topic,setTopic] = useState([]); //study
    const ref = useRef([]);
    const inputref = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {subjectId,name} = location.state;
    const [fetched,setFetched] = useState('Please choose a topic!');

    const logout = () => {
        clearSession();
    }

    const fetchTopics = async () => {
        if(sessionData==null)
        {
            navigate("/subject");
        }
        try
        {
            console.log(sessionData);
        await axios.post("http://localhost:5000/topic",{studentId:sessionData.studentId,subjectId:subjectId}).then((res)=>
        {
            console.log(res.data)
            if(res.data.status=="fetched")
            {
                setTopics(res.data.subject);
                // topic.forEach((m,i)=>(
                //     m.push({...m, toggle:false})
                // ))
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

    const fetchStudy = async () => {
        if(topicload.topicId==='' || topicload.topic=='')
        {
            return;
        }
        await axios.post("http://localhost:5000/study",{studentId:sessionData.studentId,topicId:topicload.topicId}).then((res)=>
        {
            if(res.data.status=="fetched")
            {
                console.log(res.data.subject.length);
                if(res.data.subject.length==0)
                {
                    setFetched("No questions where added")
                    setTopicload({topicId:''})
                    return;
                }
                setTopic(res.data.subject);
            }
            else
            {
                console.log("error");
            }
        }).catch((err)=>
        {
            console.log(err);
        })
        // setFetched(true);
    }

    const fetchAnswer = async (question,answer,ans,i) => {
        console.log(ans);
        ref.current[i].innerHTML = "Loading";
        await axios.post("http://localhost:5000/answer",{question:question,answer:answer,ans:ans}).then((res)=>
        {
            console.log(res.data)
            if(res.data.status=="fetched")
            {
                console.log(res.data);
                ref.current[i].innerHTML = res.data.answer;
            }
            else{
                console.log("error");
            }
        }).catch((err)=>
        {
            console.log(err);
        })
    }

    const renderStudy = () => {
        if(topic.length==0)
        {
            return;
        }
        return(
            <div className={styles.questionanswer}>
                <div className={styles.studyheader}>Id:{topicload.topicId} {topicload.topic} </div>
                <div>{topicload.description} </div>
                {topic.map((m,i)=>(
                    <div key={i} className={styles.studycontent }>
                        <div className={styles.questionheader}>Question {i+1}</div>
                        <div className={styles.question}>{m[2]}</div>
                        <div className={styles.answer}>{m[3]}</div>
                        <div className={styles.questionheader}>Type the answer</div>
                        <textarea rows={5} ref={el => inputref.current[i] = el}/>
                        <div className={styles.botanswer} ref={el => ref.current[i] = el}></div>
                        <button onClick={()=>{fetchAnswer(m[2],m[3],inputref.current[i].value,i)}}>check</button>
                    </div>
                ))}
            </div>
        )
    }

    const addStudy = () => {
        console.log(sessionData.topicId)
        if(sessionData.topicId==undefined)
        {
            return;
        }
        navigate("/addstudy")
    }

    const renderTopics = () => {
        if(topics.length==0)
        {
            return(
                <div>No Topics yet</div>
            )
        }
        return(
            <div>
                <form className={styles.subjectform}>
                    <div className={styles.addsubjectheader}>ADD A NEW TOPIC</div>
                    <p>Topic Name
                    <input type="text"/>
                    </p>
                    <p>Description
                    <textarea rows="5" placeholder='Type the desciption here...'/>
                    </p>
                    <button type="button" className={styles.button}>add</button>
                </form>
                <button type="button" className={styles.button} onClick={()=>{console.log(sessionData);addStudy()}}>Add Questions</button>
                <p className={styles.topicheader}>Your Topics</p>
                {topics.map((m,i)=>(
                    <div key={i} className={styles.topiccontent}>
                        <div onClick={()=>{setTopicload({topicId:m[0],topic:m[2],description:m[3]}); updateSession({...sessionData,topicId:m[0]}); fetchStudy()}}>{m[2]}</div>
                        {/* <div>{m[3]}</div> */}
                    </div>
                ))}
            </div>
        )
    }

    useEffect(()=>{
        if(sessionData==null || !sessionData.subjectId || sessionData.subjectId==null)
        {   
            navigate("/subject");
        }
        if(loading)
        {
            //fetchStudy();
            fetchTopics();
            setLoading(false);
        }
        // else if(fetched)
        // {
        //     fetchTopics();
        //     setFetched(true);
        // }
        // if(subjectId===undefined || name===undefined)
        // {
        //     navigate("/subject");
        // }
    })
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                Topic
                <div className={styles.row}>
                <div className={styles.logout} onClick={()=>{logout()}}>logout </div>
                <Link to="/contactus" className={styles.link}> Contact Us</Link>
                </div>
            </div>
            <div className={styles.content}>
            <div className={styles.topic}>
                <div className={styles.topicheader}>Topics
                </div>
                {renderTopics()}
            </div>
            {topicload.topicId==='' ? <div>{fetched}</div> : renderStudy()}
            {/* <div ref={rtopief[0]}></div> */}
            {/* <div ref={el => ref.current[0] = el} onClick={()=>{console.log(ref.current[0].innerHTML)}}>hello</div> */}
            </div>
        </div>
    )
}

export default Topic;