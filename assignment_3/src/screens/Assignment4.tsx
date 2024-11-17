import { FC, useCallback } from "react";
import logo from "../assets/logo.png";
import { Category, CreateJoke, Joke, Tag } from "../components";
import { useJokes } from "../hooks";
import { useMongoJokes } from "../hooks/useMongoJokes";
import { CreateJoke as CreateJokeType } from "../types";
import { Submitter } from "../constants";

export const Assignment4: FC = () => {
  const { jokes, categories, tags, region, sendJoke } = useJokes();
  const { jokes: mongoJokes, sendJoke: sendMongoJoke } = useMongoJokes();
  const onJokeSubmit = useCallback(
    async (value: CreateJokeType, db: Submitter) => {
      try {
        switch (db) {
          case Submitter.Postgre:
            await sendJoke(value);
            break;
          case Submitter.Mongo:
            await sendMongoJoke(value, region);
            break;
          default:
            alert("Invalid submit button");
        }
        return true;
      } catch (err) {
        console.error(err);
        alert(`Failed to post joke due to server error: '${err}'`);
        return false;
      }
    },
    [region, sendJoke, sendMongoJoke]
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="content-container">
        <span className="title">Categories</span>
        <div className="container">
          {categories.map((entry) => (
            <Category key={entry.id + Date.now()} {...entry} />
          ))}
        </div>
        <span className="title">Tags</span>
        <div className="container">
          {tags.map((entry) => (
            <Tag key={entry.id + Date.now()} {...entry} />
          ))}
        </div>
        <div className="container">
          <div className="container vertical">
            <span className="title">PostgreSQL Jokes</span>
            <div className="container vertical scroll">
              {jokes.map((entry) => (
                <Joke key={entry.id + Date.now()} {...entry} />
              ))}
            </div>
          </div>
          <div className="separator" />
          <div className="container vertical">
            <span className="title">MongoDB Jokes</span>
            <div className="container vertical scroll">
              {mongoJokes.map((entry) => (
                <Joke key={entry.id + Date.now()} {...entry} />
              ))}
            </div>
          </div>
        </div>
        <CreateJoke
          onSubmit={onJokeSubmit}
          categories={categories}
          tags={tags}
        />
      </div>
    </div>
  );
};
