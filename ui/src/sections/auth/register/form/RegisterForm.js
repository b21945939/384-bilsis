import { Formik } from 'formik';
import $ from 'jquery';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router';
import _ from 'underscore';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
import { PATHS } from '../../../../routes/paths';
import { sleep } from '../../../../utils';

function hideOrShow() {
    if ($('#spassw').attr('type') === 'password') {
        $('#spassw').attr('type', 'text');
        $('#eye').attr('class', 'fa fa-eye');
    } else {
        $('#spassw').attr('type', 'password');
        $('#eye').attr('class', 'fa fa-eye-slash');
    }
}

const userTypes = {
    ADMIN: '1',
    INSTRUCTOR: '2',
    DEPARTMENT_MANAGER: '3',
    STUDENT: '4'
};

// Schema for yup
const registerSchema = Yup.object().shape({
    id: Yup.number().required('Student Number is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    type: Yup.string().oneOf(_.values(userTypes)).required('User type is required')
});

export default function RegisterForm() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
            const email = values.email + '@hacettepe.edu.tr';

            await register(parseInt(values.id), email, values.password, parseInt(values.type));

            await sleep(500);

            navigate(PATHS.LOGIN);
        } catch (err) {
            console.log(err);
        }
        setSubmitting(false);
    };

    return (
        <Formik initialValues={{ id: '', email: '', type: '1', password: '' }} validationSchema={registerSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicID">
                        <Form.Control
                            className="form-control"
                            type="number"
                            placeholder="Student ID"
                            name="id"
                            value={values.id}
                            onChange={handleChange}
                            isInvalid={!!errors.id}
                        />
                        <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
                    </Form.Group>

                    <InputGroup className="mb-4">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <InputGroup.Text>@hacettepe.edu.tr</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <Form.Control
                            id="spassw"
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />

                        <InputGroup.Text>
                            <i onClick={hideOrShow} id="eye" className="fa fa-eye-slash" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup>
                        <Form.Select
                            className="form-control mb-4"
                            aria-label="Select user type"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                        >
                            <option value="1">Admin</option>
                            <option value="2">Instructor</option>
                            <option value="3">Student</option>
                            <option value="4">DepartmentManager</option>
                        </Form.Select>
                    </InputGroup>
                    <Button variant="primary" type="submit" className="btn btn-default my-2 submit-btn mx-auto d-block">
                        {isSubmitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
