import React, { useState } from "react";
import {Button, Modal, Form} from "react-bootstrap"

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Create a folder in the database
   setName("")
   closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">Add Folder</Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
                <Button variant="success" type="submit">Add Folder</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
