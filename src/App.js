import React from 'react';
import { Layout, Button } from 'antd';
import  AppHeader  from './components/AppHeader.js';
import './App.less';

class App extends React.Component {
  render() {
    const { Header, Content } = Layout;
    return (
      <div>
        <Header id="header"><AppHeader /></Header>
        <Content id="content"><Button>Button</Button></Content>
      </div>
    )
  }
}

export default App;
