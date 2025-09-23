import { authConfig } from "@/utils/authConfig";
import generateRandomPassword from "@/utils/generateRandomPassword";
import { hashPassword } from "@/utils/passwordOperations";
import prisma from "@/utils/prismaClient";
import { sendAccountCreationMail } from "@/utils/sendMail";
import { getServerSession } from "next-auth";

export async function POST(req) {
    try {

        const session = await getServerSession(authConfig);

        if (!session) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }

        const { fname, mname, lname, email, contact, address } = await req.json()

        if (!fname || !lname || !email || !mname || !address) {
            return new Response(
                JSON.stringify({ error: "Server Error: All fields are required" }),
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return new Response(
                JSON.stringify({ error: "Server Error: Invalid Email" }),
                { status: 400 }
            );
        }

        const match = contact.match(/^(?:0|(?:\+91)|91|00)?([6-9]\d{9})$/);
        if (!match) {
            return new Response(
                JSON.stringify({ error: "Server Error: Invalid Contact" }),
                { status: 400 }
            );
        }

        const validContact = match[1];

        const existingUser = await prisma.instructor.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "Server Error: Email already exists" }),
                { status: 400 }
            );
        }

        const password = generateRandomPassword();
        const hashedPassword = await hashPassword(password);

        await prisma.instructor.create({
            data: {
                firstName: fname,
                middleName: mname,
                lastName: lname,
                address: address,
                contact: validContact,
                email: email,
                password: hashedPassword,
                adminId: session.user.id
            },
        });

        await sendAccountCreationMail(email, password, 'instructor');

        return new Response(
            JSON.stringify({ message: "User successfully created" }),
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message)
        return new Response(
            JSON.stringify({ error: "Server Error: Failed to create user" }),
            { status: 500 }
        );
    }
}
