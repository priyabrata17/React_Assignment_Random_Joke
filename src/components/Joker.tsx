import { useState, useEffect, useCallback } from "react";
import type { JokeType } from "../types/types";
import axios from "axios";

export default function Joker() {
  const URL = "https://official-joke-api.appspot.com/random_joke";
  const [joke, setJoke] = useState<JokeType | null>(null);

  const getJokes = useCallback(async () => {
    try {
      const res = await axios.get(URL);
      setJoke(res?.data);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    const firstJoke = async () => {
      try {
        const joke = await axios.get(URL);
        setJoke(joke?.data);
      } catch (error) {
        throw error;
      }
    };
    firstJoke();
  }, []);

  return (
    <>
      <div className="max-w-2xl w-full mx-auto p-4 my-4 bg-gray-50 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-center my-4">Random Jokes</h1>
        <p className="text-xl text-center my-4">{joke?.setup}</p>
        <p className="text-xl text-center my-4">{joke?.punchline}</p>
        <button
          onClick={getJokes}
          className="my-4 block mx-auto bg-green-500 p-2 text-[18px] rounded-md text-black
        hover:bg-green-600 hover:scale-110 hover:text-white transition delay-100"
        >
          Generate Joke
        </button>
      </div>
    </>
  );
}
