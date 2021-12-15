import React from 'react';
import { Steps, Empty, Image, Row, Col, Divider } from 'antd'
import packetIcon from '../../resources/packet.png';
import './common.less';

class TrackDetailPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            tracks: null,
            assignedBox: null,
        };
    }

    componentDidMount() {
        //TODO update with axios
        this.mockUpdateData();
    }

    mockUpdateData() {
        this.setState({
            status: 2,
            tracks: [
                {
                    code: 0,
                    dateTime: '2021-11-15 15:30:29',
                },
                {
                    code: 1,
                    dateTime: '2021-11-16 10:27:20',
                },
                {
                    code: 2,
                    dateTime: '2021-11-16 14:10:20',
                }
            ],
            assignedBox: {
                boxId: '123123',
                name: 'Garching',
            }
        });
    }

    getDesc(i) {
        let desc;
        if (i < this.state.tracks.length) {
            desc = this.state.tracks[i].dateTime;
        } else {
            desc = '-';
        }
        return desc;
    }

    render() {
        const { Step } = Steps;
        return <div>
            {!this.state.status && <Empty description="Track details not available yet" />}
            {this.state.status &&
                <div>
                    <Row>
                        <Col><Image src={packetIcon} preview={false} width="70px" /></Col>
                        <Col style={{ marginLeft: "10px" }}>
                            <h3 style={{ margin: "10px 0px 0px 0px" }}>Pickup station for #{this.props.trackingCode}</h3>
                            <h2 style={{ margin: "0px", lineHeight: "90%" }}>{this.state.assignedBox.name}</h2>
                        </Col>
                    </Row>
                    <Divider style={{ margin: "0px 0px 15px 0px" }} />
                    <Steps direction="vertical" current={this.state.status} style={{ width: "89%", margin: "auto" }}>
                        <Step title="Arrived at the central deposit" description={this.getDesc(0)}></Step>
                        <Step title="Picked up by the deliverer" description={this.getDesc(1)}></Step>
                        <Step title="Arrived at the pick-up box" description={this.getDesc(2)}></Step>
                        <Step title="Picked up by customer" description={this.getDesc(3)}></Step>
                    </Steps>
                </div>
            }
        </div>;
    }
}

export default TrackDetailPanel;