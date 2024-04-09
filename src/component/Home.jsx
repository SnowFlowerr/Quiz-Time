import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [sub,setSub]=useState("")
    const [detail,setDetail]=useState({name:"",date:"",email:""})

    const navigate=useNavigate();
    useEffect(()=>{
        window.history.pushState({}, undefined, "/");
    })
    function handleChange(e){
        e.preventDefault();
        setSub(e.target.value)
    }
    function handleClick(e){
        e.preventDefault();
        if(sub==="" || detail.name || detail.date || detail.email){
            alert("The Details First")
        }
        else{
            if(localStorage.getItem('name')!==detail.name){
                localStorage.setItem("total",0);
            }
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
        
                <div className={styles.marks}>
                <div className={styles.names}>{localStorage.getItem("name")===null?"Your Name":<span style={{ fontSize: '2.2vw',color:"aqua"}}>{localStorage.getItem("name")}</span>}</div>
                <div className={styles.quiznames}>Quiz Time</div>
                <div className={styles.quizscore}>Total : <span style={{ fontSize: '3vw',color:"aqua"}}>{localStorage.getItem("total")===null?"0":localStorage.getItem("total")}</span></div>
            </div>
            <form action="" className={styles.form}>
                {/* <div className={styles.quiz}>Quiz Time</div> */}
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
