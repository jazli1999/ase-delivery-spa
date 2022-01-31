import { Card, Table, Tag, Modal, Button, message } from 'antd';
import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import TrackDetailPanel from '../Common/TrackDetailPanel';
import './DelivererSPA.less';
import { api_url, getXSRFToken } from '../Common/utils';

class DelivererSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: null,
            isConfirmModalVisible: false,
            isDetailModalVisible: false,
            activeDelivery: null,
            isWideScreen: window.innerWidth >= 600,
        }
    }

    addKey(list) {
        let count = 0;
        for (let item in list) {
            count += 1;
            list[item]['key'] = count;
        }
        return list;
    }

    componentDidMount() {
        this.getData();
    }

    parseData(data) {
        const status_codes = {
            "ORDERED": 0,
            "DELIVERING": 1,
            "DELIVERED": 2,
            "COMPLETE": 3
        };

        let newData = [];
        for (let i in data) {
            newData.push({
                key: data[i]['trackingCode'],
                tracking_code: data[i]['trackingCode'],
                customer_name: data[i]['customer']['username'],
                status: Math.max.apply(Math, data[i]['statuses'].map(function(o) { return status_codes[o.status]; })),
                station: data[i]['targetBox']['name'],
                box_no: data[i]['targetBox']['id']
            });
        }
        this.setState({ deliveries: newData});
    }

    getData() {
        const uid = this.props.uid;
        axios({
            method: 'GET',
            withCredentials: true,
            url: `${api_url}:8080/api/delivery/users/${uid}/deliveries`,
            headers: {
                'X-XSRF-TOKEN': getXSRFToken(),
            }
        }).then(response => {
            if (response.data) {
                this.parseData(response.data);
            } else {
                this.setState({
                    deliveries: []
                });
            }
        })
    }

    confirmDelivered() {
        console.log(this.state);
        axios({
            method: 'PUT',
            url: `${api_url}:8080/api/delivery/deliveries/${this.state.activeDelivery['tracking_code']}/delivering`,
            withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': getXSRFToken(),
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    isConfirmModalVisible: false,
                    isDetailModalVisible: false,
                    activeDelivery: null,
                });
                message.success('Delivery status updated');
            } else {
                message.error('Something went wrong');
            }
        })
        
    }

    getTag(status) {
        switch (status) {
            case 0:
                return <Tag color="volcano">Central Deposit</Tag>;
            case 1:
                return <Tag color="blue">Delivering</Tag>;
            case 2:
                return <Tag color="cyan">Delivered</Tag>;
            case 3:
                return <Tag color="green">Picked Up</Tag>;
            default:
                return <Tag color="red">Error</Tag>;
        }
    }

    openDetailModal(delivery) {
        this.setState({
            isDetailModalVisible: true,
            activeDelivery: delivery,});
    }

    closeConfirmModal() {
        this.setState({
            isConfirmModalVisible: false,
        });
    }


    render() {
        const cardStyle = {
            width: '95%',
            borderRadius: '12px',
            margin: 'auto',
            marginTop: '15px',
            textAlign: 'center',
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
        };

        const columns = [
            {
                title: 'Tracking Code',
                dataIndex: 'tracking_code',
                render: (text) => text.toUpperCase()
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (text) => this.getTag(text),
                filters: [
                    {
                        text: 'Central Deposit',
                        value: 0,
                    },
                    {
                        text: 'Delivering',
                        value: 1,
                    },
                    {
                        text: 'Delivered',
                        value: 2,
                    },
                    {
                        text: 'Picked Up',
                        value: 3,
                    }
                ],
                onFilter: (value, record) => record.status === value,
            },
            {
                title: 'Pickup Station',
                dataIndex: 'station',
                sorter: (a, b) => a.station.localeCompare(b.station),
            },
        ];

        if (this.state.isWideScreen) {
            columns.push({
                title: ' ',
                render: (_, record) => <Button onClick={() => {this.openDetailModal.bind(this)(record)}}>Detail</Button>
            });
        }

        return <div>
            <Card title="Delivery List" style={cardStyle}>
                <Table
                    style={{ maxWidth: '600px', margin: 'auto'}}
                    columns={columns}
                    dataSource={this.state.deliveries}
                    pagination={{ position: ['bottomCenter'], pageSize: 9 }}
                    onRow={(record) => {
                        return {
                            onClick: _ => {
                                if (!this.state.isWideScreen)
                                    this.setState({
                                        isDetailModalVisible: true,
                                        activeDelivery: record
                                    });
                            }
                        }
                    }}
                />
            </Card>
            <div style={{height: '15px'}}></div>
            {this.state.isDetailModalVisible && <Modal visible={this.state.isDetailModalVisible}
                title="Delivery Details"
                onCancel={() => { this.setState({ isDetailModalVisible: false, activeDelivery: false }) }}
                footer={
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => { this.setState({ isConfirmModalVisible: true }) }}>Confirm Picked Up</Button>
                    </div>
                }>
                <TrackDetailPanel trackingCode={this.state.activeDelivery.tracking_code} />
            </Modal>}
            {this.state.isConfirmModalVisible && <Modal visible={this.state.isConfirmModalVisible}
                title="CAUTION"
                style={{ textAlign: 'center' }}
                centered
                width={300}
                onCancel={this.closeConfirmModal.bind(this)}
                footer={
                    <div>
                        <Button type="primary" onClick={this.confirmDelivered.bind(this)}>Yes</Button>
                    </div>
                }
            >
                <div>
                    Do you confirm delivery <br /> <b>#{this.state.activeDelivery.tracking_code.toUpperCase()}</b><br /> has been picked up?
                </div>
            </Modal>}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        uid: state.login.uid
    }
}

export default connect(mapStateToProps)(DelivererSPA);