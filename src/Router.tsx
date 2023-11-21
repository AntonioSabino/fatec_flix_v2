import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignIn } from './components/Signin'
import { SignUp } from './components/Signup'
import Home from './pages/Home'
import DefaultLayout from './layouts/DefaultLayout'
import MovieDetail from './components/MovieDetail'

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
					path='/'
					element={<DefaultLayout />}
				>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/movie/:id'
						element={<MovieDetail />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}

export default AppRouter
