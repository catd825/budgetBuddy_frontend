import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import TransCreate from'./TransCreate'

const CreateTransModalForm = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

//   console.log(props)
  return (
    <div>
    <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create Transaction</ModalHeader>
        <ModalBody>
            <TransCreate categories={props.categories} submitHandler={props.submitHandler} currentUser={props.currentUser} toggle={toggle}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CreateTransModalForm;