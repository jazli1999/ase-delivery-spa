import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Modal, Row, Col, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updateUser } from './UsersSlice';

export default function EditUserPage(props) {
    const key = props.defaultData.key;

    const [username, setUsername] = useState(props.defaultData.username);
    const [email, setEmail] = useState(props.defaultData.email);
    const [RFID, setRFID] = useState(props.defaultData.RFID);
    const [password, setPassword] = useState(props.defaultData.password);
    const [role] = useState(props.defaultData.role);
    const dispatch = useDispatch();

    const onUsernameChanged = e => setUsername(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onRFIDChanged = e => setRFID(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    return (
        <Modal 
            title={`${props.actionType} ${props.activeTabName}`}
            visible={props.visible}
            onOk={() => {
                if (username && email && RFID && password) {
                    dispatch(
                        updateUser({
                            user: {
                                key,
                                username,
                                email,
                                RFID,
                                password,
                                role,
                            },
                            role,
                        })
                    );
                }
                props.handleOk();
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
                    defaultValue={props.defaultData.name}
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
                    defaultValue={props.defaultData.email}
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
                    defaultValue={props.defaultData.RFID}
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
                    defaultValue={props.defaultData.password}
                    placeholder="Password" 
                    value={password}
                    onChange={onPasswordChanged}
                    />
                </Col>
            </Row>
        </Modal>
    )    
}