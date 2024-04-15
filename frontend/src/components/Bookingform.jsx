import React, { useState } from 'react';
import './BookingForm.css'; 

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log('Form submitted:', { name, email, place, numberOfPeople });
    setName('');
    setEmail('');
    setPlace('');
    setNumberOfPeople('');
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Place:
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
      </label>
      <br />
      <label>
        Number of People:
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;
