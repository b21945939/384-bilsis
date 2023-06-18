export const PATHS = {
    ROOT: '/',
    // auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',

    PROFILE: {
        MANAGE_ACCOUNT: {
            path: '/dashboard/manage-account',
            label: 'Manage Account'
        },
        CHANGE_PASSWORD: {
            path: '/dashboard/change-password',
            label: 'Change Password'
        }
    },
    // dashboard
    STUDENT: {
        ENROLL_COURSES: {
            path: '/dashboard/student/enroll-course',
            label: 'Enroll Courses'
        }
    },
    ADMIN: {
        MANAGE_USERS: {
            path: '/dashboard/admin/manage-users',
            label: 'Manage Users'
        },
        STUDENT_LIST: {
            path: '/dashboard/admin/student-list',
            label: 'Student List'
        }
    },
    DEPARTMENT_MANAGER: {
        ASSIGN_INSTRUCTOR: {
            path: '/dashboard/department-manager/assign-instructor',
            label: 'Assign Instructor'
        }
    },
    INSTRUCTOR: {
        APPROVE_ENROLLMENT: {
            path: '/dashboard/instructor/approve-enrollment',
            label: 'Approve Enrollment'
        },
        CREATE_SURVEY: {
            path: '/dashboard/instructor/create-survey',
            label: 'Create Survey'
        },
        LIST_TRANSCRIPT: {
            path: '/dashboard/instructor/list-transcript',
            label: 'List Transcript'
        }
    },
    DASHBOARD: '/dashboard',
    // main
    NOT_FOUND: '/not-found',
    FORBIDDEN: '/forbidden'
};
