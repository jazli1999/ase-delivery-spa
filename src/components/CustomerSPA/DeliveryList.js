import React from 'react';
import { List, Avatar, Empty, Button, Modal } from 'antd';
import TrackDetailPanel from './TrackDetailPanel';
import packetIcon from '../../resources/packet.png';


class DeliveryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            deliveries: null,
            category: props.category,
            isModalVisible: false,
            currentlyViewing: null,
        });
    }

    componentDidMount() {
        // this.updateData();
        this.mockGetData();
    }

    // updateData() {
    //     axios({
    //         method: 'GET',
    //         url: 'https://catfact.ninja/fact',
    //     }).then(response => {
    //         console.log(response.data);
    //     })
    // }

    mockGetData() {
        let newData;
        if (this.state.category === 'active') {
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
        this.setState({ deliveries: newData.sort(this.compareDeliveries) });
    }

    compareDeliveries(a, b) {
        return Date.parse(b.created_date) - Date.parse(a.created_date);
    }

    onTrackClicked(trackingCode) {
        this.setState({
            isModalVisible: true,
            currentlyViewing: trackingCode
        });
    }

    hideModal() {
        this.setState({
            isModalVisible: false
        });
    }

    confirmDelivered() {
        console.log(`confirm delivered ${this.state.currentlyViewing}`);
        this.setState({isModalVisible: false});
    }

    render() {
        return <div style={{ textAlign: "start", maxWidth: "500px", margin: "auto" }}>
            {!this.state.deliveries && <Empty description="No deliveries yet" />}
            {this.state.deliveries && <List itemLayout="horizontal"
                dataSource={this.state.deliveries}
                renderItem={
                    item => (
                        <List.Item
                            actions={[<Button onClick={_ => { this.onTrackClicked(item.tracking_code) }}>track</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={packetIcon} />}
                                title={`No. ${item.tracking_code}`}
                                description={`created on: ${item.created_date}`}
                            />
                        </List.Item>
                    )
                } />}
            <Modal title="Track Details" visible={this.state.isModalVisible}
                footer={
                    <div>
                        {this.state.category === "active" && <Button onClick={this.confirmDelivered.bind(this)}>Confirm Delievered</Button>}
                        <Button type="primary" onClick={() => { this.setState({ isModalVisible: false }) }}>Back</Button>
                    </div>}
                onCancel={() => { this.setState({ isModalVisible: false }) }}
                style={{ paddingTop: "10px" }}>
                <TrackDetailPanel trackingCode={this.state.currentlyViewing} />
            </Modal>
        </div>;
    }
}

export default DeliveryList;