import { Card, Table, Tag, Modal, Space, Button } from 'antd';
import React from 'react'
import TrackDetailPanel from '../Common/TrackDetailPanel';
import './DelivererSPA.less';

class DelivererSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: null,
            isConfirmModalVisible: false,
            isDetailModalVisible: false,
            activeDelivery: null,
            activeTrackingCode: null,
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
        this.mockGetData();
    }

    mockGetData() {
        let newDeliveries = [
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
            {
                tracking_code: '123456',
                customer_name: 'Alice',
                status: 0,
                station: 'Garching',
                box_no: 1,
            },
            {
                tracking_code: '123457',
                customer_name: 'Bob',
                status: 1,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223456',
                customer_name: 'Bob',
                status: 2,
                station: 'Milbertshofen',
                box_no: 1,
            },
            {
                tracking_code: '223457',
                customer_name: 'Jane',
                status: 3,
                station: 'Petuelring',
                box_no: 1,
            },
        ];
        newDeliveries = this.addKey(newDeliveries);
        this.setState({ deliveries: newDeliveries });
    }

    confirmDelivered() {
        this.setState({
            isConfirmModalVisible: false,
            isDetailModalVisible: false,
            activeDelivery: null,
            activeTrackingCode: null,
        });
        console.log(`${this.state.activeDelivery.tracking_code} delivery confirmed`);
    }

    deliveryConfirmOpen(delivery) {
        this.setState({
            isConfirmModalVisible: true,
            activeDelivery: delivery,
            activeTrackingCode: delivery.tracking_code,
        });
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
                render: (text, row) => <Space>{text}{this.getTag(row.status)}</Space>
            },
            {
                title: 'Pickup Station',
                dataIndex: 'station',
                sorter: (a, b) => a.station.localeCompare(b),
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
                        <Button type="primary" onClick={() => { this.setState({ isConfirmModalVisible: true }) }}>Confirm Delivered</Button>
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
                    Do you confirm delivery <br /> <b>#{this.state.activeDelivery.tracking_code}</b><br /> has been delivered to <br /> <b>{this.state.activeDelivery.station}</b>?
                </div>
            </Modal>}
        </div>;
    }
}

export default DelivererSPA;