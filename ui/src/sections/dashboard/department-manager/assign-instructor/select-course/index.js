import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function SelectCourseModal({ emptyCourses, addCourse }) {
    const [show, setShow] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(emptyCourses[0]?.id);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSuccessfulSelect = () => {
        if (!selectedCourse) return;
        addCourse(parseInt(selectedCourse));
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Select Course
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select onChange={(e) => setSelectedCourse(e.target.value)}>
                        {emptyCourses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.courseCode}
                            </option>
                        ))}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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
