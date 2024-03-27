import React, { useState } from 'react'

const Admin = () => {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    return (
        <div>
            <h1>Admin layout</h1>
            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {emails.length > 0 && emails.map((email, index) => (
                        <tr key={index}>
                            <td>{email}</td>
                            <td>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <button onClick={() => {setEmails([...emails, email]); setEmail('');}}>Add</button>
            </div>
        </div>
    );
}

export default Admin;