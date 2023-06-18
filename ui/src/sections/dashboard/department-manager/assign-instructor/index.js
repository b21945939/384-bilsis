import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import _axios from '../../../../utils/axios';
import SearchInstructorForm from './SearchInstructor';
import SelectCourseModal from './select-course';
import CourseTable from './table';

export default function AssignInstructor() {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [emptyCourses, setEmptyCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getInstructors = async () => {
            try {
                const response = await _axios.get('/course/instructor/all');

                setInstructors(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error getting instructors', { variant: 'error' });
            }
        };

        if (!instructors.length) {
            getInstructors();
        }
    }, [instructors.length, enqueueSnackbar]);
    
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await _axios.get(`/courses/department/${selectedInstructor[0].departmentId}`);
            } catch (error) {
                console.error(error);
            }
        };

        const getEmptyCourses = async () => {
            try {
                const response = await _axios.get(`/empty-courses?instructorId=${selectedInstructor[0].id}`);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedInstructor?.length) {
            getCourses();
            getEmptyCourses();
        } else {
            setEmptyCourses([]);
            setCourses([]);
        }
    }, [selectedInstructor]);

    useEffect(() => {
        const getInstructors = async () => {
            try {
                const response = await _axios.get('/instructors');
                const instructors = response.data;
                setInstructors(instructors);
            } catch (error) {
                console.error(error);
            }
        };

        getInstructors();
    }, []);

    const addCourse = (id) => {
        console.log(id);
        const course = emptyCourses.find((course) => course.id === id);
        setCourses([...courses, course]);
        setEmptyCourses(emptyCourses.filter((course) => course.id !== id));
    };

    const deleteCourse = (id) => {
        const course = courses.find((course) => course.id === id);
        setCourses(courses.filter((course) => course.id !== id));
        setEmptyCourses([...emptyCourses, course]);
    };

    const onAssign = async () => {
        try {
            setLoading(true);
            await _axios.post('/assign-instructor', {
                instructorId: selectedInstructor[0].id,
                courseIds: courses.map((course) => course.id)
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <h3>Assign Instructor</h3>

                <div className="row py-3">
                    <SearchInstructorForm
                        setSelectedInstructor={setSelectedInstructor}
                        selectedInstructor={selectedInstructor}
                        instructors={instructors}
                    />
                </div>

                <SelectCourseModal addCourse={addCourse} emptyCourses={emptyCourses} />

                <div className="row py-3">
                    <CourseTable courses={courses} onCourseDelete={deleteCourse} />
                </div>

                <div className="row py-3">
                    <button
                        className="btn btn-primary"
                        style={{
                            width: 240,
                            margin: '0 1rem'
                        }}
                        onClick={onAssign}
                    >
                        {loading && (
                            <Spinner
                                animation="border"
                                style={{
                                    marginRight: 10,
                                    width: 20,
                                    height: 20
                                }}
                            />
                        )}
                        Add All Listed Courses
                    </button>
                </div>
            </div>
        </div>
    );
}
