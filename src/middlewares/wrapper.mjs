import { StatusCodes } from "http-status-codes";

/**
 * Wrapper function for all routes middlewares
 * @param {*} Controller
 * @returns response object with message, status and payload | error object with error message
 */
const middlewareWrapper = (Controller) => async (req, res, next) => {
    try {
        const {
            message = "",
            status = StatusCodes.OK,
            payload = {},
        } = await Controller(req, res);

        return res.status(status).json({
            message,
            payload,
        });
    } catch (error) {
        next(error);
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     error: error.message,
        // });
    }
};
export { middlewareWrapper };
// export const middlewareWrapper = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
// };