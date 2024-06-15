import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieLink } from "../../interfaces/movie.interface";
import { fetchMovieDetails, fetchMovieWatchProviders } from "../../utils/api";
import "./MovieDetail.css";

const MovieDetail = ({ setProgress }: { setProgress: React.Dispatch<React.SetStateAction<number>> }) => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie);
  const [providers, setProviders] = useState<MovieLink>({} as MovieLink);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const links = [
    {
      provider_id: 119,
      movie_id: 603692,
      link: "https://www.primevideo.com/-/pt/detail/0OPU861X5ZA4ETQFV906HPCQ1T/ref=atv_dl_rdr?tag=justbrrsjd-20",
    },
    {
      provider_id: 119,
      movie_id: 245891,
      link: "https://www.primevideo.com/-/pt/detail/0QSV36C6S10IZ3NOZILJ71VZ9C/ref=atv_dl_rdr?tag=justbrrsjd-20",
    },
    {
      provider_id: 307,
      movie_id: 245891,
      link: "https://globoplay.globo.com/john-wick-de-volta-ao-jogo/t/xjjRq58GYJ/",
    },
    {
      provider_id: 484,
      movie_id: 245891,
      link: "https://www.clarotvmais.com.br/filme/john-wick-de-volta-ao-jogo/2537669",
    },
    {
      provider_id: 227,
      movie_id: 245891,
      link: "https://www.telecine.com.br/",
    },
    {
      provider_id: 119,
      movie_id: 324552,
      link: "https://www.primevideo.com/-/pt/detail/0IUK3B812OE0SHGE6669S2F27R/ref=atv_dl_rdr?tag=justbrrsjd-20",
    },
    {
      provider_id: 307,
      movie_id: 324552,
      link: "https://globoplay.globo.com/john-wick-um-novo-dia-para-matar/t/9sxcgDQCKP/",
    },
    {
      provider_id: 119,
      movie_id: 458156,
      link: "https://www.primevideo.com/-/pt/detail/0O733T1H6OITZW94X3B2NU9HNN/ref=atv_dl_rdr?tag=justbrrsjd-20",
    },
    {
      provider_id: 307,
      movie_id: 458156,
      link: "https://globoplay.globo.com/john-wick-3-parabellum/t/NNRjmsDsT1/",
    },
    {
      provider_id: 227,
      movie_id: 458156,
      link: "https://www.telecine.com.br/",
    },
  ];
  
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [])

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await fetchMovieDetails(Number(id));
      setMovieDetails(movie);
      const providers = await fetchMovieWatchProviders(Number(id));
      setProviders(providers);
    };

    fetchMovie().catch(console.error);
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsInFavorites(
      favorites.some((fav: Movie) => fav.id === movieDetails.id)
    );
  }, [movieDetails.id]);

  const handleAddToFavorites = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.isLoggedIn) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const myInit = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                user_id: user.id,
                movie_id: movieDetails.id
            }),
        };

        fetch("http://localhost:8080/fatec/api/salvarFavoritos.php", myInit)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === "success") {
                    console.log("Favorito adicionado com sucesso.");
                } else {
                    console.log("Erro ao adicionar favorito:", data.message);
                }
            })
            .catch((error) => {
                console.error("Erro ao adicionar favorito:", error.message);
            });

    } else {
        console.log("O usuário não está logado.");
    }
};


  const handleRemoveFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.filter(
      (fav: Movie) => fav.id !== movieDetails.id
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    console.log("Filme removido dos favoritos.");

    setIsInFavorites(!isInFavorites);
  };

  const findLink = (providerId: number, movieId: number) => {
    const linkObj = links.find(
      (link) => link.provider_id === providerId && link.movie_id === movieId
    );
    return linkObj ? linkObj.link : "#";
  };

  if (movieDetails) {
    return (
      <>
        <div
          className="movie-detail-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
          }}
        ></div>
        <div className="movie-detail-container" style={{}}>
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className="movie-detail-info">
            <h1>{movieDetails.title}</h1>
            <p>{movieDetails.overview}</p>

            

            <span className="movie-detail-info2">
              <span>
              <p>Avaliação: </p>
              <p> 
                 {movieDetails.vote_average
                  ? movieDetails.vote_average.toFixed(2)
                  : ""}
              </p>
                  <img
                    className="movie-icon-small-details"
                    src="https://cdn-icons-png.flaticon.com/128/9715/9715468.png"
                    alt=""
                  />
              </span>
              <span>

              <p>Data de lançamento: </p>
              <p>
                {movieDetails.release_date
                  ? movieDetails.release_date.substring(0, 4)
                  : ""}
              </p>
              </span>
            </span>

            {isInFavorites ? (
              <button
                onClick={handleRemoveFromFavorites}
                className="remove-from-favorites"
              >
                Remover dos Favoritos
              </button>
            ) : (
              <button
                onClick={handleAddToFavorites}
                className="add-to-favorites"
              >
                Adicionar aos Favoritos
              </button>
            )}
            <div className="providers-info">
              <h3>Streaming</h3>
              <ul>
                {providers?.flatrate?.length === undefined ? (
                  <li>Não disponível</li>
                ) : (
                  providers?.flatrate?.map((provider) => (
                    <li
                      key={provider.provider_id}
                      onClick={() =>
                        window.open(
                          findLink(provider.provider_id, movieDetails.id),
                          "_blank"
                        )
                      }
                      id={provider.provider_id.toString()}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={`${provider.provider_name} logo`}
                        className="provider-logo"
                      />
                    </li>
                  ))
                )}
              </ul>
              <h3>Alugar</h3>
              <ul>
                {providers?.rent?.length === undefined ? (
                  <li>Não disponível</li>
                ) : (
                  providers?.rent?.map((provider) => (
                    <li key={provider.provider_id}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={`${provider.provider_name} logo`}
                        className="provider-logo"
                      />
                    </li>
                  ))
                )}
              </ul>
              <h3>Comprar</h3>
              <ul>
                {providers?.buy?.length === undefined ? (
                  <li>Não disponível</li>
                ) : (
                  providers?.buy?.map((provider) => (
                    <li key={provider.provider_id}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={`${provider.provider_name} logo`}
                        className="provider-logo"
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="comments-container">
          <h1>Comentários:</h1>
          <div className="comments">
            <div className="comment">
              <img
                src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                alt=""
                className="comment-icon"
              />
              <p>"{movieDetails.title}" me surpreendeu do início ao fim! A história é envolvente e os efeitos visuais são simplesmente incríveis. Vale cada minuto!</p>
            </div>
            <div className="comment">
              <img
                src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                alt=""
                className="comment-icon"
              />
              <p>Não consegui desgrudar os olhos da tela! "{movieDetails.title}" tem uma narrativa cativante e personagens muito bem desenvolvidos. Recomendo fortemente!</p>
            </div>
            <div className="comment">
              <img
                src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                alt=""
                className="comment-icon"
              />
              <p>Que filme maravilhoso! "{movieDetails.title}" combina ação, emoção e uma trilha sonora espetacular. Mal posso esperar para assistir de novo!</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MovieDetail;
