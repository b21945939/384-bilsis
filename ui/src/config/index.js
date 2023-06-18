export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PROJECT_NAME = 'ICES4HU';

export const HOST_API = IS_DEVELOPMENT ? 'https://localhost:7162' : process.env.REACT_APP_HOST_API;

export const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/tr/2/28/Hacettepe_%C3%9Cniversitesi_Logosu.svg';

export const USER_TYPES = {
    1: 'Admin',
    2: 'Instructor',
    3: 'Student',
    4: 'DepartmentManager'
};

export const USER_TYPES_BY_VALUE = {
    Admin: 1,
    Instructor: 2,
    Student: 3,
    DepartmentManager: 4
};

export const QUESTION_TYPES = {
    Selection: {
        value: 1,
        name: 'Selection'
    },
    TEXT: {
        value: 2,
        name: 'Text'
    }
};
