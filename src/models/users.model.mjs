import { pbkdf2Sync, randomBytes } from "node:crypto";
import mongoose from "mongoose";
import { jwtTokens } from "../utils/index.mjs";

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            trim: true,
            required: true,
        },

        fullName: { type: String, default: "" },
        photo: { type: String, default: "" },

        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },

        phoneNumber: { type: String, default: "" },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: "male",
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
        },
        address: {
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            zipCode: { type: String, default: "" },
            country: { type: String, default: "" },
        },

        verified: { type: Boolean, default: false },
        verifyEmailToken: { type: String, default: "" },
        // token: { type: String, required: true },
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { virtuals: false, getters: true },
    },
);

/**
 * =====  Pre save hook =====
 *
 * It will check if new user is added
 * send him a verification email.
 *
 * ELSE
 *
 * If user email is changed then update the email
 * and set verify to false and send verification email
 *
 */
usersSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("email")) {
        const token = jwtTokens.emailConfirmationToken({ id: this._id });
        this.verifyEmailToken = token;
        // this.verified = false;

        // let verificationUrl = `${config.backendUrl}/auth/verify-email/${token}`;
        // let data = mailer.verificationEmail({
        //     name: this.fullName || this.username,
        //     email: this.email,
        //     verificationUrl
        // })
        // await mailer.sendEmail(data);
    }

    return next();
});

/** Instance Methods of Users Schema */
usersSchema.methods = {
    /**
     * check password validity
     * @param {*} password
     * @returns Boolean
     */
    validPassword: function (password) {
        var hash = pbkdf2Sync(
            password,
            this.passwordSalt,
            10000,
            512,
            "sha512",
        ).toString("hex");
        return this.passwordHash === hash;
    },

    /**
     * set password for current user
     * @param {*} password
     */
    setPassword: function (password) {
        this.passwordSalt = randomBytes(16).toString("hex");
        this.passwordHash = pbkdf2Sync(
            password,
            this.passwordSalt,
            10000,
            512,
            "sha512",
        ).toString("hex");
    },

    /**
     * Generate Reset Password Url
     */
    generateResetPasswordUrl: function () {
        const token = jwtTokens.resetPasswordToken({ id: this._id });
        return `resetPassword/${token}`;
    },

    /**
     * Generate Auth JSON for user details
     */
    toAuthJSON: function () {
        return {
            _id: this._id,
            email: this.email,
            photo: this.photo,
            address: this.address,
            verified: this.verified,
            username: this.username,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            token: jwtTokens.authToken({
                id: this._id,
                username: this.username,
            }),
        };
    },

    /**
     * return JSON for user details
     */
    toJSON: function () {
        return {
            id: this._id,
            username: this.username,
            email: this.email,
            verified: this.verified,
            fullName: this.fullName,
            gender: this.gender,
            address: this.address,
            photo: this.photo,
        };
    },
};

/** Static Methods of Users Schema*/
usersSchema.statics = {
    /**
     * create a new user
     * @param {user sign up form params} data
     * @returns User JSON object
     */
    createNew: async function (data) {
        const { username, email, fullName = "", password } = data;
        const user = new this();
        user.username = username;
        user.email = email;
        user.fullName = fullName;
        user.setPassword(password);
        await user.save();
        return user;
    },

    /**
     * Find user by mentioned identifiers
     * @param {email/username fields} identifier
     * @returns User Instance object
     */
    findByIdentifier: async function (identifier) {
        return this.findOne({
            $or: [
                { _id: identifier },
                { email: identifier.toLowerCase() },
                { username: identifier.toLowerCase() },
            ],
        });
    },

    /**
     *
     * @param {verify email token param} token
     * @returns verify email url
     */
    verifyEmail: async function (token) {
        const decodedToken = await jwtTokens.verifyEmailToken(token);
        const { id } = decodedToken;
        const nsgUser = await this.findOne({
            _id: id,
            verifyEmailToken: token,
        });
        if (nsgUser) {
            await this.findByIdAndUpdate(id, {
                $set: { verified: true, verifyEmailToken: "" },
            });
            const redirectUrl = ""; //`${config.frontendUrl}/server-login?success=true&token=${jwtTokens.authToken({ id: nsgUser._id, email: nsgUser.email})}`;
            return redirectUrl;
        } else {
            throw new Error("Invalid token. Try again later.");
        }
    },

    /**
     * Get user by unique id
     * @param {unique id of user} id
     * @param {model options} options
     * @returns
     */
    getById: async function (id, options = {}) {
        return await this.findById(id, options).exec();
    },

    /**
     * Fetch all users satisfying mentioned query params
     * @param {options, sortOrder, skip, limit} params
     * @returns User instance object
     */
    list: function ({ query = {}, sortOrder = -1, skip = 0, limit = 20 }) {
        return this.find(query)
            .sort({ createdAt: sortOrder })
            .skip(+skip)
            .limit(+limit)
            .lean()
            .exec();
    },
};

export const User = mongoose.model("User", usersSchema);
