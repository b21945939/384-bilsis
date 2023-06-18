import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Iconify from '../../../../../components/iconify';
import TablePagination from './TablePagination';

CourseTable.propTypes = {
    courses: PropTypes.array,
    onCourseDelete: PropTypes.func
};

export default function CourseTable({ courses, onCourseDelete }) {
    const [currentPage, setCurrentPage] = useState(1);

    const calculateIndex = (currentPage) => {
        const length = courses.length;

        if (length < 10) {
            return [0, length - 1];
        } else if (currentPage * 10 > length) {
            return [length - 10, length - 1];
        } else {
            return [currentPage * 10 - 10, currentPage * 10 - 1];
        }
    };

    const [start, end] = calculateIndex(currentPage);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Class</th>
                        <th scope="col">Quota</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.slice(start, end + 1).map((course) => (
                        <tr key={course.id}>
                            <th scope="row">{course.courseCode}</th>
                            <td>{course.courseName}</td>
                            <td>{course.credit}</td>
                            <td>{course.class}</td>
                            <td>{course.quota}</td>
                            <td>
                                <Iconify
                                    icon="mdi:delete"
                                    onClick={() => onCourseDelete(course.id)}
                                    cursor="pointer"
                                    style={{
                                        color: '#0A5ED7',
                                        width: '1.5rem',
                                        height: '1.5rem'
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination setCurrentPage={setCurrentPage} currentPage={setCurrentPage} courses={courses} />
        </>
    );
}
