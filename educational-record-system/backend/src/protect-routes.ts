import { expressjwt } from "express-jwt";

export const checkAdministrator = expressjwt({
    secret: "mySecretKey",
    algorithms: ["HS256"]
});

export const handleAuthorizationError = (err: any, req: any, res: any, next: any) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};