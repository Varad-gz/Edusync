import prisma from "@/utils/prismaClient";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const reqEmail = url.searchParams.get("email")
        const data = await prisma.admin.findUnique({ where: { email: reqEmail } })
        return new Response(JSON.stringify({ exists: (data ? true : false) }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
    }
}