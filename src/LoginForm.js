import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Attempting to login with username: ${username} and password: ${password}`); // 로그인 시도 로그
        try {
            const response = await axios.post('http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/api/users/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Server response:", response); // 서버 응답 로그
            if (response.status === 200) {
                alert('Login successful!');
                setLoginSuccess(true); // 로그인 성공 상태 업데이트
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
            }
            alert('Login failed. Please check your username and password.');
        }
    };

    return (
        <>
            <div className="Login-h2">Login</div>
            <form onSubmit={handleSubmit} className="Login-form">
                <input className="Login-input-text" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
                <input className="Login-input-pw" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <button className="Login-button" type="submit">Login</button>
            </form>

            {/* 로그인 성공 후 메인 페이지로 이동하는 링크 */}
            {loginSuccess && (
                <p className="Login-link">Login successful! Go to <Link to="/main">Main Page</Link></p>
            )}
        </>
    );
}

export default LoginForm;
