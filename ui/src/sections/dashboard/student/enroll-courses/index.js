import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../utils/axios';
import CreateEnrollModal from './create-enroll-modal';
import CourseTable from './table';

export default function EnrollCourse() {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        const getUserCourses = async () => {
            let response = null;
            try {
                response = await axios.get(`/course/student/${user.id}`);

                setSelectedCourses(response.data || []);
            } catch (error) {
                enqueueSnackbar('Failed to get user courses', { variant: 'error' });
                console.error(error);
            }
        };

        const getAvailableCourses = async () => {
            try {
                const response = await axios.get(`/course/available`);
                setAvailableCourses(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get available courses', { variant: 'error' });
            }
        };

        if (!availableCourses.length) {
            getAvailableCourses();
        }

        if (!selectedCourses.length) {
            getUserCourses();
        }
    }, []);

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <div className="row">
                    <div className="col-6">
                        <h3>Enroll Course</h3>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <CreateEnrollModal availableCourses={availableCourses} userCourses={selectedCourses} setUserCourses={setSelectedCourses} />
                    </div>
                </div>
                <div className="row mt-4">
                    <CourseTable courses={selectedCourses} />
                </div>
            </div>
        </div>
    );
}
