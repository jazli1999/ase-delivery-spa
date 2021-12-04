import { Card, Input, Button, Space} from 'antd';
import React from 'react';
import './CustomerSPA.less';

class CustomerSPA extends React.Component {



    render() {
        const inputStyle = {
            width: "calc(100% - 90px)", 
            borderRadius: "5px",
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
            borderColor: "#c0afd9",
        };
        return <div>
            <div direction="horizontal" class="vertical-component">
                <span id="search-span">
                    <Input id="search" style={inputStyle} d="search" allowClear="true" bordered="true" placeholder="Search traking code" />
                </span>
                <Button id="search-button" type="primary"> Search </Button>
            </div>
            <Card id="card" class="vertical-component" title="TODO: Implement Customer SPA here" />
        </div>;
    }
}

export default CustomerSPA;