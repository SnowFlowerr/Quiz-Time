import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.css'
import chemistry from './data/chemistry'
import physics from './data/physics'
import maths from './data/maths'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
    const [ind, setInd] = useState(0);
    const navigate=useNavigate();
    let detail={name:localStorage.getItem("name"),date:localStorage.getItem("date"),email:localStorage.getItem("email")};
    const [subject, setsubject] = useState({
        "category": "",
        "questions": [
            {
                "question": "",
                "options": [""],
                "correct_answer": ""
            },]});
    const [marks, setMarks] = useState(0);
    const [correct, setCorrect] = useState("");
    const [answer, setAnswer] = useState("");
    useEffect(() => {
        let sub=localStorage.getItem("sub");
        if (sub === "Maths") {
            setsubject(maths)
        }
        else if (sub === "Physics") {
            setsubject(physics)
        }
        else if (sub === "Chemistry") {
            setsubject(chemistry)
        }
    }, [])
    useEffect(()=>{
                setCorrect(subject.questions[ind].correct_answer)
    })

    function handleNext(e) {
        e.preventDefault();
            for(let i=1;i<=4;i++){
                if(document.getElementById(`${i}`).innerText===answer){
                    document.getElementById(`${i}`).style.backgroundColor="red"
                }
                if(document.getElementById(`${i}`).innerText===correct){
                    document.getElementById(`${i}`).style.backgroundColor="lightgreen"
                }
            // }
            if(answer===correct){
                setMarks(marks+10)
            }
            else if(answer!=="" && answer!==correct){
                setMarks(marks-5)
            }
        }
        setTimeout(() => {
            if (ind < 9) {
                setInd(ind + 1);
            }
            setAnswer("")
            white();
            if(ind===9){
                handlesubmit();
            }
            if(answer===""){
                alert("You Will Not Get Any Positive Or Negative Marks for Not Choosing The Solution")
            }
        }, 2000)
    }
    function handleAnswer(e) {
        e.preventDefault();
        if (answer === document.getElementById(e.target.id).innerText) {
            document.getElementById(e.target.id).style.backgroundColor = "white"
            setAnswer("")
        }
        else {
            white();
            document.getElementById(e.target.id).style.backgroundColor = "green"
            setAnswer(document.getElementById(e.target.id).innerText)
        }

    }
    function white() {
        document.getElementById("1").style.backgroundColor = "white"
        document.getElementById("2").style.backgroundColor = "white"
        document.getElementById("3").style.backgroundColor = "white"
        document.getElementById("4").style.backgroundColor = "white"
    }
    function handlesubmit(){
        document.getElementById('result').style.visibility='visible'
    }
    function handleMenu(e){
        e.preventDefault();
        navigate("/");
    }
    return (
        <div className={styles.box}>
            <div className={styles.marks}>
                <div>{ind + 1}.</div>
                <div>Quiz Time</div>
                <div>{marks}</div>
            </div>
            <div className={styles.quizbox}>
                <input type="range" className={styles.range} value={ind + 1} max={10} />
                <div className={styles.questions}>
                    <div className={styles.question}>{subject.questions[ind].question}</div>
                </div>
                <div className={styles.options}>
                    <div className={styles.row}>
                        <div onClick={handleAnswer} id="1">{subject.questions[ind].options[0]}</div>
                        <div onClick={handleAnswer} id="2">{subject.questions[ind].options[1]}</div>
                    </div>
                    <div className={styles.row}>
                        <div onClick={handleAnswer} id="3">{subject.questions[ind].options[2]}</div>
                        <div onClick={handleAnswer} id="4">{subject.questions[ind].options[3]}</div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handlesubmit}>Submit</button>
                </div>
                <div className={styles.result} id='result'>
                    <div>
                    <div className={styles.cert}>CERTIFICATE</div>
                    <div className={styles.part}>OF PARTICIPATION</div>
                    <div>PROUDLY REPRESENTED TO</div>
                    <div className={styles.name}>{detail.name}</div>
                    <div className={styles.proud}>Score : {marks} / 100</div>
                    <div className={styles.proud}>Subject : {subject.category} </div>
                    <div className={styles.succ}>For Successfully Using Quiz-Time</div>
                    <div className={styles.comp}>Competition ({new Date().toDateString()}) </div>
                    <div>We Acknowledge Your Effort Keep Participating</div>
                    </div>
                    <div className={styles.sign}>
                        <div>Bhudeo Krit</div>
                        <button onClick={handleMenu}>Go To Main Menu</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
