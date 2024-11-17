import { useCallback, useEffect, useState } from "react";
import { deleteMongoJoke, editMongoJoke, fetchMongo, postMongoJoke } from "../util";
import { CreateJoke, JokeResponse } from "../types";

export const useMongoJokes = () => {
  const [jokes, setJokes] = useState<JokeResponse[]>([]);
  const [modifications, setModifications] = useState(0);

  const sendJoke = useCallback(
    async (value: CreateJoke, region: number) => {
      await postMongoJoke({ ...value, regionId: region });
      setModifications((prev) => prev + 1); // Trigger refetch
    },
    [setModifications]
  );
  const removeJoke = useCallback(
    async (id: number) => {
      try {
        await deleteMongoJoke(id);
        setModifications((prev) => prev + 1); // Trigger refetch
      } catch (err) {
        alert(`Failed to edit: ${err}`);
      }
    },
    [setModifications]
  );
  const modifyJoke = useCallback(
    async (value: JokeResponse) => {
      try {
        const temp: CreateJoke & {id: number} = {
          id: value.id,
          name: value.name,
          text: value.text,
          categoryId: value.category.id,
          tags: value.tags.map(entry => entry.id),
          regionId: Number.NaN,
        }
        await editMongoJoke(temp);
        setModifications((prev) => prev + 1); // Trigger refetch
      } catch (err) {
        alert(`Failed to delete: ${err}`);
      }
    },
    [setModifications]
  );

  useEffect(() => {
    let active = true;
    const stuff = async () => {
      const tempJokes = active ? (await fetchMongo()) ?? [] : [];
      console.log(tempJokes);
      if (!active) return;
      setJokes(tempJokes);
    };
    stuff();
    return () => {
      active = false;
    };
  }, [modifications]);
  return { jokes, sendJoke, modifyJoke, removeJoke };
};
