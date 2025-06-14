export const generateTokenError = (err) =>
    ({
        TokenExpiredError:
            "Your login session has expired. Please login again.",
        JsonWebTokenError: "Invalid token. Please login again.",
        NotBeforeError:
            "Your session has not active yet. Please try again later.",
    })[err];
