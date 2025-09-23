import crypto from "crypto";

export default function generateRandomPassword(length = 12) {
    return crypto.randomBytes(length).toString("base64").slice(0, length);
}
