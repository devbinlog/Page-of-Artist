import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";

function SignUpForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isArtist, setIsArtist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 데이터 확인
    console.log('Signing up with:', { name, username, password, email, isArtist });

    // 회원가입 요청 보내기
    try {
      const response = await axios.post('http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/users/register', {
        name,
        username,
        password,
        email,
        isArtist
      });
      if (response.status === 200) {
        alert('Sign up successful!');
        // Redirect to dashboard or home page here
        // history.push('/home'); // 예를 들어 React Router를 사용하는 경우
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
      <>
        <div className="Login-h2">Sign Up</div>
        <form onSubmit={handleSubmit} className="Login-form">
          <input className="Login-input-text" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
          <input className="Login-input-text" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
          <input className="Login-input-pw" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
          <input className="Login-input-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
          <label className="Login-checkbox-label">
            <input type="checkbox" className="checkbox-input" checked={isArtist} onChange={(e) => setIsArtist(e.target.checked)} />
            아티스트입니까?
          </label>
          <label className="Login-checkbox-label"><input type="checkbox" required className="checkbox-input"/> 이용 약관 동의</label>
          <label className="Login-checkbox-label"><input type="checkbox" required className="checkbox-input"/> 저작권 동의 </label>
          <label className="Login-checkbox-label"><input type="checkbox" required className="checkbox-input"/> 약관 동의 </label>
          <button className="Login-button" type="submit">Sign Up</button>
        </form>
      </>
  );
}

export default SignUpForm;
