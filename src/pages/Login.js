import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import './style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            const response = await axios.post('http://feisty-beauty-production.up.railway.app/api/users/login', {
                email: email,
                password: password
            });

            const { status, typeID  } = response.data;

            if (status === 2) {
                window.alert('Tài khoản bị khóa. Vui lòng liên hệ hỗ trợ.');
                return;
            }

            console.log(typeID); 

            const userDataToSave = {
                ...response.data,
                password: undefined 
            };

            // Save user data to Local Storage
            localStorage.setItem('userData', JSON.stringify(userDataToSave));

            // Redirect based on typeID
            if (typeID === 1) {
                window.location.href = '/';
            } else if (typeID === 2) {
                window.location.href = '/dashboard';
            } else {
                window.alert('Unknown user type');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            window.alert('Email hoặc mật khẩu không đúng');
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "500px" }}>
                        <Form style={{ width: "80%" }} onSubmit={handleLogin}>
                            <h3 className='mb-4'>Đăng nhập</h3>
                            <p>Nhập email và mật khẩu để đăng nhập</p>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Nhập email" className='border' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Nhập mật khẩu" className='border' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3 text-center" controlId="formBasicRegister">
                                <p style={{ fontSize: '12px' }} className="text-default">
                                    <Link to="/forgetPass" style={{ textDecoration: 'none' }}>Quên mật khẩu?</Link>
                                </p>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', width: "100%" }}>
                                Đăng Nhập
                            </Button>
                            <Form.Group className="mb-3 mt-3 text-center" controlId="formBasicRegister">
                                <p style={{ fontSize: '12px' }} className="text-default">
                                    Bạn chưa có tài khoản? <span className="text-hover" style={{color: '#416D19'}}><Link to="/signup" style={{ textDecoration: 'none' }}>Đăng ký?</Link></span>
                                </p>
                            </Form.Group>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <img style={{ width: '100%', height: '100%', padding: '20px', borderRadius: '30px', objectFit: 'cover' }} src='https://i.pinimg.com/564x/b3/75/de/b375deac66f5962350d4a30b4d0c0134.jpg' alt='' />
                </Col>
            </Row>
        </div>
    );
}

export default Login;
