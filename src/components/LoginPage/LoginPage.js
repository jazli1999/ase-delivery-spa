import React from 'react';
import { Card } from 'antd';
import LoginPanel from './LoginPanel';


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 'customer',
        };
    }

    onActiveTabKeyChanged(key) {
        this.setState({activeTabKey: key});
    }
    
    render() {
        const tabList = [
            {
                key: 'customer',
                tab: 'I\'m a customer',
            },
            {
                key: 'deliverer',
                tab: 'I\'m a deliverer',
            },
            {
                key: 'dispatcher',
                tab: 'I\'m a dispatcher'
            },
        ];

        const cardStyle = { 
            width: '80%', 
            borderRadius: '12px', 
            margin: 'auto',
            marginTop: '15px',
            textAlign: 'center',
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
         };

        return (
            <div id="loginPage">
                <Card style={cardStyle}
                    title="Log In"
                    tabList={tabList}
                    activeTabKey={this.state.activeTabKey}
                    onTabChange={key => {this.onActiveTabKeyChanged(key)}}>
                        <LoginPanel selectedRole={this.state.activeTabKey}/>
                </Card>
            </div>
        )
    }
}

export default LoginPage;