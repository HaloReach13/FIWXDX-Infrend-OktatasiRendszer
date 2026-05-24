import { DataSource } from "typeorm";
import { Administrator } from "./entity/Administrator";
import { Subject } from "./entity/Subject";
import { Instructor } from "./entity/Instructor";
import { Course } from "./entity/Course";
import { Student } from "./entity/Student";
import { StudentCourse } from "./entity/StudentCourse";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "educational-record-system",
    synchronize: true,
    logging: true,
    entities: [Administrator ,Subject, Instructor, Student, Course, StudentCourse],
    subscribers: [],
    migrations: [],
});