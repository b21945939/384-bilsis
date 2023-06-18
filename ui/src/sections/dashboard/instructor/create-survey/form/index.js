import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { QUESTION_TYPES } from '../../../../../config';
import useAuth from '../../../../../hooks/useAuth';
import axios from '../../../../../utils/axios';
import CreateQuestionModal from '../create-question-modal';
import PreviewSurveyModal from '../preview-survey-modal';
import QuestionListModal from '../question-list-modal';

CreateSurveyForm.propTypes = {
    courses: PropTypes.array.isRequired
};

export default function CreateSurveyForm({ courses, existingQuestions }) {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const [questionType, setQuestionType] = useState(QUESTION_TYPES.Selection.value);
    const [questions, setQuestions] = useState([]);

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const payload = {
                courseId: values.courseId,
                questions: questions.map((question) => question.id),
                instructorId: user.id
            };
            await axios.post('/survey/survey', payload);
            enqueueSnackbar('Survey created successfully', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Survey created successfully', { variant: 'success' });
        }
        setSubmitting(false);
    };

    const addQuestions = (requestedQuestions) => {
        const questionIds = questions.map((question) => question.id);
        requestedQuestions = requestedQuestions.filter((question) => !questionIds.includes(question.id));
        setQuestions([...questions, ...requestedQuestions]);
    };

    console.log(questions);
    return (
        <div>
            <Formik
                initialValues={{
                    courseId: courses[0].id
                }}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row my-4">
                            <div className="col-6">
                                <select
                                    className="form-select"
                                    value={values.courseId}
                                    onChange={handleChange}
                                    aria-label="Default select example"
                                    name="courseId"
                                    defaultValue={courses[0].id}
                                >
                                    <option selected>Choose a course</option>
                                    {courses.map((course) => (
                                        <option value={course.id}>{course.courseName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <QuestionListModal isSubmitting={isSubmitting} addQuestions={addQuestions} existingQuestions={existingQuestions} />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    defaultValue={QUESTION_TYPES.Selection.value}
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                >
                                    {Object.values(QUESTION_TYPES).map((questionType) => (
                                        <option value={questionType.value}>{questionType.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <CreateQuestionModal questionType={questionType} isSubmitting={isSubmitting} addQuestions={addQuestions} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <PreviewSurveyModal questions={questions} />
                            </div>

                            <div className="col-6">
                                <button className="btn btn-primary w-100" disabled={isSubmitting}>
                                    Create Survey
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
