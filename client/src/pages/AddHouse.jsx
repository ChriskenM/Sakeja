import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddHouse(){
  const [title,setTitle]=useState('');
  const [location,setLocation]=useState('');
  const [rent,setRent]=useState('');
  const [desc,setDesc]=useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await API.post('/houses', {
        title, location, rent_price: rent, description: desc
      });
      nav('/');
    } catch(err){ console.error(err); alert('Error'); }
  }

  return (
    <form onSubmit={submit} style={{padding:20}}>
      <h2>Add New House</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/><br/>
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location"/><br/>
      <input value={rent} onChange={e=>setRent(e.target.value)} placeholder="Rent Price"/><br/>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description"/><br/>
      <button type="submit">Submit</button>
    </form>
  );
}
