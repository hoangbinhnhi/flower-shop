import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routers'; 
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'; 

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? HeaderComponent : Fragment; 

          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                <>
                  <Layout />
                  <Page />
                </>
              } 
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;