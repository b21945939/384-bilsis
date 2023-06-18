import PropTypes from 'prop-types';
import React from 'react';

UserTable.propTypes = {
    users: PropTypes.array
};

export default function UserTable({ users }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Student ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Email</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <th scope="row">{user.studentId}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <span className="badge text-bg-dark">{user.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
