import { Facility } from '../pages/Facility/Facility';
import { Home } from '../pages/Home/Home';
import { NewFacility } from '../pages/NewFacility/NewFacility';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/:town',
        element: <Home />,
    },
    {
        path: '/newFacility/:town',
        element: <NewFacility />,
    },
    {
        path: '/:town/:facility',
        element: <Facility />,
    },
    {
        path: '/',
        element: <LandingPage />,
    },
]);
