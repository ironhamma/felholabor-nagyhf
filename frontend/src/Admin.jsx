import React, { useEffect, useState } from 'react'
import axios from 'axios';

const BACKEND_HOST = import.meta.env.BACKEND_HOST || 'http://localhost:5000';
console.log(BACKEND_HOST);

const Admin = () => {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    const subscribeEmail = async () => {
        try {
            const response = await axios.post(`${BACKEND_HOST}/subscribe`, { email });
            setEmail('');
        } catch (error) {
            console.error(error);
        }
    }

    const fetchEmails = async () => {
        try {
            const response = await axios.get(`${BACKEND_HOST}/emails`);
            const mails = response.data && response.data.emails;
            if (mails.length === 0){
                return;
            }
            setEmails(mails);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchEmails();
        })()
    }, [email])

    return (
        <div>
            <h1>Admin layout</h1>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} style={{minWidth: '300px'}}/>
                <button style={{margin: 0}} onClick={() => {subscribeEmail()}}>Add</button>
            </div>
            {emails.length > 0 && (
                <table style={{minWidth: '500px', borderTop: '1px solid black', borderBottom: '1px solid black', marginTop: "2rem", padding: '1rem'}}>
                    <thead>
                        <tr style={{fontWeight: 'bold'}}>
                            <td style={{paddingBottom: '32px'}}>Email</td>
                            <td style={{paddingBottom: '32px'}}>Subscribed at</td>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email, index) => (
                            <tr key={index}>
                                <td style={{color: 'gray', paddingBottom: '16px'}}>{email.email}</td>
                                <td style={{color: 'gray', paddingBottom: '16px'}}>{new Date(email.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Admin;