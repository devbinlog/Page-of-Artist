import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import React, { useState } from 'react';
import './Login.css';

function Login() {

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    return (
        <div>
            {isLogin ? (
                <div>
                    <LoginForm/>
                    <p className="Login-p">Don't have an account? <span className="toggle-link" onClick={toggleForm}>Sign Up</span>
                    </p>
                </div>
            ) : (
                <div>
                    <SignUpForm/>
                    <p className="Login-p">Already have an account? <span className="toggle-link"
                                                                          onClick={toggleForm}>Login</span></p>
                </div>
            )}
        </div>
    );
}

export default Login;