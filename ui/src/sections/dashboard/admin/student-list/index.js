import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import _axios from '../../../../utils/axios';
import SearchUserForm from './SearchUserForm';
import UserTable from './table';

export default function StudentList() {
    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await _axios.get('/user/all/student');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get users', { variant: 'error' });
            }
        };

        getUsers();
    }, [selectedUsers]);

    return (
        <div
            className="card shadow-sm border-0 h-100 p-5 m-4"
            style={{
                height: 'calc(100vh - 120px)',
                backgroundColor: 'white'
            }}
        >
            <h3>Student List</h3>
            <div className="container py-3 px-0 m-0 mb-4">
                <SearchUserForm setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} users={users} />
            </div>
            <div className="container py-3 px-0 m-0">
                <UserTable users={users} />
            </div>
        </div>
    );
}
