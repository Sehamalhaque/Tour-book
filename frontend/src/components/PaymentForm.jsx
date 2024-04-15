import React, { useState, useEffect } from 'react';

const PaymentForm = () => {
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/price')
            .then(response => response.json())
            .then(data => setPrice(data.amount))
            .catch(error => console.error('Error fetching price:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        
        fetch( {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                price
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPaymentSuccess(true);
            } else {
                alert('Payment failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Payment error:', error);
            alert('Payment processing error.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            {!paymentSuccess ? (
                <form onSubmit={handleSubmit}>
                    <h2>Price: ${price}</h2>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>Pay Now</button>
                    </div>
                </form>
            ) : (
                <div>
                    <h2>Your payment is confirmed!</h2>
                    <p>Thank you for your payment, {name}.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
