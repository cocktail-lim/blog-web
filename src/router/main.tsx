import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

const Main = React.lazy(() => import('@/pages/main'));
const Home = React.lazy(() => import('@/pages/home'));
const Article = React.lazy(() => import('@/pages/article'));

export function suspensFunc(elementNode: ReactElement): ReactElement {
  return <React.Suspense fallback={null}>{elementNode}</React.Suspense>;
}

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={suspensFunc(<Main />)}>
        <Route path='/' element={suspensFunc(<Home />)} />
        <Route path='article/:articleId' element={<Article />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There is nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default MainRouter;
