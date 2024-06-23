import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import axios from 'axios';
import numeral from 'numeral';
import Confetti from 'react-confetti';

const Checkout = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const fetchCartItems = async () => {
        if (!userData || !userData.id) {
            setShowMessage(true);
            return;
        }
        try {
            const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/cart/items/${userData.id}`);
            setCartItems(response.data);
            setShowMessage(response.data.length === 0);
            // Lặp qua các sản phẩm trong giỏ hàng để lấy hình ảnh của từng sản phẩm
            const updatedCartItems = await Promise.all(
                response.data.map(async item => {
                    const productResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${item.product.id}`);
                    const imageUrl = productResponse.data[0].imgPath;
                    return { ...item, imageUrl };
                })
            );
            setCartItems(updatedCartItems);
            // Tính tổng giá trị trong giỏ hàng
            const total = updatedCartItems.reduce((acc, item) => {
                const salePrice = item.product.price - (item.product.price * (item.product.percentDiscount / 100));
                return acc + (salePrice * item.quantity);
            }, 0);
            setTotalPrice(total);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();

    }, []);

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    //quan huyen
    useEffect(() => {
        axios.get('http://feisty-beauty-production.up.railway.app/api/province')
            .then(response => {
                setProvinces(response.data);
                setSelectedProvince(response.data);
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setSelectedProvince(selectedProvince);
        console.log(selectedProvince);
        axios.get(`http://feisty-beauty-production.up.railway.app/api/districts/${selectedProvince}`)
            .then(response => {
                setDistricts(response.data);

            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    };
    //phí vạn chuyên
    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setSelectedDistrict(selectedDistrict);
        console.log(selectedDistrict);

    };

    const [email, setEmail] = useState(userData.email);
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState(userData.phoneNumber);
    const [phoneError, setPhoneError] = useState('');
    const [orderName, setOrderName] = useState(userData.userName);
    const [canSubmit, setCanSubmit] = useState(true);
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [discountID, setDiscountID] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1);

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);

        // Kiểm tra email có đúng định dạng không
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            setEmailError('Email không hợp lệ');
            setCanSubmit(false);
        } else {
            setEmailError('');
            setCanSubmit(true);
        }
    };
    const handlePhoneChange = (event) => {
        const { value } = event.target;
        setPhone(value);

        // Kiểm tra số điện thoại có đúng định dạng không
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(value)) {
            setPhoneError('Số điện thoại không hợp lệ');
            setCanSubmit(false);
        } else {
            setPhoneError('');
            setCanSubmit(true);
        }
    };

    const handleOrderNameChange = (event) => {
        const { value } = event.target;
        setOrderName(value);
    };

    const handleAddressChange = (event) => {
        const { value } = event.target;
        setAddress(value);
    };
    const handleNoteChange = (event) => {
        const { value } = event.target;
        setNote(value);
    };

    const redirectToHome = (id) => {
        window.location.href = `/`;

    };

    const redirectToOrders = (id) => {

        window.location.href = `account/order/order-details/${id}`;
    };


    const handlePaymentChange = (event) => {
        const method = event.target.id === 'paymentOption1' ? 1 : 2;
        setPaymentMethod(method);
        console.log('Phương thức thanh toán:', method);
    };
   


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (canSubmit && orderName && phone && email && address && selectedProvince && selectedDistrict) {
            try {
                const orderResponse = await axios.post('http://feisty-beauty-production.up.railway.app/api/orders', {
                    userId: { id: userData.id },
                    payment: paymentMethod,
                    orderName,
                    phone,
                    email,
                    address,
                    provinceId: { provinceID: selectedProvince },
                    districtId: { districtID: selectedDistrict },
                    note,
                    totalPrice: totalPriceOrder,
                    transport: 30000,
                    discountId: { id: discountID },
                    status: { id: 1 }
                });

                console.log('orderResponse:', orderResponse.status);

                if (orderResponse.status === 201) {
                    const orderData = orderResponse.data;
                    const orderId = orderData.id;
                    console.log('orderId của đơn hàng mới:', orderId);

                    const promises = cartItems.map(async (item) => {
                        const orderDetailResponse = await axios.post('http://feisty-beauty-production.up.railway.app/api/orderDetail', {
                            orderId: { id: orderId },
                            productId: { id: item.product.id },
                            price: item.product.price - (item.product.price * (item.product.percentDiscount / 100)),
                            quantity: item.quantity,
                            total: (item.product.price - (item.product.price * (item.product.percentDiscount / 100))) * item.quantity
                        });

                        // Also, push the remove from cart promise into the array
                        return axios.delete(`http://feisty-beauty-production.up.railway.app/api/cart/clear/user/${userData.id}`);
                    });

                    try {
                        await Promise.all(promises);
                        console.log('Tất cả hoạt động đã được thực hiện đồng thời');
                    } catch (error) {
                        console.error('Error:', error);
                        window.alert('Đã xảy ra lỗi khi xử lý chi tiết đơn hàng');
                        return; // Exit the function early if there's an error
                    }


                    setIsPaymentSuccessful(true);

                
                    setTimeout(() => {
                        setIsPaymentSuccessful(false);
                    }, 5000);

                    const result = window.confirm('Cảm ơn bạn đã đặt hàng! Đến xem đơn hàng?');
                    if (result) {
                        redirectToOrders(orderId);
                    } else {
                        redirectToHome();
                    }
                } else {
                    window.alert('Đặt hàng thất bại');
                    console.error('Đặt hàng thất bại!');
                }
            } catch (error) {
                window.alert('Đã xảy ra lỗi');
                console.error('Đã xảy ra lỗi:', error);
            }

        } else {

            window.alert('Vui lòng nhập đúng thông tin');
            console.log('Vui lòng nhập đúng thông tin');
        }
    };

    const [discountError, setDiscountError] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');

    // Hàm áp dụng mã giảm giá
    const handleApplyDiscount = async () => {
        try {

            const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/discount/${userData.id}/${discountCode}`)

            if (response.data.discountPercentage !== undefined) {
                setDiscountError("");
                setDiscountPercentage(response.data.discountPercentage);
                setDiscountID(response.data.id);
                console.log('Discount:', response.data.id);
            } else {
                setDiscountError("Mã giảm giá không hợp lệ!!");
                setDiscountPercentage("");
                setDiscountID("");
            }
        } catch (error) {

            // console.error('Error applying discount:', error.response);      
            setDiscountError("Mã giảm giá không hợp lệ!!");

            setDiscountPercentage("");
            setDiscountID("");
        }
    };

   const discountAmount = (discountPercentage / 100) * totalPrice;
    const totalPriceOrder = (totalPrice - discountAmount) + 30000;
   



    return (
        <div className='mt-4' style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            {isPaymentSuccessful && <Confetti />}
            <Container className='mt-4'>
                <Row>
                    <Col xs={12} md={6}>
                        {/* <Form> */}
                        <h6><Bs1CircleFill /> Thông tin giao hàng</h6>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ Tên" className="border"
                                value={orderName}
                                onChange={handleOrderNameChange} />

                        </Form.Group>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Nhâp email"
                                        value={email}
                                        onChange={handleEmailChange} />
                                    {emailError && <small className="text-danger">{emailError}</small>}
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Control type="text" placeholder="Nhập số điện thoại" className="border"
                                        onChange={handlePhoneChange}
                                        value={phone} />
                                    {phoneError &&
                                        <small className=" text-danger">
                                            {phoneError}
                                        </small>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control placeholder="Địa chỉ chi tiết" type="text" className="border"
                                value={address}
                                onChange={handleAddressChange} />
                        </Form.Group>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Select aria-label="Default select example" onChange={handleProvinceChange}>
                                        <option>Chọn Tỉnh/Thành phố</option>
                                        {provinces.map(province => (
                                            <option key={province.provinceID} value={province.provinceID}>{province.provinceName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Select aria-label="Default select example" onChange={handleDistrictChange}>
                                        <option>Chọn Quận/Huyện</option>
                                        {districts.map((district, index) => (
                                            <option key={index} value={district.districtID}>{district.districtName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleNoteChange}
                            />
                        </Form.Group>

                        <h6><Bs2CircleFill /> Phương thức thanh toán</h6>
                        <div className='border p-4 mb-4 mt-3'>
                            <Form.Check
                                type="radio"
                                id="paymentOption1"
                                name="paymentOption"
                                label="Thanh toán khi giao hàng (COD)"
                                className='mb-3'
                                onChange={handlePaymentChange}
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                id="paymentOption2"
                                name="paymentOption"
                                label="Thanh toán bằng Paypal"
                                onChange={handlePaymentChange}
                            />
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <h6><Bs3CircleFill /> Thông tin đơn hàng</h6>

                        {cartItems.map(item => {

                            const salePrice = item.product.price - (item.product.price * (item.product.percentDiscount / 100));
                            return (

                                <div key={item.product.id}>
                                    <Row className='mt-3'>
                                        <Col xs={3} md={2} className="d-flex justify-content-center mb-3 mb-md-0">
                                            <img src={item.imageUrl} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} alt="product" />
                                        </Col>
                                        <Col xs={9} md={10} className="d-flex flex-column align-items-start justify-content-center" style={{ padding: '0 15px' }}>
                                            <div>
                                                <h6 className="text-left">{item.product.productName}</h6>
                                                <span className="text-left">{item.quantity} x {numeral(salePrice).format('0,0')}đ</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr className="hr" />
                                </div>

                            )
                        })}


                        <Form.Group className="mb-3">
                            <Row>
                                <Col>
                                    <Form.Control type="text" placeholder="Mã giảm giá" className='border' 
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}/>
                                    {discountPercentage && <small className="text-danger">Bạn đã áp dụng mã giảm giá {discountPercentage}%</small>}
                                    {discountError && <small className="text-danger"> {discountError}</small>}
                                </Col>
                                <Col xs="auto">
                                    <Button style={{ backgroundColor: '#9BCF53', border: '1px solid #9BCF53', fontWeight: 'bold' }} 
                                        onClick={handleApplyDiscount}>
                                        Áp dụng
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        <hr className="hr" />
                        <div className='d-flex justify-content-between'>
                            <span>Tạm tính</span>
                            <span>{numeral(totalPrice).format('0,0')}đ</span>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <span>Phí vận chuyển</span>
                            <span>30.000đ</span>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <span>Giảm giá</span>
                            <span>{numeral(discountAmount).format('0,0')}đ</span>
                        </div>
                        <hr className="hr" />
                        <div className='d-flex justify-content-between mt-3'>
                            <span>Tổng cổng</span>
                            <span style={{ fontSize: '25px' }}>{numeral(totalPrice + 30000 - discountAmount).format('0,0')}đ</span>
                        </div>
                        <Button
                            style={{
                                backgroundColor: '#9BCF53',
                                border: '1px solid #9BCF53',
                                fontWeight: 'bold',
                                padding: '10px 20px',
                                marginTop: '20px'
                            }}
                            className="float-end mt-4"
                            onClick={handleSubmit}
                        >
                            Thanh toán
                        </Button>
                    </Col>
                </Row>


            </Container>
        </div>


    )
}

export default Checkout