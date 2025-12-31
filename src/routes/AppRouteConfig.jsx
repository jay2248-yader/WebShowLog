import { lazy } from 'react';

const HomeScreen = lazy(() => import('../Screen/HomeScreen'));
const ShowLogScreen = lazy(() => import('../Screen/ShowLogScreen'));


export const ROUTES = [
  {
    path: '/home',
    element: HomeScreen,
  },
  {
    path: '/:logType',
    element: ShowLogScreen,
  },
];
