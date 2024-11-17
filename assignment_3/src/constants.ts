export const backendUrl = "http://localhost:5000/";
export enum Route {
  Joke = "jokes",
  MongoJoke = "mongo-jokes",
  Category = "categories",
  Tag = "tags",
}
export enum FormType {
  Name = "joke-name",
  Text = "joke-text",
  Category = "joke-category",
  Tags = "joke-tags",
}

export enum Submitter {
    Postgre = "postgre",
    Mongo = "mongo"
}