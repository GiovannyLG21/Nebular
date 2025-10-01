import { getCollection } from 'astro:content'

export type CollectionType = Awaited<ReturnType<typeof getCollection>>

//*Search

class Search {
    searchQuery: string
    dataset: CollectionType | undefined
    private matches: {
        dataset: CollectionType[number],
        match: string
    }[] | []
    matchMaxLen: number

    constructor(query: string, matchMaxLen: number, dataset?: CollectionType) {
        this.searchQuery = query.toLowerCase()
        this.dataset = dataset        
        this.matches = []
        this.matchMaxLen = matchMaxLen
    }

    truncateMatch(match: string) {
        const matchLen = match.length
        if (matchLen <= this.matchMaxLen) {
            // console.log({ truncatedMatch: match })
            return match
        }
        const searchQueryLen = this.searchQuery.length
        const searchQueryLenPct = Math.floor((searchQueryLen / matchLen) * 100)
        const searchQueryPos = match.toLowerCase().indexOf(this.searchQuery)
        const searchQueryPosPct = Math.floor((searchQueryPos / matchLen) * 100)
        let truncatedMatch = match

        if (searchQueryPosPct < 40) {
            truncatedMatch = match.slice(0, this.matchMaxLen)
            // return truncatedMatch
        }
        if (searchQueryPosPct >= 40 && searchQueryPosPct <= 60) {
            const assignedPct = Math.floor((100 - searchQueryLenPct) / 2)
            const assignedChar = Math.floor((this.matchMaxLen / 100) * assignedPct)
            truncatedMatch = match.slice(searchQueryPos - assignedChar, searchQueryPos + assignedChar)
            // return truncatedMatch
        }
        if (searchQueryPosPct > 60) {
            const assignedNext = matchLen - searchQueryPos
            const assignedPrev = this.matchMaxLen - assignedNext - searchQueryLen
            truncatedMatch = match.slice(searchQueryPos - assignedPrev, searchQueryPos + assignedNext)
            // return truncatedMatch
        }

        // console.log({
        //     max: this.matchMaxLen,
        //     match,
        //     matchLen,
        //     searchQueryLen,
        //     searchQueryPos,
        //     searchQueryLenPct: searchQueryLenPct + '%',
        //     searchQueryPosPct: searchQueryPosPct + '%',
        //     truncatedMatch
        // })
        return truncatedMatch
    }

    private _search() {
        if (!this.dataset) throw new Error('Dataset not defined')
        if (this.searchQuery === '') return this.matches = []
        const filterData = (data: CollectionType[number]['data']) => Object.values(data).filter(field => {
            return typeof field === 'string' && field.toLowerCase().includes(this.searchQuery)
        }) as string[]

        const searchMatches = this.dataset.filter(collection => filterData(collection.data).length)

        this.matches = searchMatches.map(collection => {
            const filteredData = filterData(collection.data).join(" - ")
            const truncatedMatch = this.truncateMatch(filteredData)
            return {
                dataset: collection,
                match: truncatedMatch
            }
        })
    }

    execute() {
        try {
            this._search()
            return this.matches
        } catch (error: any) {
            console.error('Error:', error.message)
        }
    }
}

export default Search