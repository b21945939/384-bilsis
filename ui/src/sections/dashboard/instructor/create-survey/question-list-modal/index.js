import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import QuestionTable from './table';

QuestionListModal.propTypes = {
    addQuestions: PropTypes.func.isRequired,
    existingQuestions: PropTypes.array.isRequired,
    isSubmitting: PropTypes.bool.isRequired
};

export default function QuestionListModal({ addQuestions, existingQuestions, isSubmitting }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const clearSelected = (isSuccess = false) => {
        if (isSuccess) {
            addQuestions(selectedQuestions);
        }
        setSelectedQuestions([]);
    };
    const onSuccessfulSelect = () => {
        clearSelected(true);
        handleClose();
    };

    const onUnsuccessfulSelect = () => {
        clearSelected();
        handleClose();
    };

    const toggleSelected = (id) => {
        if (selectedQuestions.includes(id)) {
            setSelectedQuestions(selectedQuestions.filter((questionId) => questionId !== id));
        } else {
            setSelectedQuestions([...selectedQuestions, id]);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={isSubmitting}>
                Add prepared question
            </Button>

            <Modal show={show} onHide={onUnsuccessfulSelect} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add prepared question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionTable questions={existingQuestions} toggleSelected={toggleSelected} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onUnsuccessfulSelect}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSuccessfulSelect}>
                        Select
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
