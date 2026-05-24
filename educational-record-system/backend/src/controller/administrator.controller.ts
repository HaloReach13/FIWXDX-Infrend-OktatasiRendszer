import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Administrator } from "../entity/Administrator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AdministratorController extends Controller {
    repository = AppDataSource.getRepository(Administrator);

    create = async (req: any, res: any) => {
        try {
            if (!req.body.password) {
                return this.handleError(res, null, 400, 'Password is required.');
            }

            req.body.password = await bcrypt.hash(req.body.password, 12);

            const entity = this.repository.create(req.body as Administrator);

            const insertedEntity = await this.repository.save(entity);

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req: any, res: any) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: ['id', 'password']
            });

            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}