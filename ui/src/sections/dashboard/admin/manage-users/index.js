import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { USER_TYPES, USER_TYPES_BY_VALUE } from '../../../../config';
import axios from '../../../../utils/axios';
import SearchUserForm from './SearchUserForm';
import UpdateUserForm from './UpdateUserForm';

export default function ManageUser() {
    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState([]);
    const [userType, setUserType] = useState(USER_TYPES[3]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUsersByType = async () => {
            try {
                const response = await axios.get(`/user/all/${USER_TYPES_BY_VALUE[userType]}`);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Failed to get users', { variant: 'error' });
            }
        };

        if (userType) {
            getUsersByType();
        }
    }, [userType]);

    return (
        <div className="w-100 h-100 p-0 m-0 d-flex justify-content-center align-items-center">
            <div
                className="container bg-white p-5 m-4"
                style={{
                    minHeight: '700px',
                    minWidth: '700px'
                }}
            >
                <h3>Manage Accounts</h3>

                <div className="row py-3">
                    <SearchUserForm setUser={setUser} setUserType={setUserType} userType={userType} user={user} users={users} />
                </div>
                {user && (
                    <div className="row">
                        <UpdateUserForm user={user} setUser={setUser} />
                    </div>
                )}
            </div>
        </div>
    );
}
