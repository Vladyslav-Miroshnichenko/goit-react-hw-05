import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const MovieCast = React.lazy(() => import("./components/MovieCast"));
const MovieReviews = React.lazy(() => import("./components/MovieReviews"));

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
