import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { QUESTION_TYPES } from '../../../../../../config';
import axios from '../../../../../../utils/axios';

const createQuestionShape = Yup.object().shape({
    sentence: Yup.string().required('Question is required')
});

CreateQuestionForm.propTypes = {
    questionType: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    addQuestions: PropTypes.func.isRequired
};

export default function CreateQuestionForm({ questionType, handleClose, addQuestions }) {
    const [optionCount, setOptionCount] = useState(0);

    const onOptionAdd = () => {
        setOptionCount(optionCount + 1);
    };

    const handleSubmit = async (values) => {
        try {
            const options = new Array(optionCount).fill(0).map((_, idx) => values[`option_${idx}`]);

            const payload = {
                id: 0,
                sentence: values.sentence,
                options: options
            };

            const response = await axios.post('/survey/question', payload);

            response.data.options = response.data.options.filter((option) => option !== '');
            addQuestions([response.data]);
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    const options = new Array(optionCount).fill(0);

    return (
        <Formik
            initialValues={{
                sentence: '',
                option: '',
                ...options.reduce((arr, _, idx) => ({ ...arr, [`option_${idx}`]: '' }), {})
            }}
            onSubmit={handleSubmit}
            validationSchema={createQuestionShape}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="sentence">Question</label>
                        <input
                            type="text"
                            className="form-control mb-1"
                            id="sentence"
                            placeholder="Enter question"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sentence}
                        />
                        {errors.sentence && touched.sentence && <div className="text-danger">{errors.sentence}</div>}
                    </div>

                    {parseInt(questionType) === QUESTION_TYPES.Selection.value && (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 mb-3" onClick={() => onOptionAdd(values.option, setFieldValue)}>
                                        Add option
                                    </button>
                                </div>
                            </div>
                            {options.map((option, index) => (
                                <div className="form-group">
                                    <label htmlFor="option">{`Option ${index + 1}`}</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        name={`option_${index}`}
                                        id="option"
                                        placeholder="Enter options"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.error}
                                    />
                                    {!!errors[`option_${index}`] && <div className="text-danger">{errors[`option_${index}`]}</div>}
                                </div>
                            ))}
                        </>
                    )}
                    <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    );
}
