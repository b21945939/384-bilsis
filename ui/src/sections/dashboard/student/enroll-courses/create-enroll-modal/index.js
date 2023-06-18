import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import useAuth from '../../../../../hooks/useAuth';
import axios from '../../../../../utils/axios';
import CourseTable from './table';

CreateEnrollModal.propTypes = {
    availableCourses: PropTypes.array.isRequired
};

export default function CreateEnrollModal({ availableCourses, userCourses, setUserCourses }) {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const onSuccessfulSelect = async () => {
        try {
            await axios.patch(`/course/student/${user.id}/add`, [...selectedCourses]);
            enqueueSnackbar('Successfully enrolled courses', { variant: 'success' });
            setSelectedCourses([]);
            const userCourseIds = userCourses.map((course) => course.id);
            setUserCourses([...userCourses, ...selectedCourses.filter((course) => !userCourseIds.includes(course))]);
        } catch (error) {
            enqueueSnackbar('Failed to enroll courses', { variant: 'error' });
        }
        handleClose();
    };

    const onUnsuccessfulSelect = async () => {
        setSelectedCourses([]);
        handleClose();
    };

    const toggleSelected = (id) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(selectedCourses.filter((questionId) => questionId !== id));
            enqueueSnackbar('Successfully removed course', { variant: 'success' });
        } else {
            setSelectedCourses([...selectedCourses, id]);
            enqueueSnackbar('Successfully added course', { variant: 'success' });
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Select course
            </Button>

            <Modal show={show} onHide={onUnsuccessfulSelect} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CourseTable courses={availableCourses} toggleSelected={toggleSelected} selectedCourses={selectedCourses} />
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
