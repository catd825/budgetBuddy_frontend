import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import TransactionEdit from'./TransactionEdit'

const ModalForm = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Edit Budget</ModalHeader>
          <ModalBody>
              <TransactionEdit currentUser={props.currentUser} categories={props.categories} editHandler={props.editHandler} transactions={props.transactions} toggle={toggle}/>
          </ModalBody>
        </Modal>
    </div>
  );
}

export default ModalForm;