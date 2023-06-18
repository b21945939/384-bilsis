import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Iconify from '../../../../../../components/iconify';
import TablePagination from '../../../../department-manager/assign-instructor/table/TablePagination';

CourseTable.propTypes = {
    courses: PropTypes.array,
    toggleSelected: PropTypes.func,
    selectedCourses: PropTypes.array
};

export default function CourseTable({ courses, toggleSelected, selectedCourses }) {
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
                        <th scope="col">Course ID</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Quote</th>
                        <th scope="col">Credit</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.slice(start, end + 1).map((course) => (
                        <tr key={course.id}>
                            <th scope="row">{course.id}</th>
                            <td>{course.courseName}</td>
                            <td>{course.quote}</td>
                            <td>{course.credit}</td>
                            <td>
                                <div
                                    onClick={() => toggleSelected(course.id)}
                                    style={{
                                        cursor: 'pointer',
                                        width: 24,
                                        height: 24
                                    }}
                                >
                                    <Iconify
                                        icon={selectedCourses.includes(course.id) ? 'fluent:delete-16-filled' : 'icon-park-outline:add'}
                                        style={{
                                            color: selectedCourses.includes(course.id) ? 'red' : 'green',
                                            width: 24,
                                            height: 24
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination setCurrentPage={setCurrentPage} currentPage={currentPage} courses={courses} />
        </>
    );
}
