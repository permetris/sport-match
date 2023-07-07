import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useToastifyError, useToastifySuccess, useToastifyWarning } from '../../hooks/useToastify';
import { ConfirmPasswordForm } from './ResetPasswordModal/ConfirmPasswordForm';
import { warningMessages, successMessages } from '../../utils/responseMessages';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { httpPasswordChange } from '../../hooks/requests';

export const ResetPassword = (props) => {
  const user = isLoggedIn();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const modalSubmitHandler = async () => {
    if (data.newPassword !== data.confirmPassword) {
      return useToastifyWarning(warningMessages.passwordsDoNotMatch);
    }
    try {
      await httpPasswordChange({
        password: data.password,
        newPassword: data.newPassword
      }, user);
      useToastifySuccess(successMessages.passwordUpdated);
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      useToastifyError(err);
    };
  };
  return (
    <Modal
      show={props.showModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header >
        <Modal.Title id='contained-modal-title-vcenter'>
            Reset password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ConfirmPasswordForm data={data} setData={setData} modalSubmitHandler={modalSubmitHandler} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={modalSubmitHandler} variant='primary'>Submit</Button>
        <Button variant='warning' onClick={props.toggleModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};
