import React, { useRef, useState } from 'react';
import './register.scss'
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailRef = useRef()
    const passRef = useRef()
    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = () => {
        console.log(password);
        setPassword(passRef.current.value)
    }
    // const navigate = useNavigate()
    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <button className="loginButton"  >Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more</h1>
                <h2>Watch anywhere. Cancel anytime</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {
                    !email ? (
                        <div className="input">
                            <input type="email" name="" id="" placeholder="Email Address" ref={emailRef} />
                            <button className="registerButton" onClick={handleStart}>Get Started</button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="password" name="" placeholder="Enter your password" id="" ref={passRef} />
                            <button className="registerButton" onClick={handleFinish}>
                                Start
                            </button>
                        </form>
                    )
                }

            </div>
        </div >
    );
}

export default Register;
