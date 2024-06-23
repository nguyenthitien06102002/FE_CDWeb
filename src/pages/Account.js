import React from 'react';
import { Col, Row } from 'antd';
import { Container } from 'react-bootstrap';
import SidebarAccount from '../components/Account/SidebarAccount';
import { Outlet } from 'react-router-dom';

const Account = () => {
  return (
    <div>
      <Container className='mt-4 mb-4'>
        <Row>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 18, order: 1 }}
            lg={{ span: 18, order: 1, push: 6 }}
            style={{ backgroundColor: '#80808012' }}
          >
            <Outlet /> 
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 6, order: 2 }}
            lg={{ span: 6, order: 2, pull: 18 }}
          >
            <SidebarAccount />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Account;
