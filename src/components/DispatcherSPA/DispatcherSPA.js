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
                <a onClick={() => {console.log('clicked')}}>Edit {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
]

const userTabsSet = new Set(['customer', 'deliverer', 'dispatcher']);



class DispatcherSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddUserModalVisible: false,
            isAddDeliveryModalVisible: false,
            isAddBoxModalVisible: false,
            isEditUserModalVisible: false,
            isEditDeliveryModalVisible: false,
            isEditBoxModalVisible: false,
            editDefaultRecord: null,
        };
    }

    


    showModal = (actionType, modalType) => {
        console.log(modalType);
        console.log(userTabsSet.has(modalType));
        if (actionType == 'create') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isAddUserModalVisible: true });
            } else if (modalType == 'delivery') {
                this.setState({ isAddDeliveryModalVisible: true });
            } else if (modalType == 'box') {
                this.setState({ isAddBoxModalVisible: true });
            }
        }
        else if (actionType == 'edit') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isEditUserModalVisible: true });
            } else if (modalType == 'delivery') {
                this.setState({ isEditDeliveryModalVisible: true });
            } else if (modalType == 'box') {
                this.setState({ isEditBoxModalVisible: true });
            }
        }
    };

    handleOk = (actionType, modalType) => {
        if (actionType == 'create') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isAddUserModalVisible: false });
            } else if (modalType == 'delivery') {
                this.setState({ isAddDeliveryModalVisible: false });
            } else if (modalType == 'box') {
                this.setState({ isAddBoxModalVisible: false });
            }
        }
        else if (actionType == 'edit') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isEditUserModalVisible: false });
            } else if (modalType == 'delivery') {
                this.setState({ isEditDeliveryModalVisible: false });
            } else if (modalType == 'box') {
                this.setState({ isEditBoxModalVisible: false });
            }
        }
    };


    handleCancel = (actionType, modalType) => {
        if (actionType == 'create') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isAddUserModalVisible: false });
            } else if (modalType == 'delivery') {
                this.setState({ isAddDeliveryModalVisible: false });
            } else if (modalType == 'box') {
                this.setState({ isAddBoxModalVisible: false });
            }
        }
        else if (actionType == 'edit') {
            if (userTabsSet.has(modalType)) {
                this.setState({ isEditUserModalVisible: false });
            } else if (modalType == 'delivery') {
                this.setState({ isEditDeliveryModalVisible: false });
            } else if (modalType == 'box') {
                this.setState({ isEditBoxModalVisible: false });
            }
        }
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

        const menuList = tabList.map((item) =>
            <Menu.Item key={item.key}
                onClick={() => { this.props.setPanel({ controlPanel: item.key }) }}
            >
                {item.tab}
            </Menu.Item>
        );
        
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
                        <a onClick={() => {
                            this.setState({ editDefaultRecord: record });
                            this.showModal('edit', this.props.controlPanel);
                    }}>Edit {record.name}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ]

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
                        <Button key="1" style={{ verticalAlign: 'top' }} onClick={() => this.showModal('create',this.props.controlPanel)}>{"Add " + this.props.controlPanel}</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {/* <Table columns={columns_customer} dataSource={data_customer} /> */}
                        {this.props.controlPanel === 'customer' && <Table columns={columns_customer} dataSource={this.props.users} />}
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
                    {/* <Footer style={{ textAlign: 'center' }}>
                        <Pagination defaultCurrent={1} total={50} />
                    </Footer> */}
                </Layout>
            </Layout>
            <AddNewUserPage actionType='create '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isAddUserModalVisible}
                            handleOk={() => {this.handleOk("create", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("create",this.props.controlPanel)}}/>
            <AddNewDeliveryPage actionType='create '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isAddDeliveryModalVisible}
                            handleOk={() => {this.handleOk("create", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("create", this.props.controlPanel)}}/>
            <AddNewBoxPage actionType='create '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isAddBoxModalVisible}
                            handleOk={() => {this.handleOk("create", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("create", this.props.controlPanel)}}/>
            <EditUserPage actionType='edit '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isEditUserModalVisible}
                            defaultData={this.state.editDefaultRecord}
                            handleOk={() => {this.handleOk("edit", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("edit", this.props.controlPanel)}}/>
            <AddNewDeliveryPage actionType='edit '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isAddDeliveryModalVisible}
                            defaultData={this.state.editDefaultRecord}
                            handleOk={() => {this.handleOk("edit", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("edit", this.props.controlPanel)}}/>
            <AddNewBoxPage actionType='edit '
                            activeTabName={this.props.controlPanel} 
                            visible={this.state.isAddBoxModalVisible}
                            defaultData={this.state.editDefaultRecord}
                            handleOk={() => {this.handleOk("edit", this.props.controlPanel)}}
                            handleCancel={() => {this.handleCancel("edit", this.props.controlPanel)}}/>
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

// const mapUsersToProps = () => {
//     return {
//         setPanel: (args) => dispatch(setPanel(args))
//     }
// };


//convert Redux's state to react components' props (for class components to use)
const mapStateToProps = state => ({
    controlPanel: state.dispatcher.controlPanel,
    users: state.users,
});


export default connect(mapStateToProps, mapDispatchToProps)(DispatcherSPA);