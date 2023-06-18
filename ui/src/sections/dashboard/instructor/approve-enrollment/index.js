import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { sleep } from '../../../../utils/index';
import EnrollTable from './enroll-table';

export default function ApproveEnrollment() {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get('/course/instructorcourse');

                setCourses(response.data);

                // set default course id
                if (response.data.length) {
                    setCourseId(response.data[0].id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (!courses.length) {
            getCourses();
        }
    }, []);

    console.log(courseId)
    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await axios.get(`/course/students/${courseId}`);

                setStudents(response.data);

                // set default course id
                // if (response.data.length) {
                //     setCourseId(response.data[0].id);
                // }
            } catch (error) {
                console.error(error);
            }
        };

        if (courseId) {
            getStudents();
        }
    }, [courseId]);

    const discardStudent = (studentId) => {
        setStudents(
            students.map((student) => {
                if (student.studentId === studentId) {
                    return {
                        ...student,
                        isEnrolled: !student.isEnrolled
                    };
                }
                return student;
            })
        );
    };


    const onSubmit = async () => {
        try {
            setLoading(true);
            await axios.patch('/course/approve', {
                courseId,
                studentIds: students.filter((student) => student.isEnrolled).map((student) => student.studentId)
            });

            await sleep(500);

            enqueueSnackbar('Approved successfully', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to approve', { variant: 'error' });
        }
        setLoading(false);
    };

    console.log(students)
    
    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <h3>Approve Enrollment</h3>
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
                        <EnrollTable
                            title="Pending Students"
                            students={students.filter((student) => !student.isEnrolled)}
                            isEnrolled={false}
                            discardStudent={discardStudent}
                        />
                    </div>
                    <div className="col-6">
                        <EnrollTable
                            title="Enrolled Students"
                            students={students.filter((student) => student.isEnrolled)}
                            isEnrolled={true}
                            discardStudent={discardStudent}
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-6">
                        <button type="button" className="btn btn-primary w-100" onClick={onSubmit}>
                            {loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />}
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
