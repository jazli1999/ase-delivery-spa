import React from 'react';
import { connect } from 'react-redux';
import { Radio, Modal, Row, Col, Select, message, Spin, Space, Steps } from 'antd';
import { LoadingOutlined, FormOutlined, ExportOutlined, DownSquareOutlined, CheckSquareOutlined } from '@ant-design/icons';
// import { UserOutlined } from '@ant-design/icons';
import { updateDelivery } from './deliverySlice';
import { api_url, codes_status } from '../Common/utils';
import axios from 'axios';

class EditDeliveryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trackingCode: this.props.defaultData.trackingCode,
            customerUsername: this.props.defaultData.customer,
            delivererUsername: this.props.defaultData.deliverer,
            boxName: this.props.defaultData.targetBox.name,
            statuses: this.props.defaultData.statuses,
            status: this.props.defaultData.status,
            deliverers: null,
            customers: null,
            boxes: null,
            visible: this.props.visible,
            curCustomer: null,
            curDeliverer: null,
            curBox: this.props.defaultData.targetBox.id,
            curStatus: this.props.defaultData.status
        };
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        let customer = this.state.customerUsername;
        axios({
            method: 'GET',
            url: `${api_url}/delivery/users?role=Deliverer`,
            withCredentials: true
        }).then(response => {
            this.setState({ deliverers: response.data });
            return axios({
                method: 'GET',
                url: `${api_url}/delivery/users?role=Customer`,
                withCredentials: true
            });
        }).then(response => {
            this.setState({ customers: response.data });
            return axios({
                method: 'GET',
                url: `${api_url}/delivery/users/${this.state.customerUsername}`,
                withCredentials: true
            }).then(response => {
                this.setState({ curCustomer: response.data['id'] });
                return axios({
                    method: 'GET',
                    url: `${api_url}/delivery/users/${this.state.delivererUsername}`,
                    withCredentials: true
                });
            }).then(response => {
                this.setState({ curDeliverer: response.data['id'] });
                return axios({
                    method: 'GET',
                    url: `${api_url}/delivery/boxes`,
                    withCredentials: true
                });
            }).then(response => {
                let boxes = response.data.filter(function (box) {
                    if (box.state === "AVAILABLE") return true;
                    if ((box.state === "FILLED" || box.state === "ASSIGNED") && box.customerName === customer) 
                        return true;
                    return false;
                });
                this.setState({boxes: boxes});
            }).catch(error => {
                console.log(error);
                message.error("Something went wrong...");
            })
        })
    }

    onCustomerChange(newCustomer) {
        this.setState({curCustomer: newCustomer});
    }

    onDelivererChange(newDeliverer) {
        this.setState({curDeliverer: newDeliverer});
    }

    onBoxChange(newBox) {
        this.setState({curBox: newBox});
    }

    changeStatus(newValue) {
        this.setState({curStatus: newValue});
    }

    async onUpdateConfirm() {
        let newStatuses = Object.assign([], this.state.statuses);
        if (this.state.curStatus < this.state.status) {
            newStatuses = newStatuses.slice(0, this.state.curStatus + 1);
        }
        if (this.state.curStatus > this.state.status) {
            for (let i = this.state.status + 1; i <= this.state.curStatus; i++) {
                let status = {
                    status: codes_status[i],
                    date: new Date().toISOString()
                };
                newStatuses.push(status);
            }
        }
        let newDelivery = {
            trackingCode: this.state.trackingCode,
            customer: {
                id: this.state.curCustomer,
            },
            deliverer: {
                id: this.state.curDeliverer,
            },
            targetBox: {
                id: this.state.curBox,
            },
            statuses: newStatuses,
        };
        await this.props.updateDelivery(newDelivery);
        this.props.handleCancel();
    }

    render() {
        const { Option } = Select;

        const delivererOptions = [];
        const customerOptions = [];
        const boxOptions = [];

        const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

        for (let i in this.state.deliverers) {
            let curDeliverer = this.state.deliverers[i];
            delivererOptions.push(<Option key={curDeliverer['id']}>{curDeliverer['username']}</Option>);
        }

        for (let i in this.state.customers) {
            let curCustomer = this.state.customers[i];
            customerOptions.push(<Option key={curCustomer['id']}>{curCustomer['username']}</Option>);
        }

        for (let i in this.state.boxes) {
            let curBox = this.state.boxes[i];
            boxOptions.push(<Option key={curBox['id']}>{curBox['name']}</Option>);
        }

        const ableToRender = this.state.curCustomer !== null && this.state.curDeliverer !== null 
                            && this.state.customers !== null  && this.state.deliverers !== null
                            && this.state.boxes !== null;


        const { Step } = Steps;

        return <Modal visible={this.props.visible}
            onOk={this.onUpdateConfirm.bind(this)}
            onCancel={this.props.handleCancel}
            optionFilterProp="children"
            title="Edit Delivery"
            filterOption={(input, option) => option.chilren.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {ableToRender &&
                <div style={{width: "100%"}}>
                    <Space direction="vertical" size={16} style={{width: "100%"}}>
                    <Row>
                        <Col span="24">
                                <Steps size="small" current={this.state.status}>
                                    <Step title="Ordered" icon={<FormOutlined />} />
                                    <Step title="Delivering" icon={<ExportOutlined />} />
                                    <Step title="Delivered" icon={<DownSquareOutlined />} />
                                    <Step title="Completed" icon={<CheckSquareOutlined />} />
                                </Steps>
                            </Col>
                        </Row>
                        <Row gutter={[16, 32]}>
                            <Col span={5} >
                                Customer
                            </Col>
                            <Col span={12}>
                                <Select style={{width: "100%"}}
                                    showSearch
                                    value={this.state.curCustomer}
                                    optionFilterProp="children"
                                    onChange={(value) => {this.onCustomerChange(value)}}
                                    filterOption={(input, option) => option.chilren.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {customerOptions}
                                </Select>
                            </Col>
                        </Row>

                        <Row gutter={[16, 32]}>
                            <Col span="5">
                                Deliverer
                            </Col>
                            <Col span="12">
                                <Select style={{width: "100%"}}
                                    showSearch
                                    value={this.state.curDeliverer}
                                    optionFilterProp="children"
                                    onChange={(value) => {this.onDelivererChange(value)}}
                                    filterOption={(input, option) => option.chilren.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {delivererOptions}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 32]}>
                            <Col span="5">
                                Target Box
                            </Col>
                            <Col span="12">
                                <Select style={{width: "100%"}}
                                    showSearch
                                    value={this.state.curBox}
                                    optionFilterProp="children"
                                    onChange={(value) => {this.onBoxChange(value)}}
                                    filterOption={(input, option) => option.chilren.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {boxOptions}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 32]} style={{marginBottom: "20px"}}>
                            <Col span="5">
                                Status
                            </Col>
                            <Col span={12}>
                                <Radio.Group  value={this.state.curStatus}>
                                    <Radio value={0} onChange={() => {this.changeStatus(0)}}>Ordered</Radio>
                                    <Radio value={1} onChange={() => {this.changeStatus(1)}}>Delivering</Radio>
                                    <Radio value={2} onChange={() => {this.changeStatus(2)}}>Delivered</Radio>
                                    <Radio value={3} onChange={() => {this.changeStatus(3)}}>Completed</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        
                    </Space>
                </div>
            }
            {!ableToRender && 
                <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
                    <Spin indicator={antIcon} size="large" style={{marginTop: 24, marginBottom: 24}}/>
                </div>
            }
        </Modal>
    }
}

const mapStateToProps = state => ({
    deliveries: state.delivery.deliveries,

});

const mapDispatchToProps = (dispatch) => {
    return {
        updateDelivery: (delivery) => dispatch(updateDelivery(delivery))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeliveryPage);