import react from 'react';
import styles from '../Styles/Register.module.css';
import register from '../Components/Register/image.png';

const Register  = () => {
    return(
        <div className={styles.container}>
            <div className={styles.contentimage}>
            <div>
                <div className={styles.header}>REGISTER</div>
                <img src={register} className={styles.img}/>
            </div>
            <from  className={styles.content}>
            <div className={styles.header1}>REGISTER</div>
                <div className={styles.head}>Personal Details</div>
                <div className={styles.contenttext}>
                    Name<input type="text"/>
                </div>
                <div className={styles.contenttext}>
                    Email<input type="email"/>
                </div>
                <div className={styles.contenttext}>
                    Password<input type="password"/>
                </div>
                <div className={styles.contenttext}>
                    Confirm password<input type="password"/>
                </div>
                <div className={styles.head}>Academic Details</div>
                <div className={styles.contenttext}>
                    current Studying Status
                    <select><option>I</option><option>II</option><option>III</option><option>IV</option><option>V</option><option>VI</option><option>VII</option><option>VIII</option><option>IX</option><option>X</option><option>XI</option><option>XII</option><option>I year</option><option>II year</option><option>III year</option><option>IV year</option><option>General</option></select>
                </div>
                <button type="submit" className={styles.button}>register</button>
            </from>
            </div>
        </div>
    )
}

export default Register;