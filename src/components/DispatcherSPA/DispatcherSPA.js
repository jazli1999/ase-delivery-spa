import { Layout, Menu, Input, Space, Button, Pagination, Table, Modal, Row, Col, } from 'antd';
import { AudioOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTab } from './dispatcherSlice';
import { getUsers, updateUser } from './usersSlice';
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

class DispatcherSPA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAction: null,
            modalData: null,
        };
    }

    componentDidMount() {
        this.props.getUsers();
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

        if (this.props.getUsersLoading) {
            return <p>Loading...</p>;
        }

        const menuList = TAB_LIST.map(({key, tab}) =>
            <Menu.Item key={key}
                onClick={() => { this.props.setCurrentTab(key) }}
            >
                {tab}
            </Menu.Item>
        );

        const userColumns = [
            {
                title: 'Name',
                dataIndex: 'username',
                key: 'username',
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
                        }}>Edit {record.username}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];

        const deliveryColumns = [];

        const boxColumns = [];

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
                        {this.props.currentTab === 'customer' && <Table columns={userColumns} dataSource={this.props.customers} />}
                        {this.props.currentTab === 'deliverer' && <Table columns={userColumns} dataSource={this.props.deliverers} />}
                        {this.props.currentTab === 'dispatcher' && <Table columns={userColumns} dataSource={this.props.dispatchers} />}
                        {this.props.currentTab === 'delivery' && <Table columns={deliveryColumns} dataSource={this.props.deliveries} />}
                        {this.props.currentTab === 'box' && <Table columns={boxColumns} dataSource={this.props.boxes} />}
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
        setCurrentTab: (args) => dispatch(setCurrentTab(args)),
        getUsers: () => dispatch(getUsers()),
    }
};

//convert Redux's state to react components' props (for class components to use)
const mapStateToProps = state => ({
    currentTab: state.dispatcher.currentTab,
    customers: state.users.customers,
    deliverers: state.users.deliverers,
    dispatchers: state.users.dispatchers,
    getUsersLoading: state.users.getUsersLoading,
});


export default connect(mapStateToProps, mapDispatchToProps)(DispatcherSPA);