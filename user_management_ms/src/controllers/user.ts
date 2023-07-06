import { codes } from "../app.js";
import User from "../models/user.js";

import type { Request, Response, NextFunction } from "express";

// POST /user/new
export async function postNew(_: Request, res: Response, next: NextFunction) {
    const userId: string = res.locals?.userId;

    if (userId == undefined) {
        // if this error is thrown, something fundamental is wrong with the app
        throw new Error("Extracted 'userId' is missing");
    }

    try {
        await User.create({ id: userId });

        console.log("New user saved to the database");
        console.debug(`New user has id: ${userId}`);

        return res.status(codes.CREATED).send("User created successfully");
    } catch (err) {
        if (
            err instanceof Error &&
            err.name === "MongoServerError" &&
            err.message.includes("E11000") // duplicate unique key error
        ) {
            res.locals.errorCode = codes.CONFLICT;
            res.locals.errorMessage = "User already exists";
        }
        return next(err);
    }
}

// GET /user/:userId
export async function getUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params?.userId;

    if (userId == undefined) {
        // if this error is thrown, something fundamental is wrong with the app
        throw new Error("Extracted 'userId' is missing");
    }

    try {
        if (userId !== res.locals.userId) {
            res.locals.errorCode = codes.UNAUTHORIZED;
            res.locals.errorMessage = "Unauthorized";
            throw new Error(
                "Value of extracted 'userId' does not match value of path parameter ':userId'"
            );
        }

        const result = await User.findOne().where({ id: userId }).lean();

        console.debug("Query result:");
        console.debug(result);

        return res.status(codes.OK).json({
            totalCharts: result?.totalCharts,
            totalTokens: result?.totalTokens,
            lastSignIn: result?.lastSignIn,
        });
    } catch (err) {
        return next(err);
    }
}

export async function addTokens(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;
    const newTokens: number = Number(req.params.newTokens);

    // A more thorough check
    // if (userId == undefined || userId !== req.get("X-User-ID")) {
    if (userId == undefined) {
        // if this error is thrown, something fundamental is wrong with the app
        throw new Error("Extracted 'userId' is missing");
    }

    if (newTokens == undefined) {
        throw new Error("Extracted 'newTokens' is missing");
    }

    try {
        const usr = await User.findOneAndUpdate(
            { id: userId, totalTokens: { $gte: -newTokens } },
            { $inc: { totalTokens: +newTokens } },
            { new: true }
        ).lean();
        if (usr === null) {
            return res.status(codes.BAD_REQUEST).json({
                message: "Could not access or change tokens for this user",
            });
        } else {
            return res.status(codes.OK).json({
                message: "Tokens accessed",
                totalTokens: usr.totalTokens,
            });
        }
    } catch (err) {
        return next(err);
    }
}

export async function getTokens(req: Request, res: Response, next: NextFunction) {
    req.params.newTokens = "0";
    return next();
}

export async function updateTotalCharts(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const count = Number(req.params.count);

    // A more thorough check
    // if (userId == undefined || userId !== req.get("X-User-ID")) {
    if (userId == undefined) {
        // if this error is thrown, something fundamental is wrong with the app
        throw new Error("Extracted 'userId' is missing");
    }

    try {
        const usr = await User.findOneAndUpdate(
            { id: userId, totalCharts: { $gte: -count } },
            { $inc: { totalCharts: +count } },
            { new: true }
        ).lean();
        if (usr === null) {
            return res.status(codes.BAD_REQUEST).json({
                message: "Could not access or change charts for this user",
            });
        } else {
            return res.status(codes.OK).json({
                message: "Charts accessed",
                totalTokens: usr.totalCharts,
            });
        }
    } catch (err) {
        return next(err);
    }
}

export async function postCreatedChart(req: Request, res: Response, next: NextFunction) {
    req.params.count = "1";
    return next();
}

export async function postDeletedChart(req: Request, res: Response, next: NextFunction) {
    req.params.count = "-1";
    return next();
}

export async function updateLastSignin(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    console.debug("Update Last Log In: userId:", userId);
    if (userId == undefined) {
        // if this error is thrown, something fundamental is wrong with the app
        throw new Error("Extracted 'userId' is missing");
    }

    try {
        const usr = await User.findOneAndUpdate(
            { id: userId },
            { $set: { lastSignIn: new Date() } },
            { new: true }
        ).lean();

        if (usr === null) {
            return res.status(codes.BAD_REQUEST).json({ message: "Could not access this user" });
        } else {
            return res.status(codes.OK).json({ message: "Sign in date updated" });
        }
    } catch (err) {
        return next(err);
    }
}
