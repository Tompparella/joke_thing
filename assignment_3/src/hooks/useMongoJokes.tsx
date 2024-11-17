import { useCallback, useEffect, useState } from "react";
import { fetchMongo, postMongoJoke } from "../util";
import { CreateJoke, JokeResponse } from "../types";

export const useMongoJokes = () => {
  const [jokes, setJokes] = useState<JokeResponse[]>([]);
  const [jokesCreated, setJokesCreated] = useState(0);
  const sendJoke = useCallback(
    async (value: CreateJoke, region: number) => {
      await postMongoJoke({ ...value, regionId: region });
      setJokesCreated((prev) => prev + 1); // Trigger refetch
    },
    [setJokesCreated]
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
  }, [jokesCreated]);
  return { jokes, sendJoke };
};
