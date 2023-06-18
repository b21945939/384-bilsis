import { USER_TYPES_BY_VALUE } from '../config';

export const MOCK_INSTRUCTORS = [
    {
        id: 1,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'instructor1@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Instructor,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1,
        headedBy: 1
    },
    {
        id: 2,
        firstName: 'Jane Doe',
        surname: 'Doe',
        email: 'instructor2@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Instructor,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1,
        headedBy: 1
    },
    {
        id: 3,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'instructor3@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Instructor,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1,
        headedBy: 1
    }
];

export const MOCK_STUDENTS = [
    {
        id: 1,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'student1@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Student,
        isBanned: false,
        address: 'Ankara',
        isGraduated: false,
        instructorId: 1,
        studentNumber: 1
    }
];

export const MOCK_DEPARTMENT_MANAGERS = [
    {
        id: 1,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'department_manager1@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.DepartmentManager,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1
    },
    {
        id: 2,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'department_manager2@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Admin,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1
    }
];

export const MOCK_ADMINS = [
    {
        id: 1,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'student1@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Admin,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1
    },
    {
        id: 2,
        firstName: 'John Doe',
        surname: 'Doe',
        email: 'admin2@hacettepe.edu.tr',
        password: '',
        phone: '123456789',
        userType: USER_TYPES_BY_VALUE.Admin,
        isBanned: false,
        address: 'Ankara',
        departmentId: 1
    }
];
