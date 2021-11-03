import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { Container, Row, Col } from 'react-bootstrap';
// import { useHistory } from 'react-router';

const DormProfile = (props) => {
  // useEffect(() => {
  //   if (props.roleId !== 0) {
  //     window.alert('คุณไม่มีสิทธิ์ในการเข้าถึง โปรดเข้าสู่ระบบ');
  //     history.push('/login');
  //   }
  // }, []);
  const [dormData, setDormData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDormProfile = async () => {
      try {
        const response = await axios.get(`${env.url}dorm/info/${props.dormId}`);
        setDormData(response.data);
        console.log(dormData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getDormProfile();
  }, []);

  console.log(dormData);

  if (loading) {
    return <h2 className="text-center fs-3 mt-5">Loading...</h2>;
  }
  return (
    <>
      <h1>
        ข้อมูลหอพัก <i className="fas fa-info-circle"></i>
      </h1>

      <Container className="w-75  mb-3">
        <h4 className="fw-bold">ข้อมูลและที่อยู่</h4>
        <Container
          className="p-3 rounded mb-3 mx-auto"
          style={{ backgroundColor: '#EAE7E2' }}
        >
          <Row className="mb-3">
            <Col xs={6} sm={3} md={2}>
              <h6 className="fw-bold">ชื่อหอพัก (ไทย):</h6>
            </Col>
            <Col xs={6} sm={3} md={3}>
              <p>{dormData.DORMNAMETH}</p>
            </Col>
            <Col xs={6} sm={3} md={3}>
              <h6 className="fw-bold">ชื่อหอพัก (อังกฤษ):</h6>
            </Col>
            <Col xs={6} sm={3} md={3}>
              <p>{dormData.DORMNAMEENG}</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={6} sm={6} md={2}>
              <h6 className="fw-bold">เบอร์โทรศัพท์:</h6>
            </Col>
            <Col xs={6} sm={6} md={10}>
              <p>{dormData.TELNO}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={6} sm={6} md={2}>
              <h6 className="fw-bold">ที่อยู่:</h6>
            </Col>
            <Col xs={6} sm={6} md={10}>
              <p>{dormData.ADDRESS}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={6} sm={6} md={2}>
              <h6 className="fw-bold">ถนน:</h6>
            </Col>
            <Col xs={6} sm={6} md={2}>
              <p>{dormData.STREET}</p>
            </Col>
            <Col xs={6} sm={6} md={2}>
              <h6 className="fw-bold">แขวง/ตำบล:</h6>
            </Col>
            <Col xs={6} sm={6} md={2}>
              <p>{dormData.SUBDISTRICT}</p>
            </Col>
            <Col xs={6} sm={6} md={2}>
              <h6 className="fw-bold">เขต/อำเภอ:</h6>
            </Col>
            <Col xs={6} sm={6} md={2}>
              <p>{dormData.DISTRICT}</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={6} sm={3} md={2}>
              <h6 className="fw-bold">รหัสไปรษณีย์:</h6>
            </Col>
            <Col xs={6} sm={3} md={4}>
              <p>{dormData.POSTCODE}</p>
            </Col>
            <Col xs={6} sm={3} md={2}>
              <h6 className="fw-bold">จังหวัด:</h6>
            </Col>
            <Col xs={6} sm={3} md={4}>
              <p>{dormData.PROVINCE}</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default DormProfile;
