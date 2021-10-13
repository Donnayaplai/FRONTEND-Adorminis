import React, { useState } from 'react';
import axios from 'axios';
import env from '../../env';
import { Card, Form, Container, Button } from 'react-bootstrap';
import './RegisterLogin.css';
import { useForm } from 'react-hook-form';

const CheckExistAccount = () => {
  const [userId, setUserId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(`${env.url}api/user/verifyUser`, data)
      .then((data) => setUserId(data.data.USERID));
    console.log(data);
    reset();
  };
  return (
    <Container>
      <h1>ลงทะเบียนผู้ใช้งาน</h1>
      <h1>Your userid is: {userId}</h1>

      <Card
        className="mx-auto p-5 border-0"
        style={{ backgroundColor: '#EAE7E2', maxWidth: '400px', width: '100%' }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="รหัสบัตรประชาชน 13 หลัก"
                className={`form-control ${errors.idCardNo && 'invalid'}`}
                {...register('idCardNo', {
                  required: 'โปรดกรอกรหัสบัตรประชาชน',
                  minLength: {
                    value: 13,
                    message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                  },
                  maxLength: {
                    value: 13,
                    message: 'รหัสบัตรประชาชนควรมี 13 หลัก',
                  },
                })}
                onKeyUp={() => {
                  trigger('idCardNo');
                }}
              />
              {errors.idCardNo && (
                <small className="text-danger">{errors.idCardNo.message}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>วันเกิด</Form.Label>
              <Form.Control
                type="date"
                placeholder="วว/ดด/ปปปป"
                {...register('dateOfBirth', {
                  required: 'โปรดกรอกวัน/เดือน/ปี เกิด',
                })}
                onKeyUp={() => {
                  trigger('dateOfBirth');
                }}
              />
              {errors.dateOfBirth && (
                <small className="text-danger">
                  {errors.dateOfBirth.message}
                </small>
              )}
            </Form.Group>
          </Container>

          <center>
            <Button
              type="submit"
              id="btn-save"
              style={{ marginTop: '5%' }}
              value="Send message"
            >
              ต่อไป <i className="fas fa-sign-in-alt"></i>
            </Button>
          </center>
        </Form>
      </Card>
    </Container>
  );
};
export default CheckExistAccount;