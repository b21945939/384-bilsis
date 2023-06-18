import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { PATHS } from '../../../../routes/paths';
import { sleep } from '../../../../utils';
import axios from '../../../../utils/axios';

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('The email field is required')
});

export default function ForgotPasswordForm() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await axios.post('/user/sendtoken', values);

            enqueueSnackbar('Mail sent successfully', { variant: 'success' });

            await sleep(500);

            navigate(PATHS.RESET_PASSWORD);
        } catch (error) {
            console.log(error);

            enqueueSnackbar('Invalid email or could not send mail', { variant: 'error' });
        }
    };
    return (
        <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={onSubmit}>
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="w-100">
                    <div className="form-group mb-4">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            className="form-control"
                            placeholder="Enter your email"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
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
