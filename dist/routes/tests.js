"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const utils_1 = require("../utils");
const express_1 = __importDefault(require("express"));
const getTestsRouter = (db) => {
    const testsRouter = express_1.default.Router(); // our router
    testsRouter.delete("/data", (req, res) => {
        db.courses = [];
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    return testsRouter;
};
exports.getTestsRouter = getTestsRouter;
