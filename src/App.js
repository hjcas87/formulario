import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { AppRouter } from './routers/AppRouter';
import { DashboardRoute } from './routers/DashboardRoute';
import { store } from './store/store';

export const App = () => {
    
    return (
        <>
            <Provider store={ store }>
                <DashboardRoute />
            </Provider>
        </>
    )
}
