import { Card, Input, Button} from 'antd';
import React from 'react';
import uuid from 'react-uuid';
import DeliveryList from './DeliveryList';
import './CustomerSPA.less';
import '../Common/common.less';

class CustomerSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'active'
        };
    }

    onTabChanged(key) {
        this.setState({ activeKey: key });
    }

    render() {
        const inputStyle = {
            width: "calc(100% - 90px)",
            borderRadius: "5px",
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
            borderColor: "#c0afd9",
        };

        const tabList = [
            {
                key: 'active',
                tab: 'Active Deliveries',
            },
            {
                key: 'past',
                tab: 'Past Deliveries',
            },
        ];

        return <div>
            <div direction="horizontal" className="vertical-component">
                <span id="search-span">
                    <Input id="search" style={inputStyle} d="search" allowClear="true" bordered="true" placeholder="Search traking code" />
                </span>
                <Button id="search-button" type="primary"> Search </Button>
            </div>
            <Card id="card" className="vertical-component"
                tabList={tabList}
                activeTabKey={this.state.activeKey}
                onTabChange={key => { this.onTabChanged(key) }}>
                    <DeliveryList key={uuid()} category={this.state.activeKey} />
            </Card>
        </div>;
    }
}

export default CustomerSPA;