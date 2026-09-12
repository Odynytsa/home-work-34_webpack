export default class Post {
    title: string
    date: Date

    constructor(title: string) {
        this.title = title
        this.date = new Date()
    }

    toString(): string {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
        })
    }
}
