import { defineCollection, z } from 'astro:content'

//* Schemas

const postSchema = z.object({
    title: z.string(),    
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: 'Invalid Date' }
    ),
    description: z.string(),
    tags: z.array(z.string()),
    readtime: z.number()
})

const noteSchema = z.object({
    title: z.string(),
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: 'Invalid Date' }
    )
})


//* Collections

const posts = defineCollection({
    schema: postSchema
})

const notes = defineCollection({
    schema: noteSchema
})


export const collections = { posts, notes }