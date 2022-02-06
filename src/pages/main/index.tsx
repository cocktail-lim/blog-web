import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Menu from '@/components/menu';
import './index.scss';

const { Header } = Layout;

const Main: React.FC = () => {
  return (
    <Layout>
      <Header className='blog-header'>
        <div className='logo'>Blog</div>
        <Menu />
      </Header>
      <div className='main'>
        <Outlet />
      </div>
    </Layout>
  );
};

export default Main;
