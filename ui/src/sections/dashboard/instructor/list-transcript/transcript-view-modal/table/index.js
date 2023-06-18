import PropTypes from 'prop-types';
import React from 'react';

TranscriptTable.propTypes = {
    transcript: PropTypes.shape({
        gpa: PropTypes.number,
        grades: PropTypes.arrayOf(PropTypes.string),
        totalCredit: PropTypes.number
    })
};

export default function TranscriptTable({ transcript }) {
    return (
        <div className="text-center">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {transcript.courses.map((course) => (
                        <tr key={course.courseCode}>
                            <td>{course.courseCode}</td>
                            <td>{course.courseName}</td>
                            <td>{course.credit}</td>
                            <td>{course.grade}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th id="total" colspan="2">
                            Total :
                        </th>
                        <td>{transcript.totalCredit}</td>
                        <td>{transcript.totalGrade}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
