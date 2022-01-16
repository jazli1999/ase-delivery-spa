import React from 'react';
import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

export default function AddNewBoxPage(props) {

    return (
        <Modal title={"Create "+props.activeTabName} visible={props.visible}
        onOk={props.handleOk} onCancel={props.handleCancel}
        >
            <Row gutter={8}>
                <Col span={5}>
                    <p>Address:</p>
                </Col>
                <Col span={15}>
                    <Input placeholder="Enter Street Address" />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>ID:</p>
                </Col>
                <Col span={15}>
                    <Input placeholder="Enter Raspberry Pi ID" />
                </Col>
            </Row>
        </Modal>
    )
}