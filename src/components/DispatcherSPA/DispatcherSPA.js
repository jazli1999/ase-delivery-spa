import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal } from 'antd';
import {
    AudioOutlined,
} from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { setPanel } from './dispatcherSlice';

const { Header, Content, Footer, Sider } = Layout;

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = value => console.log(value);

const data_customer = [
    {
        key: '1',
        name: 'Customer1',
        email: 'cus1@gmail.com',
        RFID: 'HTRC11001T',
    },
    {
        key: '2',
        name: 'Customer2',
        email: 'cus2@gmail.com',
        RFID: 'HTRC11002T',
    },
    {
        key: '3',
        name: 'Customer3',
        email: 'cus3@gmail.com',
        RFID: 'HTRC11003T',
    },
];

const columns_customer = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'RFID',
        dataIndex: 'RFID',
        key: 'RFID',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
]

const data_deliverer = [
    {
        key: '1',
        name: 'Deliverer1',
        email: 'del11@gmail.com',
        RFID: 'CRTH11001T',
    },
    {
        key: '2',
        name: 'Deliverer2',
        email: 'del2@gmail.com',
        RFID: 'CRTH11002T',
    },
    {
        key: '3',
        name: 'Deliverer3',
        email: 'del3@gmail.com',
        RFID: 'CRTH11003T',
    },
];

const columns_deliverer = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'RFID',
        dataIndex: 'RFID',
        key: 'RFID',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit {record.name}</a>
                <a>Delete</a>
                <a>Assign Delivery</a>
            </Space>
        ),
    },
]

const cardStyle = {
    width: '95%',
    borderRadius: '12px',
    margin: 'auto',
    marginTop: '15px',
    textAlign: 'center',
    boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
};





class DispatcherSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = () => {
        this.setState({ isModalVisible: false });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };



    // make a loop for menu items
    render() {
        const tabList = [
            {
                key: 'customer',
                tab: 'Customer',
            },
            {
                key: 'deliverer',
                tab: 'Deliverer',
            },
            {
                key: 'dispacher',
                tab: 'Dispatcher',
            },
            {
                key: 'delivery',
                tab: 'Delivery',
            },
            {
                key: 'box',
                tab: 'Box',
            },
        ];

        const menuList = tabList.map((item) =>
            <Menu.Item key={item.key}
                onClick={() => { this.props.setPanel({ controlPanel: item.key }) }}
            >
                {item.tab}
            </Menu.Item>
        );

        return <div>
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        zIndex: 2,
                        left: 0,
                        textAlign: 'center',
                    }}
                >
                    <div className="title">{"Dispatcher Control Panel"}</div>
                    <div className="logo" />
                    <Menu mode="inline" defaultSelectedKeys={['4']}>
                        {menuList}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header style={{ zIndex: 1, width: '100%', lineHeight: 'normal', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <div className="logo" />
                        <Space direction="vertical">
                            <Search placeholder={"input search " + this.props.controlPanel} onSearch={onSearch} style={{ width: 300 }} />
                        </Space>
                        <Button key="1" style={{ verticalAlign: 'top' }} onClick={this.showModal}>{"Add " + this.props.controlPanel}</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {/* <Table columns={columns_customer} dataSource={data_customer} /> */}
                        {this.props.controlPanel === 'customer' && <Table columns={columns_customer} dataSource={data_customer} />}
                        {this.props.controlPanel === 'deliverer' && <Table columns={columns_deliverer} dataSource={data_deliverer} />}
                        {/* <List
                            header={<div>Name</div>}
                            bordered
                            dataSource={data}
                            renderItem={item => 
                            <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
                            >{item}</List.Item>}
                        /> */}
                        {/* {this.props.controlPanel}
                        {!this.props.controlPanel && <DelivererSPA />}
                        {this.props.controlPanel === 'customer' && <CustomerSPA />} */}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <Pagination defaultCurrent={1} total={50} />
                    </Footer>
                </Layout>
            </Layout>
            <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPanel: (args) => dispatch(setPanel(args))
    }
};

const mapStateToProps = state => ({
    controlPanel: state.dispatcher.controlPanel
});

export default connect(mapStateToProps, mapDispatchToProps)(DispatcherSPA);