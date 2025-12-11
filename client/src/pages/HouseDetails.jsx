// client/src/pages/HouseDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    API.get(`/houses/${id}`)
      .then(res => setHouse(res.data))
      .catch(err => {
        console.error('Error fetching house', err);
        setHouse(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{padding:20}}>Loading...</div>;
  if (!house) return <div style={{padding:20}}>House not found</div>;

  return (
    <div style={{padding:20}}>
      <Link to="/">← Back</Link>
      <h1>{house.title}</h1>
      <p><strong>Location:</strong> {house.location}</p>
      <p><strong>Price:</strong> ${house.rent_price}</p>
      <div style={{maxWidth:800, marginTop:16}}>
        {house.images && house.images.length ? (
          <div style={{display:'flex', gap:8, overflowX:'auto'}}>
            {house.images.map((url, i) => (
              <img key={i} src={url} alt={`${house.title} ${i}`} style={{height:180, objectFit:'cover'}}/>
            ))}
          </div>
        ) : (
          <div style={{height:180, background:'#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>No image</div>
        )}
        <h3 style={{marginTop:12}}>Description</h3>
        <p>{house.description || 'No description provided'}</p>
      </div>
    </div>
  );
}
