import React from 'react';
import { LOGO_URL, PROJECT_NAME, USER_TYPES_BY_VALUE } from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { PATHS } from '../../../routes/paths';

export default function SideBar() {
    const { user } = useAuth();

    const displayName = `${user.firstName} ${user.surname}`;

    let private_routes = [];

    switch (user.userType) {
        case USER_TYPES_BY_VALUE.Admin:
            private_routes = Object.values(PATHS.ADMIN);
            break;
        case USER_TYPES_BY_VALUE.Instructor:
            private_routes = Object.values(PATHS.INSTRUCTOR);
            break;
        case USER_TYPES_BY_VALUE.Student:
            private_routes = Object.values(PATHS.STUDENT);
            break;
        case USER_TYPES_BY_VALUE.DepartmentManager:
            private_routes = Object.values(PATHS.DEPARTMENT_MANAGER);
            break;
        default:
            break;
    }

    console.log(private_routes, user.type);

    return (
        <div
            className="card my-1 border-0 p-3 rounded-1 shadow-sm"
            style={{
                padding: '!important 0px',
                height: '93vh'
            }}
        >
            <div
                className="card-header border-0"
                style={{
                    backgroundColor: '#fff'
                }}
            >
                <img
                    alt="university-logo"
                    src={LOGO_URL}
                    style={{
                        height: 35,
                        marginRight: 10
                    }}
                />
                <span>
                    <strong>{PROJECT_NAME}</strong>
                </span>
            </div>
            <hr className="my-1" />
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src="https://picsum.photos/200/300"
                            style={{
                                borderRadius: '100%',
                                width: '40px',
                                height: '40px',
                                marginRight: '10px'
                            }}
                            alt="avatar"
                        />
                        <span>{displayName}</span>
                    </div>
                </li>
                <br />
                <ul className="list-group">
                    {private_routes.map((route) => (
                        <li className="list-group-item" key={route.path}>
                            <a
                                href={route.path}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                {route.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <br />
                {Object.values(PATHS.PROFILE).map((route) => (
                    <li className="list-group-item" key={route.path}>
                        <a
                            href={route.path}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                        >
                            {route.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
