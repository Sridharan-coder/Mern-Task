import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";


const CustomModal=({
  title = "Title",
  isOpen,
  toggle,
  onCancel,
  cancelText,
  onSubmit,
  submitText,
  onDelete,
  deleteText,
  children
})=> {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {/* {state.clickInfo && (
          <Button color="primary" onClick={handleDelete}>
            Delete
          </Button>
        )}
        {state.clickInfo && (
          <Button color="secondary" onClick={handleEdit}>
            Edit
          </Button>
        )} */}
        {onCancel && (
          <Button color="secondary" onClick={onCancel}>
            {cancelText || "Cancel"}
          </Button>
        )}
        {onDelete && (
          <Button color="primary" onClick={onDelete}>
            {deleteText || "Delete"}
          </Button>
        )}
        {onSubmit && (
          <Button color="primary" onClick={onSubmit}>
            {submitText || "Submit"}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;