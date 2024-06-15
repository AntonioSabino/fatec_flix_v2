import './FavoriteMovies.css';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList';
import { Movie } from '../../interfaces/movie.interface';
import { Navigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../utils/api'; // Importar a função fetchMovieDetails aqui

function FavoriteMovies() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (user.isLoggedIn) {
                try {
                    const response = await fetch('http://localhost:8080/fatec/api/getFavoritos.php', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar favoritos');
                    }

                    const data = await response.json();
                    console.log(data); // Verificar se os dados estão sendo recebidos corretamente

                    // Criar a lista de Promises para buscar os detalhes de cada filme
                    const fetchPromises = data.map(async (item: { movie_id: number; }) => {
                        try {
                            const movieDetails = await fetchMovieDetails(item.movie_id);
                            return movieDetails;
                        } catch (error) {
                            console.error(`Erro ao buscar detalhes do filme ${item.movie_id}:`);
                            return null; // Tratar erro como necessário
                        }
                    });

                    // Aguardar todas as Promises serem resolvidas
                    const movieDetailsArray = await Promise.all(fetchPromises);

                    // Filtrar e remover filmes que não foram encontrados
                    const filteredMovieDetails = movieDetailsArray.filter((movie) => movie !== null) as Movie[];

                    setMovies(filteredMovieDetails);
                } catch (error) {
                    console.error('Erro ao buscar favoritos');
                }
            }
        };

        fetchData();
    }, [user.isLoggedIn]);

    if (!user.isLoggedIn) {
        return (
            <Navigate to='/signin' replace={true} />
        );
    }

    return (
        <>
            <h2 className='favorite-title'>Meus filmes favoritos</h2>
            <MovieList movies={movies} title='' />
        </>
    );
}

export default FavoriteMovies;
