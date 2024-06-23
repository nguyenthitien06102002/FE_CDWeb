import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // Import thư viện crypto-js
import "./style.css";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [email, setEmail] = useState(''); // Thêm state để lưu email
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); 
    const [passwordRequirementError, setPasswordRequirementError] = useState('');

    // Giải mã email từ URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedEmail = urlParams.get('email');
        if (encryptedEmail) {
            try {
                const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedEmail), 'your-secret-key'); // Sử dụng cùng một key như khi mã hóa
                const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
                setEmail(decryptedEmail);
            } catch (error) {
                console.error('Error decrypting email:', error);
                setError('Invalid email token');
            }
        }
    }, []);

    // Hàm kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp nhau không
    const handleCheckPasswordsMatch = () => {
        const match = newPassword === confirmNewPassword;
        setPasswordsMatch(match);
        if (!match) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');   
        } else {
            setError('');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        const regex = /^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;
        if (!regex.test(newPassword)) {
            setError('Mật khẩu mới phải chứa ít nhất 8 ký tự, ít nhất 1 ký tự đặc biệt và 1 ký tự chữ hoặc số');
            return;
        }

        try {
            const response = await axios.put('http://feisty-beauty-production.up.railway.app/api/users/forgot-password', {
                email: email,
                newPassword: newPassword
            });

            console.log(response.data);
            window.alert('Đổi mật khẩu thành công');
            window.location.href = '/';
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Có lỗi xảy ra khi đổi mật khẩu');
            }
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "500px" }}>
                        <Form style={{ width: "80%" }} onSubmit={handleChangePassword}>
                            <h3 className='mb-4'>Đổi mật khẩu</h3>
                            <p>Nhập mật khẩu mới để đổi mật khẩu</p>

                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Nhập mật khẩu mới" 
                                    className='border' 
                                    value={newPassword} 
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        const regex = /^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;
                                        if (!regex.test(e.target.value)) {
                                            setPasswordRequirementError('Mật khẩu mới phải chứa ít nhất 8 ký tự, ít nhất 1 ký tự đặc biệt và 1 ký tự chữ hoặc số');
                                        } else {
                                            setPasswordRequirementError('');
                                        }
                                    }} 
                                />
                            </Form.Group>
                                {/* Hiển thị thông báo lỗi về yêu cầu mật khẩu mới */}
                                {passwordRequirementError && <p style={{ color: 'red' }}>{passwordRequirementError}</p>}
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Nhập lại mật khẩu mới" 
                                    className='border' 
                                    value={confirmNewPassword} 
                                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                                    onBlur={handleCheckPasswordsMatch} 
                                />
                            </Form.Group>

                            {/* Hiển thị thông báo lỗi */}
                            {!passwordsMatch && <p style={{ color: 'red' }}>{error}</p>}

                            <Button 
                                variant="primary" 
                                type="submit" 
                                style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', width: "100%" }}
                            >
                                Đổi Mật Khẩu
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

export default ChangePassword;
