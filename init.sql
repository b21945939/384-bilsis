SELECT 'CREATE DATABASE bilsis'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'bilsis')\gexec

\c bilsis;

-- Create the "UserType" table
CREATE TABLE UserType (
    id Serial PRIMARY KEY,
    "Role" VARCHAR(20) NOT NULL
);

-- Create the User table
CREATE TABLE "user" (
    id Serial PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    Surname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    UserType INTEGER NOT NULL,
    Address VARCHAR(255) NOT NULL,
    isBanned BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (UserType) REFERENCES UserType(id)
);

-- Create the "Department" table
CREATE TABLE Department (
    id Serial PRIMARY KEY,
    DepartmentName VARCHAR(255),
    DeparmentManagerID INTEGER NOT NULL,
    FOREIGN KEY (DeparmentManagerID) REFERENCES "user"(id)
);


-- Create the DeparmentManager table
CREATE TABLE DeparmentManager (
    UserID INTEGER NOT NULL,
    DepartmentId INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES "user"(id),
    FOREIGN KEY (DepartmentId) REFERENCES Department(id)
);

-- Create the "Instructor" table
CREATE TABLE Instructor (
    id Integer PRIMARY KEY,
    DepartmentId INTEGER,
    headedBy INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES "user"(id),
    FOREIGN KEY (headedBy) REFERENCES "user"(id),
    FOREIGN KEY (DepartmentId) REFERENCES Department(id)
);

-- Create the "Course" table
CREATE TABLE Course (
    id Integer PRIMARY KEY,
    CourseCode VARCHAR(255) NOT NULL,
    CourseName VARCHAR(255) NOT NULL,
    Credit INTEGER NOT NULL,
    Class VARCHAR(255) NOT NULL,
    Quota INTEGER NOT NULL,
    DepartmentId INTEGER NOT NULL,
    InstructorID INTEGER NOT NULL,
    FOREIGN KEY (InstructorID) REFERENCES Instructor(id),
    FOREIGN KEY (DepartmentId) REFERENCES Department(id)
);

CREATE TABLE Student (
    id INTEGER NOT NULL PRIMARY KEY,
    StudentNumber INTEGER NOT NULL UNIQUE,
    InstructorID INTEGER NOT NULL,
    IsGraduate BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES "user"(id),
    FOREIGN KEY (InstructorID) REFERENCES Instructor(id)
);

-- Create CourseStudent cross table
CREATE TABLE CourseStudent (
    CourseID INTEGER NOT NULL,
    StudentID INTEGER NOT NULL,
    isEnrolled BOOLEAN NOT NULL DEFAULT FALSE,
    Grade FLOAT NOT NULL DEFAULT 0,
    FOREIGN KEY (CourseID) REFERENCES Course(id),
    FOREIGN KEY (StudentID) REFERENCES Student(id)
);

CREATE TABLE Question (
    id INTEGER NOT NULL PRIMARY KEY,
    Sentence VARCHAR(255) NOT NULL,
    Options VARCHAR(255)
);

CREATE TABLE Survey (
    id INTEGER NOT NULL PRIMARY KEY,
    CourseID INTEGER NOT NULL,
    InstructorID INTEGER NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Course(id),
    FOREIGN KEY (InstructorID) REFERENCES Instructor(id)
);

CREATE TABLE SurveyQuestion (
    SurveyID INTEGER NOT NULL,
    QuestionID INTEGER NOT NULL,
    FOREIGN KEY (SurveyID) REFERENCES Survey(id),
    FOREIGN KEY (QuestionID) REFERENCES Question(id)
);

CREATE TABLE BanList(
    id INTEGER NOT NULL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES "user"(id)
);

CREATE TABLE ResetToken (
    id INTEGER NOT NULL,
    Token INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES "user"(id)
);

CREATE TABLE Transcript (
    id INTEGER NOT NULL PRIMARY KEY,
    TotalCredit INTEGER NOT NULL,
    TotalGrade FLOAT NOT NULL,
    FOREIGN KEY (id) REFERENCES Student(id)
);

CREATE TABLE TranscriptCourse (
    TranscriptID INTEGER NOT NULL,
    CourseID INTEGER NOT NULL,
    Grade FLOAT NOT NULL,
    FOREIGN KEY (TranscriptID) REFERENCES Transcript(id),
    FOREIGN KEY (CourseID) REFERENCES Course(id)
);

