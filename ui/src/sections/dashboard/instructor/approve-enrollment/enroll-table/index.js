import React, { useState } from 'react';
import Iconify from '../../../../../components/iconify';
import StudentPagination from './StudentPagination';

export default function EnrollTable({ title, students, isEnrolled, discardStudent }) {
    const [currentPage, setCurrentPage] = useState(1);

    const calculateIndex = (currentPage) => {
        const length = students.length;

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
        <div className="container text-center">
            <h5>{title}</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">Student Name</th>
                    </tr>
                </thead>
                <tbody>
                    {students.slice(start, end + 1).map((student) => (
                        <tr key={student.studentId} className="py-1">
                            <th scope="row">{student.studentId}</th>
                            <td>{`${student.firstName} ${student.surName}`}</td>
                            <td>
                                <div
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => discardStudent(student.studentId)}
                                >
                                    <Iconify
                                        icon={isEnrolled ? 'ep:delete-filled' : 'icon-park-outline:add'}
                                        style={{
                                            width: 14,
                                            color: isEnrolled ? 'red' : 'green'
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <StudentPagination students={students} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
}
