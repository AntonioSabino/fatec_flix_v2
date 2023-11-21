import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={<DefaultLayout />}
			>
				<Route
					path='/'
					element={<Home />}
				/>
			</Route>
			<Route
				path='/login'
				element={<h1>Login</h1>}
			/>
		</>
	)
)

export default function Router() {
	return <RouterProvider router={router} />
}
