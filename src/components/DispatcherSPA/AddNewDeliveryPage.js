import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Input, Modal, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { addDelivery } from './deliverySlice';

export default function AddNewDeliveryPage(props) {
    const [customerUsername, setCustomerUsername] = useState('')
    const [delivererUsername, setDelivererUsername] = useState('')
    const [boxID, setBoxID] = useState('')

    const onCustomerUsernameChanged = e => setCustomerUsername(e.target.value)
    const onDelivererUsernameChanged = e => setDelivererUsername(e.target.value)
    const onBoxIDChanged = e => setBoxID(e.target.value)

    const dispatch = useDispatch()

    return (
        <Modal
            title={"Create "+props.activeTabName}
            visible={props.visible}
            onOk={() => {
                if (customerUsername && delivererUsername && boxID) {
                    dispatch(
                        addDelivery({
                            customerUsername,
                            delivererUsername,
                            boxID,
                        })
                    )
                }
                props.handleOk(props.handleOk);
            }}
            onCancel={props.handleCancel}
        >
            <Row gutter={8}>
                <Col span={5}>
                    <p>Customer Username:</p>
                </Col>
                <Col span={15}>
                    <Input
                    placeholder="Enter customer username"
                    value={customerUsername}
                    onChange={onCustomerUsernameChanged}
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
                    value={delivererUsername}
                    onChange={onDelivererUsernameChanged}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>ID:</p>
                </Col>
                <Col span={15}>
                    <Input
                    value={boxID}
                    onChange={onBoxIDChanged}
                    placeholder="Enter box ID" />
                </Col>
            </Row>
        </Modal>
    )
}