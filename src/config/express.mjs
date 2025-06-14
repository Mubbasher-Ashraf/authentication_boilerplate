import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import favicon from 'serve-favicon';
import HttpStatus from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';

import "./dbConnection.mjs";
import { routes } from "#routes";
import { buildError } from "#utils";
import { ENV } from "./envConfig.mjs";
import { rateLimiter } from "#middlewares";
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define app level middlewares
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(helmet.hidePoweredBy());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (ENV.env === "development") {
    app.use(morgan("short")); // short, dev, common, combined, tiny
}

app.use(favicon(join(__dirname, '../../public', 'favicon.ico')));
app.use(express.static(join(__dirname, '../../public')));

// view engine
app.set('views', join(__dirname, '../views'));
app.set('view engine', 'ejs');

// App Routes with version 1
app.use("/api/v1", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Error handler 404 route
app.use((_, res) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        error: {
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        },
    });
});

// App level Error handler
app.use((err, _, res) => {
    console.log('here to print error');
    const { code, message, details = {} } = buildError(err);
    return res.status(code).json({ message, details });
});

export { app };
