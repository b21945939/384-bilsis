import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import CreateSurveyForm from './form';

export default function CreateSurvey() {
    const [courses, setCourses] = useState([]);
    const [existingQuestions, setExistingQuestions] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`/course/instructorcourse`);
                setCourses(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const getQuestions = async () => {
            try {
                const response = await axios.get(`/course/questions`);
                setExistingQuestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (!courses.length) {
            getCourses();
        }
        if (!existingQuestions.length) {
            getQuestions();
        }
    }, [courses, existingQuestions]);

    if (!courses.length) {
        return null;
    }

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <h3>Create Survey</h3>
                <div className="container">
                    <CreateSurveyForm courses={courses} existingQuestions={existingQuestions} />
                </div>
            </div>
        </div>
    );
}
