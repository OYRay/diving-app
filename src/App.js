import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage';

import { HomeOutlined, CompassOutlined, InfoCircleOutlined } from '@ant-design/icons';


import './App.css'

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ background: 'white'}}>
        <Header className='App-header'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <a href="/" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>
              Diving App
            </a>
            <Menu className="customMenu" 
                  theme='dark' 
                  mode="horizontal" 
                  defaultSelectedKeys={['1']} 
                  style={{ display: 'flex', backgroundColor: 'transparent', justifyContent: 'space-between', width: '20%' }}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              
              <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
       
          </div>
        </Header>
        <Content style={{ padding: '0 auto', marginTop: 0}}>
          <div style={{ background: 'white', padding: '5%', minHeight: 800 }}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Diving ©2023
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
