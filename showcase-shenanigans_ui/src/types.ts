export type MovieType = {
  Id: number,
  Image: string,
  Duration: number,
  Genre: string,
  Description: string,
  Title: string,
  Youtube_Trailer: string,
  Age_Category: number
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
