export type MovieType = {
  id: number,
  image: string,
  duration: number,
  genre: string,
  description: string,
  title: string,
  youtube_Trailer: string,
  age: number,
  active: boolean
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
