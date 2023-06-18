import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CreateQuestionForm from './form';

CreateQuestionModal.propTypes = {
    addQuestions: PropTypes.func.isRequired,
    existingQuestions: PropTypes.array.isRequired,
    isSubmitting: PropTypes.bool.isRequired
};

export default function CreateQuestionModal({ questionType, isSubmitting, addQuestions }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={isSubmitting}>
                Create question
            </Button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateQuestionForm questionType={questionType} handleClose={handleClose} addQuestions={addQuestions} />
                </Modal.Body>
            </Modal>
        </>
    );
}
