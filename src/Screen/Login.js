import react, {useState, useContext} from 'react';
import styles from '../Styles/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import login from '../Components/Login/image.png';
import { useSession } from '../Session/Session';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {sessionData, updateSession} = useSession(); 
    const navigate = useNavigate();  

    const Submit = (e) =>{
        if(email=='' || password=='')
        {
            //e.preventDefault();
            return;
        }
        updateSession({
            email:email,
            studentId:'1',
            current_study:'I year',
            name:'Student1' 
        });
        console.log(sessionData);
        e.preventDefault();
        navigate("/subject");
    }
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    LOGIN
                </div>
                <img src={login}/>
                <form>
                <div className={styles.contenttext}>Email
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                </div>
                <div className={styles.contenttext}>Password
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                </div>
                <Link to="/register" className={styles.register}>Register here</Link>
                <Link to="/contactus" className={styles.register}>Contact Us</Link>
                <button type="submit" className={styles.button} onClick={Submit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;