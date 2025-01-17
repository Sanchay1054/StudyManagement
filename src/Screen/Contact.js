import react from 'react';
import styles from '../Styles/ContactUs.module.css';


const ContactUs = () => {
    return(
        <div className={styles.container}>
            <div className={styles.head}>Contact Us</div>
            <div className={styles.contact}>
            <div className={styles.head}>Study Management Application</div>
            <div className={styles.row}>
            <div className={styles.head}>Ph no.</div> 9987665432
            </div>
            <div className={styles.row}>
            <div className={styles.head}>Email</div> <a href='mailto:studymanagement@gmail.com'>studymanagement@gmail.com</a>
            </div>
            <div className={styles.head}>Enquiry</div>
            <form onSubmit={()=>{alert("You have filled the query")}}>
                    <div>
                        Name<br/><input type="text" name="name" required/>
                    </div>
                    <div>
                        Phone number<br/><input type="text" name="phonenumber" required/>
                    </div>
                    <div>
                        Mail ID<br/><input type="text" name="mailid" required/>
                    </div>
                    <div>
                        Query<br/><textarea name="query" rows={5} required></textarea>
                    </div>
                    <button type="submit" className={styles.button} >Submit</button>
            </form>
            </div>
        </div>
    )
}

export default ContactUs;