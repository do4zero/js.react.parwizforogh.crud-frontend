import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { deleteCard } from './services/controllers';

const Confirm = ({ show, handleClose, handleLoadData, id }) => {
  const handleDelete = async () => {
    await deleteCard(id);
    handleClose();
    handleLoadData();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Yes, Delete.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirm;
