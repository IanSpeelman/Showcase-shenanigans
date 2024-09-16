export type Movie = {
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
export type user = {
    id: number,
    email: string,
    role: string,
    firstName: string,
    lastName: string,
}
export type jwtData = {
    unique_name: string,
    role: string,
    FirstName: string,
    LastName: string,
}

export type schedule = {
    id: number,
    date: Date,
    movie: Movie,
}
