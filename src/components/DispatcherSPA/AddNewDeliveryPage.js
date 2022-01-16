import React from 'react';
import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

export default function AddNewDeliveryPage(props) {

    return (
        <Modal title={"Create "+props.activeTabName} visible={props.visible}
        onOk={props.handleOk} onCancel={props.handleCancel}
        >
            <Row gutter={8}>
                <Col span={5}>
                    <p>Customer Username:</p>
                </Col>
                <Col span={15}>
                    <Input
                    placeholder="Enter customer username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>Deliverer Username:</p>
                </Col>
                <Col span={15}>
                    <Input
                    placeholder="Enter deliverer username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>ID:</p>
                </Col>
                <Col span={15}>
                    <Input placeholder="Enter box ID" />
                </Col>
            </Row>
        </Modal>
    )
}