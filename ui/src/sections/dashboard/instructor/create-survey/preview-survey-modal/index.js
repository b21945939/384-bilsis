import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import QuestionList from './question-list';

PreviewSurveyModal.propTypes = {
    questions: PropTypes.array.isRequired,
    isSubmitting: PropTypes.bool.isRequired
};

export default function PreviewSurveyModal({ questions, isSubmitting }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={isSubmitting}>
                Preview survey
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Preview survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionList questions={questions} />
                </Modal.Body>
            </Modal>
        </>
    );
}
