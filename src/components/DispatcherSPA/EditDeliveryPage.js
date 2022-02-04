import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Input, Modal, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updateDelivery } from './deliverySlice';

export default function EditDeliveryPage(props) {
    const [customerUsername, setCustomerUsername] = useState(props.defaultData.customerUsername)
    const [delivererUsername, setDelivererUsername] = useState(props.defaultData.delivererUsername)
    const [boxID, setBoxID] = useState(props.defaultData.boxID)
    const [statuses, setStatuses] = useState(props.defaultData.statuses)

    const onCustomerUsernameChanged = e => setCustomerUsername(e.target.value)
    const onDelivererUsernameChanged = e => setDelivererUsername(e.target.value)
    const onBoxIDChanged = e => setBoxID(e.target.value)
    const onStatusesChanged = e => setStatuses(e.target.value)

    const dispatch = useDispatch()

    return (
        <Modal
            title="Edit delivery"
            visible={props.visible}
            onOk={() => {
                if (customerUsername && delivererUsername && boxID) {
                    dispatch(
                        updateDelivery({
                            customerUsername,
                            delivererUsername,
                            boxID,
                            statuses,
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
                    <p>Box ID:</p>
                </Col>
                <Col span={15}>
                    <Input
                    value={boxID}
                    onChange={onBoxIDChanged}
                    placeholder="Enter box ID" />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <p>Statuses:</p>
                </Col>
                <Col span={15}>
                    <Input
                    value={statuses}
                    onChange={onStatusesChanged}
                    placeholder="Enter box ID" />
                </Col>
            </Row>
        </Modal>
    )
}