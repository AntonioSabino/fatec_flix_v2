import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignIn } from './components/Signin'
import { SignUp } from './components/Signup'
import Home from './pages/Home'
import DefaultLayout from './layouts/DefaultLayout'
import MovieDetail from './components/MovieDetail'
import FavoriteMovies from './pages/FavoriteMovies'
import Admin from './pages/admin'
import UserProfile from './pages/UserProfile'

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/signin'
					element={<SignIn />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/admin'
					element={<Admin />}
				/>
				<Route
					path='/'
					element={<DefaultLayout />}
				>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/favorites'
						element={<FavoriteMovies />}
					/>
					<Route
						path='/movie/:id'
						element={<MovieDetail />}
					/>
					<Route
						path='/profile'
						element={<UserProfile />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}

export default AppRouter
