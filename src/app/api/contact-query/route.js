import sendMailToSelf from '@/utils/sendMailToSelf';

export async function POST(req) {
    try {
        const { name, email, query } = await req.json();
        await sendMailToSelf(name, email, query);
        return new Response(JSON.stringify({ message: 'Query sent successfully' }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Error processing the query' }), { status: 500 });
    }
}
