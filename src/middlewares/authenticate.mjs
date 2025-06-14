// import { model } from 'mongoose';
import { jwtTokens, CustomErrors } from "../utils/index.mjs";

// const User = model('User');

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // Bearer token need to split
    const jwtToken = authHeader.split(" ")?.[1];

    if (!jwtToken) {
        return res.status(401).json({
            error: "Authentication failed. No token provided.",
        });
    }

    try {
        // const decoded =
        jwtTokens.authToken(jwtToken);
        // const nsgUser = {}; //await User.getById(decoded.id);
        // if (!nsgUser) {
        // 	return res
        // 		.status(404)
        // 		.json({
        // 			error: 'Sorry, we were unable to find User with such credentials.',
        // 		});
        // }

        // req.currentUser = nsgUser.toJSON();

        next();
    } catch (err) {
        let nsgError = CustomErrors.generateTokenError(err.name);
        if (!nsgError) nsgError = { error: err.message };

        return res.status(500).json(nsgError);
    }
};
