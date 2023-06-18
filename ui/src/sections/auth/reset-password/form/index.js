import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { PATHS } from '../../../../routes/paths';
import { sleep } from '../../../../utils';
import axios from '../../../../utils/axios';

const resetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('The password field is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    token: Yup.string().required('The token field is required')
});

export default function ResetPasswordForm() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const payload = {
                password: values.password,
                token: parseInt(values.token)
            };
            await axios.post(`/user/reset`, payload);
            enqueueSnackbar('Password reset successfully', { variant: 'success' });
            await sleep(500);
            navigate(PATHS.LOGIN);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Password reset failed', { variant: 'error' });
        }
    };
    return (
        <Formik initialValues={{ password: '', confirmPassword: '', token: '' }} validationSchema={resetPasswordSchema} onSubmit={onSubmit}>
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="w-100">
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            className="form-control"
                            placeholder="Enter your password"
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={values.confirmPassword}
                            className="form-control"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            name="token"
                            onChange={handleChange}
                            value={values.token}
                            className="form-control"
                            placeholder="Enter your token"
                        />
                        {errors.token && <small className="text-danger">{errors.token}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
                        Send
                    </button>
                </form>
            )}
        </Formik>
    );
}
