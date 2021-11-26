import React from 'react';
import { Layout } from 'antd';
import AppHeader from './components/AppHeader.js';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage/LoginPage'
import CustomerSPA from './components/CustomerSPA/CustomerSPA.js';
import DelivererSPA from './components/DelivererSPA/DelivererSPA.js';
import DispatcherSPA from './components/DispatcherSPA/DispatcherSPA.js';
import './App.less';
// import { Counter } from './components/redux-demo/counter';

function App() {
  const { Header, Content } = Layout;
  const userRole = useSelector((state) => state.login.userRole);

  return (
    <div>
      <Header id="header"><AppHeader /></Header>
      {/* react redux demo below */}
      {/* <Counter /> */}
      <Content id="content">
        {!userRole && <LoginPage />}
        {userRole === 'customer' && <CustomerSPA />}
        {userRole === 'deliverer' && <DelivererSPA />}
        {userRole === 'dispatcher' && <DispatcherSPA />}
      </Content>
    </div>
  )
}

export default App;
