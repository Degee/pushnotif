import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const ConfirmModal = ({handleClose, handleDelete}) =>
    <div className="static-modal">
      <Modal.Dialog keyboard>
        <Modal.Header>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are u sure you want to remove this record?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} bsStyle="primary">Yes, delete</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  ;

export default ConfirmModal;
