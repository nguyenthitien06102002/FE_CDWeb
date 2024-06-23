import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isValidForm, setIsValidForm] = useState(true);

    const handleChangeUserName = (e) => {
        const inputUser = e.target.value;
        setUserName(inputUser);     
    };

    const handleChangeEmail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(inputEmail);
        setValidEmail(isValid);
    };

    const handleChangePhone = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhoneNumber(inputPhoneNumber);
        const regex = /^\d{10}$/; // Định dạng số điện thoại gồm 10 chữ số
        const isValid = regex.test(inputPhoneNumber);
        setValidPhoneNumber(isValid);
    };

    const handleChangePassword = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        const regex = /^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;

        const isValid = regex.test(inputPassword);
        setValidPassword(isValid);

        setPasswordsMatch(inputPassword === confirmPassword);
    };

    const handleChangeConfirmPassword = (e) => {
        const inputConfirmPassword = e.target.value;
        setConfirmPassword(inputConfirmPassword);

        setPasswordsMatch(inputConfirmPassword === password);
    };

    const handleSubmit = async () => { 
        if (!validEmail || !validPhoneNumber || !validPassword || !passwordsMatch) {
            setIsValidForm(false); 
            return; 
        }
    
        try {
            const response = await axios.post('http://feisty-beauty-production.up.railway.app/api/users', {
                userName: userName,
                password: password,    
                phoneNumber: phoneNumber,              
                email: email,
                status : 1,
                typeID : 1,
                socialLoginId : "normal"
            });
            console.log(response.data); 
            window.alert('Bạn đã đăng ký thành công' );
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing up:', error);
           
        }
    };

    return (
        <div>
            <Row>
                <Col xs={12} md={6}>
                    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "500px" }}>
                        <Form style={{ width: "80%" }} >
                            <h3 className='mb-4'>Đăng ký</h3>

                            <Form.Group className="mb-3 " >
                                <Form.Control type="text" placeholder="Nhập họ và tên" className='border' value={userName} onChange={handleChangeUserName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control type="email" placeholder="Nhập email" className={`border ${validEmail ? '' : 'is-invalid'}`} value={email} onChange={handleChangeEmail} />
                                {!validEmail && (<Form.Text className="text-danger">Vui lòng nhập địa chỉ email hợp lệ.</Form.Text>)}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Control type="text" placeholder="Nhập số điện thoại" className={`border ${validPhoneNumber ? '' : 'is-invalid'}`} value={phoneNumber} onChange={handleChangePhone} />
                                {!validPhoneNumber && (<Form.Text className="text-danger">Vui lòng nhập số điện thoại đúng định dạng.</Form.Text>)}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                               
                                <Form.Control type="password" placeholder="Nhập mật khẩu" className={`border ${validPassword ? '' : 'is-invalid'}`} value={password} onChange={handleChangePassword} />
                                {!validPassword && (<Form.Text className="text-danger">Mật khẩu phải chứa ít nhất 8 ký tự và ít nhất 1 ký tự đặc biệt.</Form.Text>)}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                
                                <Form.Control type="password" placeholder="Nhập lại mật khẩu" className={`border ${passwordsMatch ? '' : 'is-invalid'}`} value={confirmPassword} onChange={handleChangeConfirmPassword} />
                                {!passwordsMatch && (<Form.Text className="text-danger">Mật khẩu và nhập lại mật khẩu không khớp.</Form.Text>)}
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Đồng ý với điều khoản của chúng tôi" />
                            </Form.Group>

                            <Button variant="primary" style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', width: "100%" }}  disabled={!isValidForm}
                            onClick={handleSubmit}>
                                Đăng ký
                            </Button>

                            <Form.Group className="mb-3 mt-3 text-center" controlId="formBasicRegister">
                                <p style={{ fontSize: '12px' }} className="text-default">
                                    Bạn đã có tài khoản? <span className="text-hover" style={{ color: '#416D19' }}>Đăng nhập?</span>
                                </p>
                            </Form.Group>
                        </Form>
                    </Container>
                </Col>
                <Col xs={12} md={6}>
                    <img style={{ width: '100%', height: '100%', padding: '20px', borderRadius: '30px', objectFit: 'cover' }} src='https://i.pinimg.com/564x/bf/ac/77/bfac7719b45715294475b488f6ebec1b.jpg' alt='' />
                </Col>
            </Row>
        </div>
    );
};

export default Signup;
