import { backendUrl, Route } from "./constants";
import { CreateJoke } from "./types";

export const fetchApi = async (route: Route, region: number) => {
  const res = await fetch(`${backendUrl}${route}?region=${region}`);
  if (!res.ok) {
    console.error("Failed to fetch");
    return null;
  }
  return res.json();
};

export const fetchMongo = async () => {
  const res = await fetch(`${backendUrl}${Route.MongoJoke}`);
  if (!res.ok) {
    console.error("Failed to fetch");
    return null;
  }
  return res.json();
};

export const postMongoJoke = async (value: CreateJoke) => {
  const res = await fetch(`${backendUrl}${Route.MongoJoke}`, {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to post: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}

export const deleteMongoJoke = async (id: number) => {
  const res = await fetch(`${backendUrl}${Route.MongoJoke}`, {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to delete: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}

export const editMongoJoke = async (value: CreateJoke) => {
  const res = await fetch(`${backendUrl}${Route.MongoJoke}`, {
    method: 'PATCH',
    body: JSON.stringify(value),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to patch: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}

export const postJoke = async (value: CreateJoke) => {
  const res = await fetch(`${backendUrl}${Route.Joke}`, {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to post: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}

export const deleteJoke = async (id: number, region: number) => {
  const res = await fetch(`${backendUrl}${Route.Joke}`, {
    method: 'DELETE',
    body: JSON.stringify({id, region}),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to delete: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}

export const editJoke = async (value: CreateJoke, region: number) => {
  const res = await fetch(`${backendUrl}${Route.Joke}`, {
    method: 'PATCH',
    body: JSON.stringify({...value, region}),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to patch: ${JSON.stringify(res, null, 2)}`);
  }
  return res.json();
}
