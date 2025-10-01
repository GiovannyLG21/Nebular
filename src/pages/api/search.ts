import { getNotes, getPosts } from '@/libs/functions';
import Search from '@/libs/search';
import type { APIRoute } from 'astro';

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    const body: { query: string } = await request.json()
    const { query } = body

    const collections = [await getPosts(), await getNotes()].flat()
    const search = new Search(query, 70, collections).execute()    

    return new Response(
        JSON.stringify({ response: 'Search OK', data: search }), { status: 200 }
    )
}