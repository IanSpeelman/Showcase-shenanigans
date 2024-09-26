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

export type user = {
    id: number,
    email: string,
    role: string,
    firstname: string,
    lastname: string,
}

export type booking = {
    id: number,
    event: schedule,
    user: user,
    amount: number
}
