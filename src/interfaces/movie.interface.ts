export interface Movie {
  backdrop_path: string
  id: number
  title: string
  vote_average: number
  poster_path: string
  overview: string
  release_date: string
  genre_ids: number[]
}

export interface MovieLink {
  link: string;
  rent: MovieProvider[];
  flatrate: MovieProvider[];
  buy: MovieProvider[];
}

interface MovieProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface Genre {
  id: number;
  name: string;
}