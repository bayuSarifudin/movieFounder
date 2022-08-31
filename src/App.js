import './App.css';
import searchIcon from './search.svg';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

// Here is your OMDB API key: efa5570d

const API_URL = 'http://www.omdbapi.com?apikey=efa5570d';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const clear = () => {
		setSearchTerm('');
	};

	const searchMovie = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();

		setMovies(data.Search);
		clear();
	};

	useEffect(() => {
		searchMovie('');
	}, []);

	return (
		<div className="app">
			<h1>Movie Founder</h1>

			<div className="search">
				<input
					type="text"
					placeholder="Search for Movies"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<img
					src={searchIcon}
					alt="search"
					onClick={() => searchMovie(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => {
						return <MovieCard movie={movie} />;
					})}
				</div>
			) : (
				<div className="empty">
					<h2>No Movies Found</h2>
				</div>
			)}
		</div>
	);
}

export default App;
