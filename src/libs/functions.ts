import { getCollection } from 'astro:content'

//* Collections
export const getPosts = async () => await getCollection('posts').then((vals) => orderPostsByDate(vals))
export const getNotes = async () => await getCollection('notes')

// Types
export type CollectionType = Awaited<ReturnType<typeof getCollection>>
export type PostType = Awaited<ReturnType<typeof getCollection<'posts'>>>[number]
export type NoteType = Awaited<ReturnType<typeof getCollection<'notes'>>>[number]


//*Posts

/**
 * Ordenar posts por fecha, de mas reciente a mas antiguo.
 */
export function orderPostsByDate(posts: PostType[]) {
    return posts.sort((firstPost, secondPost) => {
        const firstDate = new Date(firstPost.data.date).getTime()
        const secondDate = new Date(secondPost.data.date).getTime()
        return secondDate - firstDate
    })
}

/**
 * Agrupar posts segun su año, ordenados del mas reciente al mas antiguo.
 * 
 * @returns
 * ```ts
 * [{ year: '2024', posts: [<posts>] }]
 * ``` 
 */
export function groupPostsByYear(posts: PostType[]) {
    return posts.reduce<{ year: string, posts: PostType[] }[]>((acc, currentPost) => {
        const postYear = new Date(currentPost.data.date).getFullYear().toString()
        const findYear = acc.find(({ year }) => year === postYear)
        findYear ? findYear.posts.push(currentPost) : acc.push({ year: postYear, posts: [currentPost] })
        return acc
    }, [])
        .map(yearPosts => ({ ...yearPosts, posts: orderPostsByDate(yearPosts.posts) }))
        .sort((a, b) => Number(b.year) - Number(a.year))
}

/**
 * Formatear fecha de un post al estilo ingles.
 * 
 * @param date Fecha tipo string en cualquier formato.
 * @example
 * ```ts
 * formatPostDate('2024-02-03') // 03 February 2024
 * ```
 */
export function formatPostDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}


//* Tags
/**
 * Obtener todos los tags seguns los posts creados
 * @param posts Collecion con los posts.
 * @example
 * ```ts
 * ['tag1', 'tag2']
 * ```
 */
export function getTags(posts: PostType[]) {
    return [...new Set(posts.flatMap(post => post.data.tags.map(tag => tag.toLowerCase())))].sort()
}

/**
 * Obtener los posts relacionados a un tag
 * @param tag Nombre del tag
 * @param posts Collecion con los posts
 * @returns Array con los posts
 */
export function getPostsOfTag(tag: string, posts: PostType[]) {
    return posts.filter((post) => post.data.tags.includes(tag))
}


/**
 * Obtener los headers de un post
 * @param post Collecion con el post
 * @returns Array con la informacion de cada header
 */
export function getPostHeadings(post: PostType) {
    const { rendered } = post
    if (!rendered || !rendered.metadata) return
    const headings = rendered.metadata['headings'] as { depth: number, slug: string, text: string }[]
    const headingsElements = headings.map(({ slug, text }) => ({ slug, text }))
    return headingsElements
}


//*Notes
export function formatNoteDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

//* Others
export function perfectNumbers() {
    const perfectNumbers: number[] = []
    let actualNumber = 1
    while (perfectNumbers.length !== 3) {
        const numberDivisors: number[] = []
        for (let n = 1; n < actualNumber; n++) {
            if (actualNumber % n === 0) {
                numberDivisors.push(n)
                continue
            }
        }
        const isPerfect = numberDivisors.reduce((acc, number) => acc + number, 0) === actualNumber
        if (isPerfect) {
            perfectNumbers.push(actualNumber)
            console.log(`Number: ${actualNumber}, Divisors: ${numberDivisors}`)
        }
        actualNumber++
    }
    return perfectNumbers
}