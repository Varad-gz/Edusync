
import { authConfig } from "@/utils/authConfig";
import { hashPassword, comparePassword } from "@/utils/passwordOperations";
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

        const { cpassword, password, rpassword, id } = await req.json()

        if (!id || !rpassword || !cpassword || !password) {
            return new Response(
                JSON.stringify({ error: "Server Error: All fields are required" }),
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

        const passwordCheck = async () => {
            const student = await prisma.student.findUnique({
                where: { id },
                select: {
                    password: true,
                }
            });

            const isValidPassword = await comparePassword(cpassword, student.password);
            if (!isValidPassword) {
                return false
            }

            return true
        }

        if (!(await passwordCheck())) {
            return new Response(
                JSON.stringify({ error: "Server Error: Incorrect current password" }),
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password)

        await prisma.student.update({
            data: {
                password: hashedPassword
            },
            where: {
                id: id
            }
        });

        return new Response(
            JSON.stringify({ message: "Password changed successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.log(error.message)
        return new Response(
            JSON.stringify({ error: "Server Error: Failed to change password" }),
            { status: 500 }
        );
    }
}