-- Insert the UserType data
INSERT INTO UserType (id, "Role")
VALUES
    (1, 'Admin'),
    (2, 'Instructor'),
    (3, 'Student'),
    (4, 'DepartmentManager');

-- Insert the user data
INSERT INTO "user" (id, FirstName, Surname, Email, "Password", Phone, UserType, Address)
VALUES
    (1, 'John', 'Doe', 'admin@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 1, 'test'),
    (2, 'Jane', 'Doe', 'instructor@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (3, 'Marie', 'Doe', 'student1@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (4, 'George', 'Doe', 'student2@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (5, 'Micheal', 'Doe', 'student3@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (6, 'Benjamin', 'Doe', 'student4@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (7, 'Jonathan', 'Doe', 'departmentmanager@hacettepe.edu.tr' , '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567891', 4, 'test'),
    (8, 'James', 'Doe', 'departmentmanager2@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567891', 4, 'test'),
    (9, 'William', 'Doe', 'departmentmanager3@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567891', 4, 'test'),
    (10, 'Ava', 'Johnson', 'student11@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (11, 'Noah', 'Williams', 'student12@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (12, 'Olivia', 'Brown', 'student13@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (13, 'Emma', 'Jones', 'student14@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (14, 'Oliver', 'Miller', 'student15@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (15, 'Elijah', 'Davis', 'student16@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (16, 'Charlotte', 'Rodriguez', 'student17@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (17, 'Ethan', 'Brown', 'student12@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (18, 'William', 'Lee', 'student13@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (19, 'Mia', 'Garcia', 'student14@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (20, 'James', 'Clark', 'student15@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (21, 'Sophie', 'Martinez', 'student16@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (22, 'Olivia', 'Davis', 'instructor1@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (23, 'Noah', 'Rodriguez', 'instructor2@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (24, 'Isabella', 'Wilson', 'instructor3@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (25, 'Logan', 'Garcia', 'instructor4@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (26, 'Mason', 'Martinez', 'instructor5@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (27, 'Elijah', 'Davis', 'instructor6@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (28, 'Oliver', 'Rodriguez', 'instructor7@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (29, 'Jacob', 'Anderson', 'instructor8@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (30, 'Lucas', 'Thomas', 'instructor9@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (31, 'Michael', 'Harris', 'instructor10@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (32, 'Alexander', 'Jackson', 'instructor11@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (33, 'Ella', 'White', 'instructor12@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 2, 'test'),
    (34, 'Avery', 'Martin', 'student17@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (35, 'Abigail', 'Thompson', 'student18@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (36, 'Emily', 'Garcia', 'student19@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (37, 'Charlotte', 'Anderson', 'student20@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (38, 'Harper', 'Taylor', 'student21@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (39, 'Madison', 'Harris', 'student22@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (40, 'Scarlett', 'Jackson', 'student23@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (41, 'Victoria', 'Martin', 'student24@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (42, 'Aria', 'Thompson', 'student25@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (43, 'Grace', 'Garcia', 'student26@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (44, 'Chloe', 'Anderson', 'student27@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (45, 'Camila', 'Taylor', 'student28@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (46, 'Penelope', 'Harris', 'student29@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (47, 'Riley', 'Jackson', 'student30@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (48, 'Layla', 'Martin', 'student31@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (49, 'Lillian', 'Thompson', 'student32@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (50, 'Nora', 'Garcia', 'student33@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (51, 'Zoey', 'Anderson', 'student34@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (52, 'Mila', 'Taylor', 'student35@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (53, 'Aubrey', 'Harris', 'student36@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (54, 'Hannah', 'Jackson', 'student37@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (55, 'Lily', 'Martin', 'student38@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (56, 'Addison', 'Thompson', 'student39@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (57, 'Eleanor', 'Garcia', 'student40@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (58, 'Natalie', 'Anderson', 'student41@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (59, 'Luna', 'Taylor', 'student42@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (60, 'Savannah', 'Harris', 'student43@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (61, 'Brooklyn', 'Jackson', 'student44@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (62, 'Leah', 'Martin', 'student45@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (63, 'Zoe', 'Thompson', 'student46@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (64, 'Stella', 'Garcia', 'student47@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (65, 'Hazel', 'Anderson', 'student48@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (66, 'Ellie', 'Taylor', 'student49@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (67, 'Paisley', 'Harris', 'student50@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (68, 'Audrey', 'Jackson', 'student51@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (69, 'Skylar', 'Martin', 'student52@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (70, 'Violet', 'Thompson', 'student53@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (71, 'Claire', 'Garcia', 'student54@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (72, 'Bella', 'Anderson', 'student55@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (73, 'Aurora', 'Taylor', 'student56@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (74, 'Lucy', 'Harris', 'student57@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (75, 'Anna', 'Jackson', 'student58@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (76, 'Samantha', 'Martin', 'student59@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (77, 'Caroline', 'Thompson', 'student60@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (78, 'Genesis', 'Garcia', 'student61@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (79, 'Aaliyah', 'Anderson', 'student62@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (80, 'Kennedy', 'Taylor', 'student63@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (81, 'Kinsley', 'Harris', 'student64@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (82, 'Allison', 'Jackson', 'student65@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (83, 'Maya', 'Martin', 'student66@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (84, 'Sarah', 'Thompson', 'student67@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (85, 'Madelyn', 'Garcia', 'student68@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (86, 'Lily', 'Wilson', 'student9@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test'),
    (87, 'Lucas', 'Smith', 'student10@hacettepe.edu.tr', '$2a$12$9F3AVQfZUSXrwlVDRPNCTOSj6XieGpGQ8aQQKlOuJVTGRVKm7Aqpu', '1234567890', 3, 'test');

INSERT INTO Department (id, DepartmentName, DeparmentManagerID) VALUES
    (1, 'Computer Engineering', 1),
    (2, 'Electrical and Electronics Engineering', 2),
    (3, 'Mechanical Engineering', 3);

INSERT INTO DeparmentManager (UserID, DepartmentId) VALUES
    (7, 1),
    (8, 2),
    (9, 3);

INSERT INTO Instructor (id, DepartmentId, headedBy) VALUES
    (2,1,7),
    (22,1,7),
    (23,1,7),
    (24,1,7),
    (25,2,8),
    (26,2,8),
    (27,2,8),
    (28,2,8),
    (29,3,9),
    (30,3,9),
    (31,3,9),
    (32,3,9),
    (33,3,9);

INSERT INTO Course (id, CourseCode, CourseName, Credit, Class, Quota, DepartmentId, InstructorID) VALUES
    (1, 'CENG 111', 'Introduction to Computer Engineering', 3, '1A', 100, 1, 2),
    (2, 'CENG 112', 'Introduction to Computer Engineering Lab', 1, '1A', 100, 1, 2),
    (3, 'CENG 121', 'Introduction to Software Engineering', 3, '1A', 100, 1, 22),
    (4, 'CENG 122', 'Introduction to Software Engineering Lab', 1, '1A', 100, 1, 22),
    (5, 'CENG 123', 'Introduction to Computer Science', 3, '1A', 100, 1, 22),
    (6, 'CENG 124', 'Introduction to Computer Science Lab', 1, '1A', 100, 1, 23),
    (7, 'CENG 131', 'Fundamentals of Artificial Intelligence', 3, '1A', 100, 1, 23),
    (8, 'CENG 132', 'Fundamentals of Artificial Intelligence Lab', 1, '1A', 100, 1, 23),
    (9, 'CENG 133', 'Fundamentals of Data Science', 3, '1A', 100, 1, 24),
    (10, 'CENG 134', 'Fundamentals of Data Science Lab', 1, '1A', 100, 1, 24),
    (11, 'EENG 111', 'Introduction to Electrical and Electronics Engineering', 3, '1A', 100, 2, 25),
    (12, 'EENG 112', 'Introduction to Electrical and Electronics Engineering Lab', 1, '1A', 100, 2, 25),
    (13, 'EENG 121', 'Introduction to Electrical Circuits', 3, '1A', 100, 2, 26),
    (14, 'EENG 122', 'Introduction to Electrical Circuits Lab', 1, '1A', 100, 2, 26),
    (15, 'EENG 123', 'Introduction to Electronics', 3, '1A', 100, 2, 26),
    (16, 'EENG 124', 'Introduction to Electronics Lab', 1, '1A', 100, 2, 26),
    (17, 'EENG 131', 'Introduction to Digital Systems', 3, '1A', 100, 2, 27),
    (18, 'EENG 132', 'Introduction to Digital Systems Lab', 1, '1A', 100, 2, 27),
    (19, 'EENG 133', 'Introduction to Signals and Systems', 3, '1A', 100, 2, 27),
    (20, 'EENG 134', 'Introduction to Signals and Systems Lab', 1, '1A', 100, 2, 27),
    (21, 'EENG 135', 'Introduction to Electromagnetics', 3, '1A', 100, 2, 28),
    (22, 'EENG 136', 'Introduction to Electromagnetics Lab', 1, '1A', 100, 2, 28),
    (23, 'EENG 137', 'Introduction to Control Systems', 3, '1A', 100, 2, 28),
    (24, 'MENG 111', 'Introduction to Mechanical Engineering', 3, '1A', 100, 3, 29),
    (25, 'MENG 112', 'Introduction to Mechanical Engineering Lab', 1, '1A', 100, 3, 29),
    (26, 'MENG 121', 'Introduction to Mechanics', 3, '1A', 100, 3, 29),
    (27, 'MENG 122', 'Introduction to Mechanics Lab', 1, '1A', 100, 3, 30),
    (28, 'MENG 123', 'Introduction to Thermodynamics', 3, '1A', 100, 3, 30),
    (29, 'MENG 124', 'Introduction to Thermodynamics Lab', 1, '1A', 100, 3, 30),
    (30, 'MENG 131', 'Introduction to Materials Science', 3, '1A', 100, 3, 31),
    (31, 'MENG 132', 'Introduction to Materials Science Lab', 1, '1A', 100, 3, 31),
    (32, 'MENG 133', 'Introduction to Manufacturing Processes', 3, '1A', 100, 3, 31),
    (33, 'MENG 134', 'Introduction to Manufacturing Processes Lab', 1, '1A', 100, 3, 32),
    (34, 'MENG 135', 'Introduction to Mechatronics', 3, '1A', 100, 3, 32),
    (35, 'MENG 136', 'Introduction to Mechatronics Lab', 1, '1A', 100, 3, 32),
    (36, 'MENG 137', 'Introduction to Design', 3, '1A', 100, 3, 33);

INSERT INTO Student (id, StudentNumber, InstructorID) VALUES
    (3, 2017100003, 2),
    (4, 2017100004, 2),
    (5, 2017100005, 2),
    (6, 2017100006, 2),
    (10, 2017100007, 2),
    (11, 2017100008, 22),
    (12, 2017100009, 22),
    (13, 2017100010, 22),
    (14, 2017100011, 22),
    (15, 2017100012, 22),
    (16, 2017100013, 23),
    (17, 2017100014, 23),
    (18, 2017100015, 23),
    (19, 2017100016, 23),
    (20, 2017100017, 23),
    (21, 2017100018, 24),
    (34, 2017100019, 24),
    (35, 2017100020, 24),
    (36, 2017100021, 24),
    (37, 2017100022, 24),
    (38, 2017100023, 25),
    (39, 2017100024, 25),
    (40, 2017100025, 25),
    (41, 2017100026, 25),
    (42, 2017100027, 25),
    (43, 2017100028, 26),
    (44, 2017100029, 26),
    (45, 2017100030, 26),
    (46, 2017100031, 26),
    (47, 2017100032, 26),
    (48, 2017100033, 27),
    (49, 2017100034, 27),
    (50, 2017100035, 27),
    (51, 2017100036, 27),
    (52, 2017100037, 27),
    (53, 2017100038, 28),
    (54, 2017100039, 28),
    (55, 2017100040, 28),
    (56, 2017100041, 28),
    (57, 2017100042, 28),
    (58, 2017100043, 29),
    (59, 2017100044, 29),
    (60, 2017100045, 29),
    (61, 2017100046, 29),
    (62, 2017100047, 29),
    (63, 2017100048, 30),
    (64, 2017100049, 30),
    (65, 2017100050, 30),
    (66, 2017100051, 30),
    (67, 2017100052, 30),
    (68, 2017100053, 31),
    (69, 2017100054, 31),
    (70, 2017100055, 31),
    (71, 2017100056, 31),
    (72, 2017100057, 31),
    (73, 2017100058, 31),
    (74, 2017100059, 32),
    (75, 2017100060, 32),
    (76, 2017100061, 32),
    (77, 2017100062, 32),
    (78, 2017100063, 32),
    (79, 2017100064, 33),
    (80, 2017100065, 33),
    (81, 2017100066, 33),
    (82, 2017100067, 33),
    (83, 2017100068, 33),
    (84, 2017100069, 33),
    (85, 2017100070, 33),
    (86, 2017100071, 33),
    (87, 2017100072, 33);

INSERT INTO CourseStudent (CourseID, StudentID) VALUES
    (1,37),(1,10),(2,3),(2,35),(2,36),(2,13),(2,19),(3,3),
    (3,11),(3,14),(3,17),(3,18),(3,20),(4,6),(4,36),(4,12),
    (4,13),(4,16),(4,21),(5,3),(5,4),(5,6),(5,12),(5,17),
    (5,18),(6,3),(6,14),(6,15),(6,16),(6,18),(7,4),(7,6),
    (7,36),(7,10),(7,13),(7,15),(7,21),(8,4),(8,6),(8,35),
    (8,36),(8,19),(8,21),(9,4),(9,6),(9,35),(9,36),(9,19),
    (9,21),(10,3),(10,34),(10,11),(10,12),(10,13),(10,19),
    (10,21),(11,39),(11,40),(11,44),(11,51),(11,55),(12,38),
    (12,40),(12,45),(12,46),(12,49),(13,39),(13,47),(13,49),
    (13,52),(13,57),(14,39),(14,42),(14,55),(14,57),(15,40),
    (15,43),(15,53),(15,57),(16,41),(16,43),(16,49),(16,51),
    (16,54),(16,55),(16,56),(17,39),(17,43),(17,53),(17,55),
    (17,56),(17,57),(18,38),(18,51),(18,52),(18,53),(18,57),
    (19,38),(19,47),(19,52),(19,54),(19,57),(20,38),(20,39),
    (20,40),(20,43),(20,46),(20,49),(20,52),(20,54),(20,55),
    (21,38),(21,44),(21,46),(21,49),(21,50),(21,54),(21,57),
    (22,42),(22,44),(22,47),(22,49),(22,50),(22,52),(22,54),
    (22,55),(22,56),(22,57),(23,46),(23,47),(23,53),(23,54),
    (23,55),(24,68),(24,74),(24,75),(24,77),(24,78),(24,86),
    (25,59),(25,60),(25,61),(25,72),(25,77),(25,83),(25,85),
    (25,86),(26,59),(26,63),(26,65),(26,68),(26,78),(26,81),
    (26,84),(27,58),(27,64),(27,65),(27,68),(27,77),(27,80),
    (27,87),(28,59),(28,60),(28,64),(28,67),(28,73),(28,74),
    (28,76),(28,77),(28,80),(28,81),(28,83),(28,85),(29,58),
    (29,62),(29,66),(29,68),(29,73),(29,76),(29,83),(29,87),
    (30,59),(30,61),(30,66),(30,68),(30,72),(30,74),(30,77),
    (30,78),(30,79),(30,80),(30,81),(30,82),(30,84),(31,58),
    (31,59),(31,61),(31,65),(31,71),(31,72),(31,84),(32,59),
    (32,64),(32,65),(32,66),(32,67),(32,68),(32,73),(32,75),
    (33,58),(33,62),(33,63),(33,65),(33,70),(33,81),(33,82),
    (34,60),(34,61),(34,62),(34,66),(34,67),(34,69),(34,75),
    (34,76),(34,78),(34,82),(34,85),(34,86),(35,58),(35,62),
    (35,69),(35,72),(35,74),(35,76),(35,78),(35,81),(36,59),
    (36,60),(36,72),(36,74),(36,75),(36,79),(36,83),(36,84);

INSERT INTO Question (id, Sentence, Options) VALUES
    (1, 'How do you rate the instructor?', '1,2,3,4,5'),
    (2, 'How do you rate the course?', '1,2,3,4,5'),
    (3, 'Write your opinions.', null);

INSERT INTO Survey (id, CourseID, InstructorID) VALUES 
    (1,1,2),(2,3,22);

INSERT INTO SurveyQuestion (SurveyID, QuestionID) VALUES
    (1,1),(1,2),(2,1),(2,2);