import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from '../../../../../utils/axios';
import TranscriptTable from './table';

TranscriptViewModal.propTypes = {
    student: PropTypes.object.isRequired
};

export default function TranscriptViewModal({ student, setStudent }) {
    const { enqueueSnackbar } = useSnackbar();
    const [show, setShow] = useState(false);
    const [transcript, setTranscript] = useState(null);
    const handleClose = () => {
        setStudent(null);
        setShow(false);
    };

    useEffect(() => {
        const getTranscript = async () => {
            try {
                await axios.patch(`/course/transcript/${student.studentId}`);

                const response = await axios.get(`/course/transcript/${student.studentId}`);
                setShow(true);
                const { courses, transcript } = response.data;
                setTranscript({ ...transcript, courses });
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get transcript', { variant: 'error' });
            }
        };

        if (student && !show) {
            getTranscript();
        }
    }, [show, student]);

    console.log(transcript)
    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transcript</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TranscriptTable transcript={transcript} />
                </Modal.Body>
            </Modal>
        </>
    );
}
