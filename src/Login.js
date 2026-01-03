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
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(165deg, var(--bg-primary), var(--bg-secondary) 88%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px'
        }}>
            {isLogin ? (
                <div style={{ width: '100%', maxWidth: '500px' }}>
                    <LoginForm/>
                    <p className="Login-p">Don't have an account? <span className="toggle-link" onClick={toggleForm}>Sign Up</span>
                    </p>
                </div>
            ) : (
                <div style={{ width: '100%', maxWidth: '500px' }}>
                    <SignUpForm/>
                    <p className="Login-p">Already have an account? <span className="toggle-link"
                                                                          onClick={toggleForm}>Login</span></p>
                </div>
            )}
        </div>
    );
}

export default Login;