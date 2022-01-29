import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { addUser } from './usersSlice';

export default function AddNewUserPage(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [RFID, setRFID] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onRFIDChanged = e => setRFID(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const dispatch = useDispatch()


    return (
        <Modal 
            title={`${props.actionType} ${props.activeTabName}`} 
            visible={props.visible}
            onOk={() => {
                if (username && email && RFID && password) {
                    dispatch(
                        addUser({
                            username,
                            email,
                            RFID,
                            password,
                            role: props.activeTabName,
                        })
                    )
                }
                props.handleOk(props.handleOk);
            }} 
            onCancel={props.handleCancel} 
        >
            <Row gutter={8}>
                <Col span={5}>
                    <p>Username:</p>
                </Col>
                <Col span={15}>
                    <Input
                    placeholder="Enter username"
                    value={username}
                    onChange={onUsernameChanged}
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
                    placeholder="Email Address" 
                    value={email}
                    onChange={onEmailChanged}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>RFID:</p>
                </Col>
                <Col span={15}>
                    <Input 
                    placeholder="RFID" 
                    value={RFID}
                    onChange={onRFIDChanged}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>Password:</p>
                </Col>
                <Col span={15}>
                    <Input 
                    placeholder="Password" 
                    value={password}
                    onChange={onPasswordChanged}
                    />
                </Col>
            </Row>
        </Modal>
    )    
}