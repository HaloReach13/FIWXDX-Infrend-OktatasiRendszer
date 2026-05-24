import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import { appRouter } from "./routes";
import { handleAuthorizationError } from "./protect-routes";

const getRoutes = () => appRouter;

async function main() {
    await AppDataSource.initialize();

    const app = express();

    app.use(express.json());

    app.use('/api', getRoutes(), handleAuthorizationError);

    app.listen(3000, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Server is listening on port 3000.');
    });
}

main().catch(err => console.error(err));