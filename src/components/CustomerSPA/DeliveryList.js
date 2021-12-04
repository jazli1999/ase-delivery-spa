import React from 'react';
import { List, Avatar, Empty, Button} from 'antd';
import packetIcon from '../../resources/packet.png';


class DeliveryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            deliveries: null,
            category: props.category,
        });
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let newData;
        if(this.state.category === 'active') {
            newData = [
                    {
                        tracking_code: 123456,
                        created_date: '2021-11-22',
                    },
                    {
                        tracking_code: 123457,
                        created_date: '2021-11-30',
                    }
                ];
        } else if (this.state.category === 'past') {
            newData = [
                    {
                        tracking_code: 223456,
                        created_date: '2021-11-22',
                    },
                    {
                        tracking_code: 223457,
                        created_date: '2021-11-30',
                    }
                ];
        }
        this.setState({deliveries: newData.sort(this.compareDeliveries)});
    }

    compareDeliveries(a, b) {
        return Date.parse(b.created_date) - Date.parse(a.created_date);
    }

    render() {
        return <div style={{textAlign: "start", maxWidth: "500px", margin: "auto"}}>
            {!this.state.deliveries && <Empty description="No deliveries yet"/>}
            {this.state.deliveries && <List itemLayout="horizontal"
                dataSource={this.state.deliveries}
                renderItem={
                    item => (
                        <List.Item
                        actions={[<Button>track</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={packetIcon}/>}
                                title={`No. ${item.tracking_code}`}
                                description={`created on: ${item.created_date}`}
                            />
                        </List.Item>
                    )
                } />}
        </div>;
    }
}

export default DeliveryList;