import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Home from './pages/home/Home';
import Recipes from './pages/recipes/Recipes';
import AddRecipes from './pages/addRecipes/AddRecipes';
import Sidebar from './components/sidebar/Sidebar';
import NotFound from './pages/notFound/NotFound';

const { Content } = Layout;

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Layout hasSider className="app">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="add" element={<AddRecipes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
