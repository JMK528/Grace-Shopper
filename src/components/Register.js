import React, { useState } from 'react';
import { registerUser } from '../api'

const Register = ({ setToken, navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (username, password, email) => {
        console.log(username, password, 'testing UN/PW')
        try {
            const results = await registerUser(username, password, email);
            console.log(results)
            if (results.success) {
                setToken(results.data.token);
                window.localStorage.setItem('token', results.data.token);
                navigate('/');
            }
        } catch (err) {
            console.log('Register component FAILED', err)
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(username, password, email)
        }}>
            <h1>Register</h1>
            <input
                type='text'
                placeholder='Enter Username'
                onChange={(event) => {console.log(event.target.value), setUsername(event.target.value)}}
            />
            <input
                type='password'
                placeholder='Enter Password'
                onChange={(event) => setPassword(event.target.value)}
            />
            <input
            type='text'
            placeholder='Enter Email'
            onChange={(event) => setEmail(event.target.value)}
            />
            <button type='submit'>Register</button>
        </form>
    )
}

export default Register;