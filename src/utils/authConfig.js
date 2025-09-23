import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaClient";
import { comparePassword } from "./passwordOperations";


export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                let admin = await prisma.admin.findUnique({
                    where: { googleAuthId: profile.sub },
                });

                if (!admin) {
                    admin = await prisma.admin.create({
                        data: {
                            firstName: profile.name,
                            middleName: null,
                            lastName: profile.family_name || "",
                            email: profile.email,
                            googleAuthId: profile.sub,
                            address: "",
                            contact: "0000000000",
                        },
                    });
                }

                return { id: admin.id, name: admin.firstName, email: admin.email, role: "admin", method: 'google' };
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email:", type: "email" },
                password: { label: "Password:", type: "password" },
            },
            async authorize(credentials) {
                const { email, password, type } = credentials;

                if (type === '1') {
                    const admin = await prisma.admin.findUnique({
                        where: { email },
                        select: {
                            id: true,
                            password: true,
                            firstName: true,
                            email: true,
                        }
                    });

                    if (!admin) {
                        throw new Error("Invalid email");
                    }

                    if (!admin.password) {
                        throw new Error("This email is associated with Google Sign-In");
                    }

                    const isValidPassword = await comparePassword(password, admin.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    return { id: admin.id, name: admin.firstName, email: admin.email, role: "admin", method: 'local' };
                } else if (type === '2') {
                    const instructor = await prisma.instructor.findUnique({
                        where: { email },
                        select: {
                            id: true,
                            password: true,
                            firstName: true,
                            email: true,
                        }
                    });

                    if (!instructor) {
                        throw new Error("Invalid email");
                    }

                    const isValidPassword = await comparePassword(password, instructor.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    return { id: instructor.id, name: instructor.firstName, email: instructor.email, role: "instructor" };
                } else if (type === '3') {
                    const student = await prisma.student.findUnique({
                        where: { email },
                        select: {
                            id: true,
                            password: true,
                            firstName: true,
                            email: true,
                        }
                    });

                    if (!student) {
                        throw new Error("Invalid email");
                    }

                    const isValidPassword = await comparePassword(password, student.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    return { id: student.id, name: student.firstName, email: student.email, role: "student" };
                }

            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.method = user.method;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.method = token.method;
            }
            return session;
        },
    },
    pages: {
        signIn: '/signin'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 12 * 60 * 60,
    },
};