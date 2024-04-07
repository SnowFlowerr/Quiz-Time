import React, { useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [sub,setSub]=useState("")
    const [detail,setDetail]=useState({name:"",date:"",email:""})

    const navigate=useNavigate();
    function handleChange(e){
        e.preventDefault();
        setSub(e.target.value)
    }
    function handleClick(e){
        if(sub===""){
            alert("Choose the Subject")
        }
        else{
            e.preventDefault();
            localStorage.setItem("sub",sub);
            localStorage.setItem("name",detail.name);
            localStorage.setItem("date",detail.date);
            localStorage.setItem("email",detail.email);
            navigate("/quiz")
        }
    }
    function handleDetail(e){
        e.preventDefault();
        setDetail({...detail,[e.target.id]:e.target.value})
    }
    return (
        <div className={styles.box}>
            <form action="" className={styles.form}>
                <div className={styles.quiz}>Quiz Time</div>
                <div><input type="text" onChange={handleDetail} id="name" placeholder='Enter Your Name' className={styles.input} required/></div>
                <div><input type="date" id='date' onChange={handleDetail} className={styles.inputdate} required/></div>
                <div><input type="email" id='email' onChange={handleDetail} placeholder='Enter Your Email' className={styles.inputdate} required/></div>
                <div>
                <select name="" id="subject" className={styles.option} required onChange={handleChange}>
                    <option value="">Choose the Subject</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                </select>
                </div>
                <div>
                <button className={styles.subbtn} onClick={handleClick}>Start The Quiz</button></div>
            </form>
        </div>
    )
}
