import React, { FC, useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

type ApiResponse = {
  id: number;
  created_at: string;
  updated_at: string;
};

type JokeResponse = ApiResponse & {
  name: string;
  text: string;
  category: CategoryResponse;
  tags: TagResponse[];
};

type CategoryResponse = ApiResponse & {
  name: string;
  description: string;
};

type TagResponse = ApiResponse & {
  name: string;
  description: string;
};

const backendUrl = "http://localhost:5000/";

enum Route {
  Joke = "jokes",
  Category = "categories",
  Tag = "tags",
}

const fetchApi = async (route: Route, region: number) => {
  const res = await fetch(`${backendUrl}${route}?region=${region}`);
  if (!res.ok) {
    console.error("Failed to fetch");
    return null;
  }
  return res.json();
};

const Joke: FC<JokeResponse /*  & CategoryResponse & TagResponse[] */> = (
  props
) => {
  return (
    <div className="item joke">
      <div className="joke-attributes">
        <span className="info-title">{props.category.name}</span>
        <div>
          {props.tags.map((entry) => (
            <span key={`${entry.id}${new Date().getTime()}`} className="tag-name">{entry.name}</span>
          ))}
        </div>
      </div>
      <span className="joke-name">{props.name}</span>
      <span className="joke-text">{props.text}</span>
      <div className="joke-info">
        <div className="detail">
          <span className="info-title">ID:</span>
          <span>{props.id}</span>
        </div>
        <div className="detail">
          <span className="info-title">Created:</span>
          <span>{new Date(props.created_at).toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="info-title">Updated:</span>
          <span>{new Date(props.updated_at).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const Category: FC<CategoryResponse> = (props) => {
  return (
    <div className="item category">
      <span className="info-title">{props.name}</span>
      <span className="detail">{props.description}</span>
      <div className="joke-info">
        <div className="detail">
          <span className="info-title">ID:</span>
          <span>{props.id}</span>
        </div>
      </div>
    </div>
  );
};

const Tag: FC<TagResponse> = (props) => {
  return (
    <div className="item tag">
      <span className="joke-name">{props.name}</span>
      <span className="detail">{props.description}</span>
      <div className="joke-info">
        <div className="detail">
          <span className="info-title">ID:</span>
          <span>{props.id}</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [region, setRegion] = useState(1);
  const [jokes, setJokes] = useState<JokeResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [tags, setTags] = useState<TagResponse[]>([]);

  useEffect(() => {
    let active = true;
    const stuff = async () => {
      const tempJokes = active
        ? (await fetchApi(Route.Joke, region)) ?? []
        : [];
      const tempCategories = active
        ? (await fetchApi(Route.Category, region)) ?? []
        : [];
      const tempTags = active ? (await fetchApi(Route.Tag, region)) ?? [] : [];
      if (!active) return;
      setJokes(tempJokes);
      setCategories(tempCategories);
      setTags(tempTags);
    };
    stuff();
    return () => {
      active = false;
    };
  }, [region]);

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
        <div className="container">
          {jokes.map((entry) => (
            <Joke key={entry.id + Date.now()} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
