import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import emailjs from 'emailjs-com';
import CryptoJS from 'crypto-js';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const sendEmail = async (email) => {
        try {
            // Mã hóa email
            const encryptedEmail = CryptoJS.AES.encrypt(email, 'your-secret-key').toString();

            const templateParams = {
                to_email: email,
                message: 'http://localhost:3000/newPassword?email=' + encodeURIComponent(encryptedEmail), // Đường dẫn đến trang đổi mật khẩu
                from_name: '20130320@st.hcmuaf.edu.vn'
            };

            const response = await emailjs.send(
                'service_2elt81z',
                'template_hqi1z71',
                templateParams,
                'abTWnnSG9C8LlW3-A'
            );

            console.log('Email sent successfully:', response);
            window.alert('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            window.alert('Error sending email');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Gửi email thông báo đặt lại mật khẩu
            await sendEmail(email);
            window.alert('Email sent successfully');
            
            // Điều hướng hoặc hiển thị thông báo khác tùy thuộc vào yêu cầu
        } catch (error) {
            console.error('Error sending email:', error);
            window.alert('Error sending email');
        }
    };
    

    return (
        <div>
            <Row>
                <Col>
                    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "500px" }}>
                        <Form style={{ width: "80%" }} onSubmit={handleSubmit}>
                            <h3 className='mb-4'>Quên mật khẩu</h3>
                            <p>Nhập email của bạn để đặt lại mật khẩu</p>

                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Nhập email của bạn" 
                                    className='border' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </Form.Group>

                            {/* Hiển thị thông báo lỗi */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', width: "100%" }}
                            >
                                Gửi Yêu Cầu
                            </Button>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <img 
                        style={{ width: '100%', height: '100%', padding: '20px', borderRadius: '30px', objectFit: 'cover' }} 
                        src='https://i.pinimg.com/564x/b3/75/de/b375deac66f5962350d4a30b4d0c0134.jpg' 
                        alt='' 
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ForgotPass;
