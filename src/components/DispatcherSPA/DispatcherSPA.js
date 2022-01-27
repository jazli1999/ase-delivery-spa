import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { setPanel } from './dispatcherSlice';
import AddNewUserPage from './AddNewUserPage';
import AddNewDeliveryPage from './AddNewDeliveryPage';
import AddNewBoxPage from './AddNewBoxPage';
import EditUserPage from './EditUserPage';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const onSearch = value => console.log(value);

const TAB_LIST = [
    {
        key: 'customer',
        tab: 'Customer',
    },
    {
        key: 'deliverer',
        tab: 'Deliverer',
    },
    {
        key: 'dispatcher',
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
        render: text => <a href="https://google.com">{text}</a>,
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
                <a onClick={() => { console.log('clicked') }}>Edit {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
]

class DispatcherSPA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAction: null,
            modalData: null,
        };
    }

    /**
     * @param modalAction 'create'|'edit'|null, where null means no modal will be shown
     */
    showModal = (modalAction, modalData) => {
        this.setState({ modalAction, modalData });
    };

    handleOk = () => {
        this.setState({ modalAction: null });
    };


    handleCancel = (actionType, modalType) => {
        this.setState({ modalAction: null });
    };

    // make a loop for menu items
    render() {
        console.log(this.props);
        const menuList = TAB_LIST.map(({key, tab}) =>
            <Menu.Item key={key}
                onClick={() => { this.props.setPanel(key) }}
            >
                {tab}
            </Menu.Item>
        );

        const userColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                        <a onClick={() => {
                            this.showModal('edit', record);
                        }}>Edit {record.name}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];

        let modalComponent;
        if (this.state.modalAction !== null) {
            switch (this.props.currentTab) {
                case 'customer':
                case 'deliverer':
                case 'dispatcher':
                    modalComponent = this.state.modalAction === 'create' ? AddNewUserPage : EditUserPage;
                    break;
                case 'delivery':
                    modalComponent = AddNewDeliveryPage;
                    break;
                case 'box':
                    modalComponent = AddNewBoxPage;
                    break;
            }
        }
        const modal = modalComponent && React.createElement(modalComponent, {
            actionType: this.state.modalAction,
            activeTabName: this.props.currentTab,
            visible: true,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            defaultData: this.state.modalData,
        });

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
                            <Search placeholder={"input search " + this.props.currentTab} onSearch={onSearch} style={{ width: 300 }} />
                        </Space>
                        <Button key="1" style={{ verticalAlign: 'top' }} onClick={() => this.showModal('create', this.props.currentTab)}>{"Add " + this.props.currentTab}</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {this.props.currentTab === 'customer' && <Table columns={userColumns} dataSource={this.props.users} />}
                        {this.props.currentTab === 'deliverer' && <Table columns={userColumns} dataSource={data_deliverer} />}
                        {/* <List
                            header={<div>Name</div>}
                            bordered
                            dataSource={data}
                            renderItem={item => 
                            <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
                            >{item}</List.Item>}
                        /> */}
                        {/* {this.props.currentTab}
                        {!this.props.currentTab && <DelivererSPA />}
                        {this.props.currentTab === 'customer' && <CustomerSPA />} */}
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        <Pagination defaultCurrent={1} total={50} />
                    </Footer> */}
                </Layout>
            </Layout>
            {modal}
        </div>;
    }
}

//convert Redux's reducer function to react components' props (for class components to use)
const mapDispatchToProps = (dispatch) => {
    return {
        setPanel: (args) => dispatch(setPanel(args)),
        // addUser: (args) => dispatch(addUser(args)),
    }
};

//convert Redux's state to react components' props (for class components to use)
const mapStateToProps = state => ({
    currentTab: state.dispatcher.currentTab,
    users: state.users,
});


export default connect(mapStateToProps, mapDispatchToProps)(DispatcherSPA);