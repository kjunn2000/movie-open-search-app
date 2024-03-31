export type Movie = {
  _index: string;
  _id: string;
  _score: number;
  _source: {
    directors: string[];
    release_date?: string;
    rating?: number;
    genres: string[];
    image_url: string;
    plot?: string;
    title: string;
    rank: number;
    running_time_secs?: number;
    actors: string[];
    year: number;
    type: string;
  };
};

export type OpenSearchCount = {
    relation: String;
    value: number;
}

export type MovieListResp = {
    hits: Movie[];
    total: OpenSearchCount;
}