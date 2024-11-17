import React, { FC } from "react";
import logo from "../assets/logo.png";
import "../App.css";
import { Category, Joke, Tag } from "../components";
import { useJokes } from "../hooks";

export const Assignment3: FC = () => {
  const { jokes, categories, tags, setRegion, removeJoke, modifyJoke } = useJokes();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Select region</p>
        <div className="button-container">
          <button onClick={() => setRegion(1)}>Region 1</button>
          <button onClick={() => setRegion(2)}>Region 2</button>
          <button onClick={() => setRegion(3)}>Region 3</button>
        </div>
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
        <span className="title">Jokes</span>
        <div className="container wrap">
          {jokes.map((entry) => (
            <Joke key={entry.id + Date.now()} {...entry} onDelete={(entry) => removeJoke(entry.id)} onEdit={modifyJoke} />
          ))}
        </div>
      </div>
    </div>
  );
}
