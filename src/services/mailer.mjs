import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { ENV } from "../config/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EMAIL_TEMPLATE_BASE = join(__dirname, "../views");

const emailClient = nodemailer.createTransport({
    host: ENV.emailHost,
    port: ENV.emailPort,
    secure: ENV.emailSecure,
    auth: {
        user: ENV.emailUser,
        pass: ENV.emailPass,
    },
});

// load template file & inject data => return content with injected data.
const template = (fileName, data) => {
    const content = readFileSync(EMAIL_TEMPLATE_BASE + fileName).toString();
    const inject = handlebars.compile(content);
    return inject(data);
};

// --------- Email Templates --------- //

export const verificationEmail = ({ name, email, verificationUrl }) => {
    return {
        from: `unkown@gmail.com`,
        to: `${name} <${email}>`,
        subject: `√√ Confirm Your Email. √√`,
        text: template("/verify-email/email.txt", {
            name,
            email,
            verificationUrl,
        }),
        html: template("/verify-email/email.html", {
            name,
            email,
            verificationUrl,
        }),
    };
};

export const forgotPasswordEmail = ({ name, email, resetUrl }) => {
    return {
        from: `unkown@gmail.com`,
        to: `${name} <${email}>`,
        subject: `√√ Reset Password Request. √√`,
        text: template("/forgot-password/email.txt", { name, email, resetUrl }),
        html: template("/forgot-password/email.html", {
            name,
            email,
            resetUrl,
        }),
    };
};

export const sendEmail = (data) => {
    if (!emailClient) {
        return;
    }

    return emailClient.sendMail(data);
};
