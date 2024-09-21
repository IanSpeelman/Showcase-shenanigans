export type movie = {
    id: number,
    image: string,
    duration: number,
    genre: string,
    description: string,
    title: string,
    trailer: string,
    age: number,
    active: boolean,
    thumbnail: string,
}



export type schedule = {
    id: number,
    date: string,
    movie: movie
}
