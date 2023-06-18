import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from '../../../utils/axios';

const changePasswordShape = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

export default function ChangePasswordPage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            const payload = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            };
            await axios.patch('/user/changepassword', payload);
            enqueueSnackbar('Password changed successfully', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to change password', { variant: 'error' });
        }
    };

    const containerStyle = {
        background: 'white',
        padding: '30rem',
        minHeight: '700px',
        marginTop: '10px'
        // Increase the height as needed
    };

    const buttonStyle = {
        margin: '25px 0px 75px 0px',
        width: '625px'
    };
    return (
        <Container className="bg-white p-4" style={containerStyle}>
            <h3>Change Password</h3>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                validationSchema={changePasswordShape}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <Form.Group controlId="newPassword1">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        name="newPassword"
                                        isInvalid={!!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group controlId="oldPassword">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Old Password"
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        name="oldPassword"
                                        isInvalid={!!errors.oldPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Group controlId="newPassword2">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        name="confirmPassword"
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Button variant="primary" type="submit" style={buttonStyle}>
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
