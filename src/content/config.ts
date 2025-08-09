import { defineCollection, z } from "astro:content";

const postSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    readtime: z.number()
})

const posts = defineCollection({
    schema: postSchema
})

export type Post = z.infer<typeof postSchema>
export const collections = { posts }