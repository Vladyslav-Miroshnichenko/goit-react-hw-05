import React, { useEffect, useState } from "react";
import { searchMovies, fetchTrendingMovies } from "../api";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        const results = await searchMovies(query);
        setMovies(results);
      } else {
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = e.target.search.value;
    setQuery(newQuery);
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for a movie"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={query ? movies : trendingMovies} />{" "}
    </div>
  );
};

export default MoviesPage;
