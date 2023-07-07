import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { ResetPassword } from '../modals/ResetPassword';
// TODO reset user data fields to proper values after failed update
export const EditForm = (PropTypes) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ ...PropTypes.user });

  const toggleEdit = () => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  };
  const toggleModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };
  const modalHandler = (event) => {

  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsEdit(false);
    PropTypes.editUser(user);
  };

  return <>
    <Form onSubmit={submitHandler}>
      <Form.Group onChange={changeHandler} as={Row} className='mb-1' controlId='usernameControl'>
        <Form.Label column sm='2'>
          Username:
        </Form.Label>
        <Col sm='8'>
          <Form.Control name='username' plaintext={!isEdit} readOnly={!isEdit} defaultValue={user.username} />
        </Col>
      </Form.Group>
      <Form.Group onChange={changeHandler} as={Row} className='mb-1' controlId='nameControl'>
        <Form.Label column sm='2'>
          Name:
        </Form.Label>
        <Col sm='8'>
          <Form.Control name='name' plaintext={!isEdit} readOnly={!isEdit} defaultValue={user.name} />
        </Col>
      </Form.Group>
      <Form.Group onChange={changeHandler} as={Row} className='mb-1' controlId='surnameControl'>
        <Form.Label column sm='2'>
          Surname:
        </Form.Label>
        <Col sm='8'>
          <Form.Control name='surname' plaintext={!isEdit} readOnly={!isEdit} defaultValue={user.surname} />
        </Col>
      </Form.Group>
      <Form.Group onChange={changeHandler} as={Row} className='mb-1' controlId='emailControl'>
        <Form.Label column sm='2'>
          Email:
        </Form.Label>
        <Col sm='8'>
          <Form.Control plaintext={!isEdit} readOnly={!isEdit} defaultValue={user.email} />
        </Col>
      </Form.Group>
      <Form.Group onChange={changeHandler} as={Row} className='mb-1' controlId='phoneControl'>
        <Form.Label column sm='2'>
          Phone:
        </Form.Label>
        <Col sm='8'>
          <Form.Control plaintext={!isEdit} readOnly={!isEdit} defaultValue={user.phone} />
        </Col>
      </Form.Group>

      <Button className='mt-3 mb-3 me-3'
        onClick={submitHandler}
        hidden={!isEdit}
        variant='primary'
        type='button'>
        Submit
      </Button>
      <Button className='mt-3 mb-3'
        onClick={toggleEdit}
        variant={isEdit ? 'warning' : 'primary'}
        type='button'>
        {isEdit ? 'Cancel' : 'Edit User'}
      </Button>
      <Button className='ms-3 mt-3 mb-3'
        onClick={toggleModal}
        variant='primary'
        type='button'>
        Reset Password
      </Button>
      <ResetPassword modalHandler={modalHandler} toggleModal={toggleModal} showModal={showModal}></ResetPassword>
    </Form>
  </>;
};
