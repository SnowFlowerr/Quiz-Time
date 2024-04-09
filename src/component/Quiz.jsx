import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.css'
import chemistry from './data/chemistry'
import physics from './data/physics'
import maths from './data/maths'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quiz() {
    const [ind, setInd] = useState(0);
    const navigate = useNavigate();
    let detail = { name: localStorage.getItem("name"), date: localStorage.getItem("date"), email: localStorage.getItem("email") };
    const [subject, setsubject] = useState({
        "category": "",
        "questions": [
            {
                "question": "",
                "options": [""],
                "correct_answer": ""
            },]
    });
    const [marks, setMarks] = useState(0);
    const [submit, setSubmit] = useState(true);
    const [correct, setCorrect] = useState("");
    const [answer, setAnswer] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sub = localStorage.getItem("sub");
        
        if (localStorage.getItem("total") !== null) {
            setTotal(parseInt(localStorage.getItem("total")))
        }
        else {
        }
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
    useEffect(() => {
        setCorrect(subject.questions[ind].correct_answer);
        window.history.pushState({}, undefined, "/quiz");
    })

    function handleNext(e) {
        e.preventDefault();
        if (submit) {
            setSubmit(false)
            for (let i = 11; i <= 14; i++) {
                if (document.getElementById(`${i}`).innerText === answer) {
                    document.getElementById(`${i}`).style.backgroundColor = "red"
                }
                if (document.getElementById(`${i}`).innerText === correct) {
                    document.getElementById(`${i}`).style.backgroundColor = "lightgreen"
                }
                // }
            }
            if (answer === correct) {
                setMarks(marks + 2)
                setTotal(total + 2)
                success("Right Answer '+2 Marks' ")
            }
            else if (answer !== "" && answer !== correct) {
                setMarks(marks - 1)
                setTotal(total - 1)
                error("Wrong Answer '-1 Marks' ")
            }
            else if (answer === "") {
                warning("You Won't Get Marks For This")
            }
            setTimeout(() => {
                if (ind < 9) {
                    setInd(ind + 1);
                }
                if (ind === 9) {
                    handlesubmit(e);
                }
                white()
                setAnswer("")
                setSubmit(true)
            }, 1000)
        }

    }
    function handleAnswer(e) {
        e.preventDefault();
        if (submit) {
            if (answer === document.getElementById(e.target.id).innerText) {
                document.getElementById(e.target.id).style.backgroundColor = "white"
                setAnswer("")
            }
            else {
                white();
                document.getElementById(e.target.id).style.backgroundColor = "#ddab5d"
                setAnswer(document.getElementById(e.target.id).innerText)
            }
        }

    }
    function white() {
        document.getElementById("11").style.backgroundColor = "white"
        document.getElementById("12").style.backgroundColor = "white"
        document.getElementById("13").style.backgroundColor = "white"
        document.getElementById("14").style.backgroundColor = "white"
    }
    function handlesubmit(e) {
        e.preventDefault();
        if (submit) {
            setSubmit(false);
            document.getElementById('result').style.visibility = 'visible'
            localStorage.setItem("total", `${total}`)
        }
    }
    function handleMenu(e) {
        e.preventDefault();
        localStorage.setItem("total", `${total}`)
        navigate("/");
    }
    const warning = (message) => {
        toast.warning(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const error = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const success = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    // ref={(ref) => { this.nav = ref; }}
    // onNavigationStateChange={(prevState, currentState) => {
    //     //call function on current view
    // }}
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={styles.box}>
                <div className={styles.marks}>
                    <div className={styles.ques}><span className={styles.numb}> Ques : </span>{ind + 1}</div>
                    <div className={styles.quizname}>Quiz Time</div>
                    <div className={styles.mar}><span className={styles.numb}>Marks : </span>{marks}</div>
                </div>
                <div className={styles.quizbox}>
                    <input type="range" className={styles.range} value={ind + 1} max={10} />
                    <div className={styles.questions}>
                        <div className={styles.question}>{subject.questions[ind].question}</div>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.row}>
                            <div className={styles.opt} onClick={handleAnswer} id="11">{subject.questions[ind].options[0]}</div>
                            <div className={styles.opt} onClick={handleAnswer} id="12">{subject.questions[ind].options[1]}</div>
                        </div>
                    <div className={styles.count}>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.opt} onClick={handleAnswer} id="13">{subject.questions[ind].options[2]}</div>
                            <div className={styles.opt} onClick={handleAnswer} id="14">{subject.questions[ind].options[3]}</div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handlesubmit}>Submit</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                    <div className={styles.result} id='result'>
                        <div>
                            <div className={styles.cert}>CERTIFICATE</div>
                            <div className={styles.part}>OF PARTICIPATION</div>
                            <div>PROUDLY REPRESENTED TO</div>
                            <div className={styles.name}>{detail.name}</div>
                            <div className={styles.proud}>{subject.category} </div>
                            <div className={styles.proud}>{marks} / 20 ({marks >= 10 ? "Passed" : "Failed"})</div>
                            <div className={styles.succ}>For Successfully Using Quiz Time App</div>
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
        </>
    )
}
