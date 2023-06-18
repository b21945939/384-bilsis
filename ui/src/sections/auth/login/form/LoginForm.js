import { Formik } from 'formik';
import $ from 'jquery';
import { useSnackbar } from 'notistack';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useNavigate } from 'react-router';
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

const loginSchema = Yup.object().shape({
    id: Yup.number().required('ID is required'),
    password: Yup.string().required('Password is required')
});

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
            await login(values.id, values.password);

            await sleep(1000);

            navigate(PATHS.DASHBOARD);
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Invalid ID or password', { variant: 'error' });
            resetForm();
        }
        setSubmitting(false);
    };
    return (
        <Formik initialValues={{ id: '', password: '' }} validationSchema={loginSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formLoginID">
                        <Form.Control type="number" placeholder="ID" isInvalid={!!errors.id} value={values.id} onChange={handleChange} name="id" />
                        <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
                    </Form.Group>

                    <InputGroup className="mb-4">
                        <Form.Control
                            id="spassw"
                            className="form-control"
                            isInvalid={!!errors.password}
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                        />
                        <InputGroup.Text>
                            <i onClick={hideOrShow} id="eye" className="fa fa-eye-slash" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </InputGroup>

                    <Button variant="primary" type="submit" className="btn btn-default my-2 submit-btn w-100">
                        {isSubmitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                        <span
                            style={{
                                marginLeft: 5
                            }}
                        >
                            Login
                        </span>
                    </Button>
       
                </Form>
            )}
        </Formik>
    );
}
