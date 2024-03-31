import { useEffect } from "react";
import { Movie, MovieListResp } from "../types/movie";

interface MovieListProps {
  movieList: MovieListResp | undefined; // Specify the expected type for movieList
}

function Movie(item: Movie) {
  return (
    <div className="flex flex-wrap justify-between md:w-1/4 px-4 py-2 rounded-lg shadow-md overflow-hidden">
      <a
        href={`https://www.imdb.com/title/${item._id}`}
        className="w-full h-48 bg-gray-100 rounded-l-lg overflow-hidden relative"
      >
        <img
          src={item._source.image_url}
          alt={item._source.title}
          className="w-full h-full object-cover absolute inset-0"
        />
      </a>
      <div className="flex-grow px-4 py-2">
        <h2 className="text-xl font-bold leading-tight mb-2">
          <a className="text-gray-200" href={`https://www.imdb.com/title/${item._id}`}>{item._source.title}</a>
        </h2>
        <p className="text-gray-500">{item._source.year || 'NA'} &mdash; {item._source.plot || 'NA'}</p>
      </div>
    </div>
  )
}

export function MovieList(props: MovieListProps) {

  const { movieList } = props;

  return (
    <div className="m-5">
    {
      movieList?.total?.value != 0 ? (
        <div>
          <p className="py-5">Found {movieList?.total?.value} results.</p>
          <div className="flex flex-wrap justify-between px-4 py-2 rounded-lg shadow-md">
            {movieList?.hits?.map((item: any) => (
              Movie(item)
            ))}
          </div>
        </div>
      ) : (
        <div>No records found.</div>
      )
    }
    </div>
  );
}