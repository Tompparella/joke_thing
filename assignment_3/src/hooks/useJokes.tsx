import { useCallback, useEffect, useState } from "react";
import { deleteJoke, editJoke, fetchApi, postJoke } from "../util";
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
  const [modifications, setModifications] = useState(0);

  const sendJoke = useCallback(
    async (value: CreateJoke) => {
      await postJoke({ ...value, regionId: region });
      setModifications((prev) => prev + 1); // Trigger refetch
    },
    [region, setModifications]
  );
  const removeJoke = useCallback(
    async (id: number) => {
      try {
        await deleteJoke(id, region);
        setModifications((prev) => prev + 1); // Trigger refetch
      } catch (err) {
        alert(`Failed to edit: ${err}`);
      }
    },
    [region, setModifications]
  );
  const modifyJoke = useCallback(
    async (value: JokeResponse) => {
      try {
        const temp: CreateJoke & { id: number }= {
          id: value.id,
          name: value.name,
          text: value.text,
          categoryId: value.category.id,
          tags: value.tags.map(entry => entry.id),
          regionId: region,
        }
        await editJoke(temp, region);
        setModifications((prev) => prev + 1); // Trigger refetch
      } catch (err) {
        alert(`Failed to delete: ${err}`);
      }
    },
    [region, setModifications]
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
  }, [region, modifications]);
  return { region, jokes, categories, tags, setRegion, sendJoke, removeJoke, modifyJoke };
};
