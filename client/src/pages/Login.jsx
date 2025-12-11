import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', {email,password});
      localStorage.setItem('token', res.data.token);
      nav('/');
    } catch(err){ alert(err?.response?.data?.message || 'Error') }
  }

  return (
    <form onSubmit={submit} style={{padding:20}}>
      <h2>Login</h2>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/></div>
      <button type="submit">Login</button>
    </form>
  );
}
