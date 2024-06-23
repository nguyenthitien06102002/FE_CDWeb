import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { serviceData } from "../../utils/products"

const Wrapper = () => {
  return (
      <section className='wrapper background'>
        <Container>
          <Row>
          {serviceData.map((val, index) => {
            return (
              <Col md={3} sm={5} xs={9} style={{backgroundColor:val.bg}}  className='feature' key={index}>
              
                  {/* {val.icon} */}
                  <img className='icon' src={val.icon}></img>
               
                <h3>{val.title}</h3>
                {/* <p>{val.subtitle}</p> */}
                <p>Xem Thêm</p>
              </Col>
            )
          })}
          </Row>
        </Container>
      </section>
  )
}

// const styles = {
//   feature: {
//     backgroundColor: val.bg,
//     position: 'relative', // Để xác định kích thước ảnh khi hover
//     overflow: 'hidden' // Ẩn phần ảnh nếu nó vượt ra ngoài kích thước của phần tử cha
//   },
//   icon: {
//     width: '100%', // Kích thước mặc định của ảnh
//     transition: 'transform 0.3s ease-in-out', // Hiệu ứng chuyển đổi khi hover
//   },
//   iconHover: {
//     transform: 'scale(1.2)' // Phóng to ảnh lên 120% khi hover
//   }
// };

export default Wrapper
