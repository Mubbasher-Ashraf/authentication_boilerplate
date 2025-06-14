// import cluster from "node:cluster";
import { createServer } from "node:http";
// import { availableParallelism } from "node:os";

import { ENV, app } from "./config/index.mjs";
import * as Logs from "./utils/customLog.mjs";

/**
 * cluster related code commented becasue of pm2 setup
 * if pm2 not setup or installed then commented code can be used
 */
// const numCPUs = availableParallelism();

// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);
//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(Logs.customError(`worker ${worker.process.pid} died`));
//     });
// } else {
const server = createServer(app);
server.listen(ENV.port, () => {
    console.log(
        Logs.customSuccess(`Worker process ${process.pid} started listening on http://${ENV.host}:${ENV.port}`),
    );
});
// }

process.on('SIGTERM', () => {
    console.log(Logs.customError('SIGTERM signal received: closing HTTP server'));
    process.exit(0);
});

// uncaughtExecptions error
process.on("uncaughtException", (err) => {
    console.log(Logs.customError("We Got uncaughtException Error", err));
    process.exit(1);
});

//uncaughtExceptionMonitor error
process.on("uncaughtExceptionMonitor", (err) => {
    console.log(Logs.customError("We Got uncaughtExceptionMonitor Error", err));
    process.exit(1);
});

// unhandledRejection error
process.on("unhandledRejection", (err) => {
    console.log(Logs.customError("We Got unhandledRejection Error", err));
    process.exit(1);
});
