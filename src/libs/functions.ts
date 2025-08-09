import { getCollection } from "astro:content"
type CollectionType = Awaited<ReturnType<typeof getCollection>>
export type PostType = CollectionType[0]

//* Theme
export function setTheme(theme: string) {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
}


//*Posts
export const getPosts = async () => await getCollection('posts')

export function orderPostsByYear(posts: CollectionType) {
    return posts.sort((post1, post2) => {
        const getYear = (date: string) => new Date(date).getFullYear()
        const date1 = getYear(post1.data.date)
        const date2 = getYear(post2.data.date)
        return date2 - date1
    })
}

interface PostsGrouped {
    year: string,
    posts: CollectionType
}
export function groupPostsByYear(posts: CollectionType) {    
    return posts.reduce((acc, currentPost) => {
        const postYear = new Date(currentPost.data.date).getFullYear().toString()
        const findYear = acc.find(group => group.year === postYear)
        findYear ? findYear.posts.push(currentPost) : acc.push({ year: postYear, posts: [currentPost] })
        return acc
    }, [] as PostsGrouped[]).sort((a, b) => Number(b.year) - Number(a.year))
}

export function formatPostDate(date: string) {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}


//* Tags
export function getPostsTags(posts: CollectionType) {    
    return [...new Set(posts.flatMap(post => post.data.tags))].sort()
}

export function getPostsOfTag(tag: string, posts: CollectionType){    
    return posts.filter((post) => post.data.tags.includes(tag))
}


//* Others
export function perfectNumbers() {
    const perfectNumbers: number[] = []
    let actualNumber = 1;
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