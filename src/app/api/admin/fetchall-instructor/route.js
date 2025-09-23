import { authConfig } from "@/utils/authConfig";
import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";

export async function GET(req) {
    try {
        const session = await getServerSession(authConfig);

        if (!session) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }

        const instructors = await prisma.instructor.findMany({
            where: {
                adminId: session.user.id,
            },
        });

        return new Response(
            JSON.stringify({ data: instructors }),
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "Server Error: Failed to fetch users" }),
            { status: 500 }
        );
    }
}