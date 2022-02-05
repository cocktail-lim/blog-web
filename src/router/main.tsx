import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

const Main = React.lazy(() => import('@/pages/main'));

export function suspensFunc(elementNode: ReactElement): ReactElement {
  return <React.Suspense fallback={null}>{elementNode}</React.Suspense>;
}

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={suspensFunc(<Main />)}></Route>
    </Routes>
  );
};

export default MainRouter;
