import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Nav } from 'react-bootstrap';
import '../css/default.scss';
import { loginUser } from '../api';


const SignForm = ({ formType, handleClick }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <Form className='form border rounded-3 shadow sign-form'>
            <h1 className='mb-5 '>{formType === 'registration' ? 'Register' : 'Login'}</h1>
            <Form.Group controlId="username" className="mb-3">
                <Form.Control type="text" placeholder="Your username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            {formType === 'registration' && (
                <Form.Group controlId="email" className="mb-3">
                    <Form.Control type="email" placeholder="Your email" onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
            )}

            <Form.Group controlId="password" className="mb-3">
                <Form.Control type="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Nav className="mb-3">
                <span className="mr-2">{formType === 'registration' ? 'Already Registered?' : "Don't have an account?"}</span>
                {formType === 'registration' && <Nav.Link href="/login" className='p-0'>Login Here...</Nav.Link>}
                {formType === 'login' && <Nav.Link href="/registration" className='p-0'>Register here...</Nav.Link>}
            </Nav>

            <Button className="px-4 shadow" variant="primary" type="submit" 
                    onClick={(e) => formType === 'registration' ? handleClick(e, username, password, email) : handleClick(e, username, password)}>
                {formType === 'registration' ? 'Register' : 'Login'}
            </Button>
        </Form>
    );
};

export default SignForm;