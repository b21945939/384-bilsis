import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { MOCK_COURSES, MOCK_STUDENTS } from '../../../../mocks/courses';
import axios from '../../../../utils/axios';
import ListTranscriptTable from './table';
import TranscriptViewModal from './transcript-view-modal';

export default function ListTranscript() {
    const { enqueueSnackbar } = useSnackbar();
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [courseId, setCourseId] = useState(courses[0].id);
    const [students, setStudents] = useState(MOCK_STUDENTS);
    const [student, setStudent] = useState(null);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get('/course/instructorcourse');
                setCourses(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get courses', { variant: 'error' });
            }
        };

        if (!courses.length) {
            getCourses();
        }
    }, [courses.length]);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await axios.get(`/course/students/${courseId}`);
                setStudents(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get students', { variant: 'error' });
            }
        };

        if (courseId) {
            getStudents();
        }
    }, [courseId]);

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <TranscriptViewModal student={student} setStudent={setStudent} />
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <h3>List Transcript</h3>
                <div className="row">
                    <div className="col-6">
                        <select
                            className="form-select"
                            onChange={(e) => setCourseId(e.target.value)}
                            aria-label="Default select example"
                            name="courseId"
                            defaultValue={courseId}
                        >
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-6">
                        <button type="button" className="btn btn-primary">
                            Get list of students
                        </button>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-6">
                        <ListTranscriptTable title="Enrolled students" students={students} setStudent={setStudent} />
                    </div>
                </div>
            </div>
        </div>
    );
}
