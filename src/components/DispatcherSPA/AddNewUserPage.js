import React from 'react';
import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';

export default function AddNewUserPage(props) {
    console.log(props.defaultData);
    return (
        <Modal title={props.actionType+props.activeTabName} visible={props.visible}
        onOk={props.handleOk} onCancel={props.handleCancel} 
        >
            <Row gutter={8}>
                <Col span={5}>
                    <p>Username:</p>
                </Col>
                <Col span={15}>
                    <Input
                    defaultValue={props.defaultData?.name}
                    placeholder="Enter username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>Email:</p>
                </Col>
                <Col span={15}>
                    <Input 
                    defaultValue={props.defaultData?.email}
                    placeholder="Email Address" />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>RFID:</p>
                </Col>
                <Col span={15}>
                    <Input placeholder="RFID" />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>Password:</p>
                </Col>
                <Col span={15}>
                    <Input placeholder="Password" />
                </Col>
            </Row>
        </Modal>
    )    
}