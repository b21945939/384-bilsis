import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import * as Yup from 'yup';
import { USER_TYPES_BY_VALUE } from '../../../../config';
import _axios from '../../../../utils/axios';
import { sleep } from '../../../../utils/index';

const updateSchema = Yup.object().shape({
    studentId: Yup.number().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required')
});

UpdateUserForm.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired
};

export default function UpdateUserForm({ user, setUser }) {
    const { enqueueSnackbar } = useSnackbar();
    const [isBanSubmitting, setBanSubmitting] = useState(false);

    const onUserUpdate = async (value) => {
        try {
            await _axios.patch('/user/changeinfo', {
                address: value.address,
                phoneNumber: value.phoneNumber
            });
            enqueueSnackbar('User updated successfully', { variant: 'success' });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('User update failed', { variant: 'error' });
        }
    };

    const onUserBan = async () => {
        try {
            setBanSubmitting(true);

            await _axios.patch('/user/ban', {
                studentId: user.id
            });
            enqueueSnackbar('User banned successfully', { variant: 'success' });
            setUser({ ...user, isBanned: !user.isBanned });
            sleep(500);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('User ban failed', { variant: 'error' });
        }
    };

    return (
        <Formik
            initialValues={{ studentId: user.id, address: '', phoneNumber: '', email: user.email }}
            validationSchema={updateSchema}
            onSubmit={onUserUpdate}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control type="text" value="<student_id>" disabled name="studentId" />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control type="email" value="example@hacettepe.edu.tr" disabled name="email" />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control type="text" placeholder="Address" name="address" value={values.address} onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="+90 (123) 456 78 90"
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <Button
                                variant="primary"
                                block
                                type="submit"
                                className="w-100"
                                style={{
                                    marginTop: 20
                                }}
                            >
                                {isSubmitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                                <span
                                    style={{
                                        marginLeft: 5
                                    }}
                                >
                                    Change Info
                                </span>
                            </Button>
                            {user.userType === USER_TYPES_BY_VALUE.Student && (
                                <Button
                                    variant={user.isBanned ? 'success' : 'danger'}
                                    block
                                    type="submit"
                                    className="w-100"
                                    onClick={onUserBan}
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    {isBanSubmitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                                    <span
                                        style={{
                                            marginLeft: 5
                                        }}
                                    >
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
