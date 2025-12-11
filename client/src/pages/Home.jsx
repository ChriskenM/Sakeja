import React, {useEffect, useState} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [houses,setHouses] = useState([]);
  useEffect(()=>{
    API.get('/houses').then(res=>setHouses(res.data)).catch(err=>console.error(err));
  },[]);
  return (
    <div style={{padding:20}}>
      <h1>Featured Houses</h1>
    // Temporally fix
    {/* Temporally fix */}
      <ul>
        <li><Link to="/login">Go to Login</Link></li>
        <li><Link to="/add">Add House</Link></li>
        <li><Link to="/houses/1">Sample House Details</Link></li>
      </ul>


      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {houses.map(h => (
          <div key={h._id} style={{border:'1px solid #eee',padding:10}}>
            <div style={{height:160, background:'#ddd', marginBottom:10}}>
              {h.images && h.images[0] ? <img src={h.images[0]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
            </div>
            <h3>{h.title}</h3>
            <p>{h.location}</p>
            <p>${h.rent_price}</p>
            <Link to={`/houses/${h._id}`}><button>View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
