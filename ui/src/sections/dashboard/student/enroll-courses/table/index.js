import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CourseTablePagination from './CourseTablePagination';

CourseTable.propTypes = {
    courses: PropTypes.array,
    toggleSelected: PropTypes.func
};

export default function CourseTable({ courses }) {
    const [currentPage, setCurrentPage] = useState(1);

    const calculateIndex = (currentPage) => {
        const length = courses.length;

        if (length < 5) {
            return [0, length - 1];
        } else if (currentPage * 5 > length) {
            return [length - 5, length - 1];
        } else {
            return [currentPage * 5 - 5, currentPage * 5 - 1];
        }
    };

    const [start, end] = calculateIndex(currentPage);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Quota</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Class</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.slice(start, end + 1).map((course) => (
                        <tr key={course.id}>
                            <th scope="row">{course.id}</th>
                            <td>{course.courseName}</td>
                            <td>{course.quota}</td>
                            <td>{course.credit}</td>
                            <td>{course.class}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CourseTablePagination courses={courses} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
}
