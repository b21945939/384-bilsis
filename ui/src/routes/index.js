import { Suspense, lazy } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import Loading from '../components/loading';
import { USER_TYPES_BY_VALUE } from '../config';
import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';
import GenericLayout from '../layouts/generic-layout';
import { PATHS } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
        <Suspense fallback={<Loading isDashboard={pathname.includes('/dashboard')} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: PATHS.ROOT,
            element: <Navigate to={PATHS.DASHBOARD} />,
            index: true
        },
        {
            path: '/auth',
            children: [
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                },
                {
                    path: 'forgot-password',
                    element: <ForgotPasswordPage />
                },
                {
                    path: 'reset-password',
                    element: <ResetPasswordPage />
                }
            ]
        },
        {
            path: '/dashboard',
            element: (
                <AuthGuard>
                    <GenericLayout />
                </AuthGuard>
            ),
            children: [
                {
                    path: '',
                    element: <DashboardPage />
                },
                {
                    path: 'profile',
                    element: <ProfilePage />
                },
                {
                    path: 'change-password',
                    element: <ChangePasswordPage />
                },
                {
                    path: 'manage-account',
                    element: <ManageAccountPage />
                }
            ]
        },
        {
            path: '/dashboard/student',
            element: (
                <AuthGuard>
                    <RoleGuard exptectedUserTypes={[USER_TYPES_BY_VALUE.Student]}>
                        <GenericLayout />
                    </RoleGuard>
                </AuthGuard>
            ),
            children: [
                {
                    path: 'enroll-course',
                    element: <EnrollCoursePage />
                }
            ]
        },
        {
            path: '/dashboard/department-manager',
            element: (
                <AuthGuard>
                    <RoleGuard exptectedUserTypes={[USER_TYPES_BY_VALUE.DepartmentManager]}>
                        <GenericLayout />
                    </RoleGuard>
                </AuthGuard>
            ),
            children: [
                {
                    path: 'assign-instructor',
                    element: <AssignInstructorPage />
                }
            ]
        },
        {
            path: '/dashboard/instructor',
            element: (
                <AuthGuard>
                    <RoleGuard exptectedUserTypes={[USER_TYPES_BY_VALUE.Instructor]}>
                        <GenericLayout />
                    </RoleGuard>
                </AuthGuard>
            ),
            children: [
                {
                    path: 'approve-enrollment',
                    element: <ApproveEnrollmentPage />
                },
                {
                    path: 'create-survey',
                    element: <CreateSurveyPage />
                },
                {
                    path: 'list-transcript',
                    element: <ListTranscriptPage />
                }
            ]
        },
        {
            path: '/dashboard/admin',
            element: (
                <AuthGuard>
                    <RoleGuard exptectedUserTypes={[USER_TYPES_BY_VALUE.Admin]}>
                        <GenericLayout />
                    </RoleGuard>
                </AuthGuard>
            ),
            children: [
                {
                    path: 'manage-users',
                    element: <ManageUsersPage />
                },
                {
                    path: 'student-list',
                    element: <StudentListPage />
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: PATHS.NOT_FOUND,
                    element: <NotFoundPage />
                },
                {
                    path: PATHS.FORBIDDEN,
                    element: <ForbiddenPage />
                }
            ]
        }
    ]);
}

// AUTH PAGES
const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const ForgotPasswordPage = Loadable(lazy(() => import('../pages/auth/ForgotPasswordPage')));
const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

const DashboardPage = Loadable(lazy(() => import('../pages/dashboard/DashboardPage')));
const ProfilePage = Loadable(lazy(() => import('../pages/dashboard/ProfilePage')));
const ChangePasswordPage = Loadable(lazy(() => import('../pages/dashboard/profile/ChangePasswordPage')));
const ManageAccountPage = Loadable(lazy(() => import('../pages/dashboard/profile/ManageAccountPage')));
const AssignInstructorPage = Loadable(lazy(() => import('../pages/dashboard/department-manager/AssignInstructorPage')));
const ApproveEnrollmentPage = Loadable(lazy(() => import('../pages/dashboard/instuctor/ApproveEnrollmentPage')));
const CreateSurveyPage = Loadable(lazy(() => import('../pages/dashboard/instuctor/CreateSurveyPage')));
const ListTranscriptPage = Loadable(lazy(() => import('../pages/dashboard/instuctor/ListTranscriptPage')));
const EnrollCoursePage = Loadable(lazy(() => import('../pages/dashboard/student/EnrollCoursePage')));

// ADMIN PAGES
const ManageUsersPage = Loadable(lazy(() => import('../pages/dashboard/admin/ManageUsersPage')));
const StudentListPage = Loadable(lazy(() => import('../pages/dashboard/admin/StudentListPage')));
// MAIN PAGES
const NotFoundPage = Loadable(lazy(() => import('../pages/NotFoundPage')));
const ForbiddenPage = Loadable(lazy(() => import('../pages/ForbiddenPage')));
