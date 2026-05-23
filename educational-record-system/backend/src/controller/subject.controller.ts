import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Subject } from "../entity/Subject";
import { Instructor } from "../entity/Instructor";

export class SubjectController extends Controller {
    repository = AppDataSource.getRepository(Subject);
    instructorRepository = AppDataSource.getRepository(Instructor);

    getInstructors = async (req: any, res: any) => {
        try {
            const id = req.params['id'];

            const subject = await this.repository.findOne({
                where: { id },
                relations: ['instructors'],
            });

            if (!subject) {
                return this.handleError(res, null, 404, 'No subject exists with the given id.');
            }

            res.json(subject.instructors);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    assignInstructor = async (req: any, res: any) => {
        try {
            const subjectId = req.params['id'];
            const instructorId = req.params['instructorId'];

            const subject = await this.repository.findOne({
                where: { id: subjectId },
                relations: ['instructors']
            });

            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            const instructor = await this.instructorRepository.findOneBy({ id: instructorId });

            if (!instructor) {
                return res.status(404).json({ message: 'Instructor not found' });
            }

            const alreadyAssigned = subject.instructors.some((i) => i.id === instructor.id);
            if (alreadyAssigned) {
                return this.handleError(res, null, 409, 'Instructor is already assigned to this subject.');
            }

            subject.instructors.push(instructor);
            const saved = await this.repository.save(subject);

            res.json(saved);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    removeInstructor = async (req: any, res: any) => {
        try {
            const subjectId = req.params['id'];
            const instructorId = req.params['instructorId'];

            const subject = await this.repository.findOne({
                where: { id: subjectId },
                relations: ['instructors']
            });

            if (!subject) {
                return this.handleError(res, null, 404, 'No subject exists with the given id.');
            }

            const exists = subject.instructors.some((i) => i.id === Number(instructorId));
            if (!exists) {
                return this.handleError(res, null, 404, 'Instructor is not assigned to this subject.');
            }

            subject.instructors = subject.instructors.filter((i) => i.id !== Number(instructorId));
            const saved = await this.repository.save(subject);

            res.json(saved);
        }
        catch (err) {
            this.handleError(res, err);
        }
    };
}