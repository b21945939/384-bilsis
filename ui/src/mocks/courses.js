export const MOCK_COURSES = [
    {
        id: 1,
        courseCode: 'CSE 101',
        courseName: 'Introduction to Computer Engineering',
        credit: 3,
        class: 'A',
        quota: 50,
        instructorId: 1,
        departmentId: 1
    },
    {
        id: 2,
        courseCode: 'CSE 102',
        courseName: 'Introduction to Software Engineering',
        credit: 3,
        class: 'A',
        quota: 50,
        instructorId: 1,
        departmentId: 1
    },
    {
        id: 3,
        courseCode: 'CSE 103',
        courseName: 'Introduction to Computer Science',
        credit: 3,
        class: 'A',
        quota: 50,
        instructorId: 1,
        departmentId: 1
    }
];

export const MOCK_TRANSCRIPT = [
    {
        studentId: 1,
        totalCredit: 3,
        gpa: 3.5,
        courses: [
            {
                id: 1,
                grade: 3.5,
                courseCode: 'CSE 101',
                courseName: 'Introduction to Computer Engineering',
                credit: 3
            },
            {
                id: 2,
                grade: 3.5,
                courseCode: 'CSE 102',
                courseName: 'Introduction to Software Engineering',
                credit: 3
            }
        ]
    },
    {
        studentId: 2,
        totalCredit: 3,
        gpa: 3.5,
        courses: [
            {
                id: 1,
                grade: 3.5
            },
            {
                id: 2,
                grade: 3.5
            },
            {
                id: 3,
                grade: 3.5
            }
        ]
    }
];

export const MOCK_QUESTIONS = [
    {
        id: 1,
        sentence: 'Which one is not a programming language?',
        options: ['Java', 'C++', 'C#', 'HTML']
    },
    {
        id: 2,
        sentence: 'Which expression is true?',
        options: ['1 + 1 = 2', '1 + 1 = 3', '1 + 1 = 4', '1 + 1 = 5']
    },
    {
        id: 3,
        sentence: 'Which one is not a student?',
        options: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma']
    }
];

export const MOCK_SURVEYS = [
    {
        id: 1,
        studentId: 1,
        surveyId: 1,
        answers: [0, 1, 2]
    }
];

export const MOCK_DEPARTMENTS = [
    {
        id: 1,
        departmentName: 'Computer Engineering',
        departmentManagerId: 1
    },
    {
        id: 2,
        departmentName: 'Software Engineering',
        departmentManagerId: 2
    }
];

export const MOCK_STUDENTS = [
    {
        id: 1,
        name: 'Ahmet',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 2,
        name: 'Mehmet',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: false
    },
    {
        id: 3,
        name: 'Ayşe',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 4,
        name: 'Fatma',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: false
    },
    {
        id: 5,
        name: 'Fatma',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: false
    },
    {
        id: 6,
        name: 'Ersin',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: false
    },
    {
        id: 7,
        name: 'Resul',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 8,
        name: 'Resul',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 9,
        name: 'Resul',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 10,
        name: 'Resul',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    },
    {
        id: 11,
        name: 'Resul',
        surname: 'Yılmaz',
        email: '',
        password: '',
        departmentId: 1,
        isEnrolled: true
    }
];
