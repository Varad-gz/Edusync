
import { authConfig } from "@/utils/authConfig";
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

        const { fname, mname, lname, email, contact, address, sessionemail } = await req.json()

        if (!fname || !lname || !email || !address) {
            return new Response(
                JSON.stringify({ error: "Server Error: All fields are required" }),
                { status: 400 }
            );
        }

        if (!/^(?:0|(?:\+91)|91|00)?([6-9]\d{9})$/.test(contact)) {
            return new Response(
                JSON.stringify({ error: "Server Error: Invalid Contact" }),
                { status: 400 }
            );
        }

        if (email !== sessionemail) {
            const existingUser = await prisma.admin.findUnique({
                where: { email },
            });
            if (existingUser) {
                return new Response(
                    JSON.stringify({ error: "Server Error: Email already exists" }),
                    { status: 400 }
                );
            }
        }

        await prisma.admin.update({
            where: {
                email: email
            },
            data: {
                firstName: fname,
                middleName: mname,
                lastName: lname,
                address: address,
                contact: contact,
                email: email,
            }
        })

        return new Response(
            JSON.stringify({ message: "Updated Successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message)
        return new Response(
            JSON.stringify({ error: "Server Error: Failed to update" }),
            { status: 500 }
        );
    }
}
