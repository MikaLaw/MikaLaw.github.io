import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppRoute } from "./consts";
import { HomePage } from './pages/HomePage';
import { LoginPage } from "./pages/LoginPage";
import { MoviePage } from "./pages/MoviePage";
import { MyListPage } from "./pages/MyListPage";
import { NotFoundError } from "./pages/NotFoundError";
import { ReviewPage } from "./pages/ReviewPage";


export const router = createBrowserRouter(
    [
        {
            path: AppRoute.Root,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: AppRoute.Login,
                    element: <LoginPage />,
                },
                {
                    path: `${AppRoute.Films}/:id`,
                    element: <MoviePage />,
                },

                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: `${AppRoute.Films}/:id${AppRoute.Review}`,
                            element: <ReviewPage />,
                        },
                        {
                            path: `${AppRoute.MyList}`,
                            element: <MyListPage />,
                        },
                    ]
                },
                {
                    path: '*',
                    element: <NotFoundError />,
                },
            ],
        },
    ],
    { basename: '/React-film/dist', }
)