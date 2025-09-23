// app/api/create-user/route.js

import { authConfig } from "@/utils/authConfig";
import { hashPassword } from "@/utils/passwordOperations";
import prisma from "@/utils/prismaClient";
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

        const { fname, mname, lname, email, password, contact, address, rpassword } = await req.json()

        if (!fname || !lname || !email || !password) {
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

        if (!/^(?:0|(?:\+91)|91|00)?([6-9]\d{9})$/.test(contact)) {
            return new Response(
                JSON.stringify({ error: "Server Error: Invalid Contact" }),
                { status: 400 }
            );
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return new Response(
                JSON.stringify({ error: "Server Error: Invalid Password" }),
                { status: 400 }
            );
        }

        if (password != rpassword) {
            return new Response(
                JSON.stringify({ error: "Server Error: Passwords don't match" }),
                { status: 400 }
            );
        }

        const existingUser = await prisma.admin.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "Server Error: Email already exists" }),
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password)

        await prisma.admin.create({
            data: {
                firstName: fname,
                middleName: mname,
                lastName: lname,
                address: address,
                contact: contact,
                email: email,
                password: hashedPassword
            },
        });

        return new Response(
            JSON.stringify({ message: "Signed up successfully, redirecting..." }),
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message)
        return new Response(
            JSON.stringify({ error: "Server Error: Failed to sign up" }),
            { status: 500 }
        );
    }
}
