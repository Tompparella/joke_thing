import { useCallback, useEffect, useState } from "react";
import { fetchApi, postJoke } from "../util";
import { Route } from "../constants";
import {
  CategoryResponse,
  CreateJoke,
  JokeResponse,
  TagResponse,
} from "../types";

export const useJokes = () => {
  const [region, setRegion] = useState(1);
  const [jokes, setJokes] = useState<JokeResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [jokesCreated, setJokesCreated] = useState(0);
  const sendJoke = useCallback(
    async (value: CreateJoke) => {
      await postJoke({ ...value, regionId: region });
      setJokesCreated((prev) => prev + 1); // Trigger refetch
    },
    [region, setJokesCreated]
  );
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
  }, [region, jokesCreated]);
  return { region, jokes, categories, tags, setRegion, sendJoke };
};
