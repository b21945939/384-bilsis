import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { USER_TYPES_BY_VALUE } from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { sleep } from '../../../utils';
import axios from '../../../utils/axios';
import TranscriptViewModal from '../../../sections/dashboard/instructor/list-transcript/transcript-view-modal';

const updateAccountShape = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required')
});

export default function ManageAccountPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [student, setStudent] = useState(null);
    const { user } = useAuth();
    const containerStyle = {
        background: 'white',
        padding: '30rem',
        minHeight: '700px',
        marginTop: '10px'
        // Increase the height as needed
    };

    const transcriptStyle = {
        marginLeft: '647px',
        marginTop: '30px',
        width: '625px'
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const payload = {
                address: values.address,
                phoneNumber: values.phoneNumber
            };

            await axios.patch('/user/changeinfo', payload);

            enqueueSnackbar('Account updated successfully', { variant: 'success' });

            await sleep(500);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to update account', { variant: 'error' });
        }
        setSubmitting(false);
    };

    const onToggleTranscript = async () => {
        if (student) {
            setStudent(null);
        } else if (user.userType === USER_TYPES_BY_VALUE.Student) {
            setStudent(user);
        }
    };

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <Container className="bg-white p-4" style={containerStyle}>
                <TranscriptViewModal student={student} setStudent={setStudent} />
                <h3>Manage Account</h3>
                <Formik initialValues={{ address: '', phoneNumber: '' }} validationSchema={updateAccountShape} onSubmit={onSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text" value={user.id} disabled />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Control type="email" value={user.email} disabled />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Address"
                                            value={values.address}
                                            onChange={handleChange}
                                            name="address"
                                            isInvalid={!!errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="+90 (123) 456 78 90"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            isInvalid={!!errors.phoneNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <Button variant="primary" className="w-100 mt-4" type="submit">
                                        {isSubmitting && (
                                            <span
                                                className="spinner-border spinner-border-sm mr-2"
                                                role="status"
                                                aria-hidden="true"
                                                disabled={isSubmitting}
                                            ></span>
                                        )}
                                        Change Info
                                    </Button>
                                </div>
                            </div>
                            {user.userType === USER_TYPES_BY_VALUE.Student && (
                                <div className="row">
                                    <div className="col">
                                        <Button variant="primary" block style={transcriptStyle} onClick={onToggleTranscript}>
                                            Transcript
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}
