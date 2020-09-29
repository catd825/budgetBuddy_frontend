import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import BudgetEditForm from'./BudgetEditForm'

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
            <BudgetEditForm editHandler={props.editHandler} budgets={props.budgets} toggle={toggle}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;