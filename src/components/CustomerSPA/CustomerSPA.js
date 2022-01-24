import { Card, Input, Button} from 'antd';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import React from 'react';
import uuid from 'react-uuid';
import DeliveryList from './DeliveryList';
import axios from 'axios';
import '../Common/url';
import './CustomerSPA.less';
import '../Common/common.less';
import { api_url } from '../Common/url';

class CustomerSPA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'active',
            isSearchResult: false,
            searchKey: null,
            searchResult: null,
            deliveries: null,
        };
    }

    componentDidMount() {
        this.mockGetData();
    }

    onTabChanged(key) {
        this.setState({ activeKey: key }, () => {this.mockGetData()});
    }

    onSearchClick() {
        this.setState({isSearchResult: true}, () => {
            axios({
                method: 'GET',
                url: `${api_url}api/delivery/deliveries/${this.state.searchKey}`,
            }).then(response => {
                if (!response.data) {
                    this.setState({deliveries: []});
                } else {
                    let newData = [{
                        tracking_code: response.data['trackingCode'],
                        created_date: response.data['statuses'].filter(item => item.status === 'ORDERED')[0].date
                    }];
                    this.setState({deliveries: newData});
                }
            });
        });
    }

    mockReturnListData() {
        let newData;
        if (this.state.activeKey === 'active') {
            newData = [
                {
                    tracking_code: 123456,
                    created_date: '2021-11-22',
                },
                {
                    tracking_code: 123457,
                    created_date: '2021-11-30',
                }
            ];
        } else if (this.state.activeKey === 'past') {
            newData = [
                {
                    tracking_code: 223456,
                    created_date: '2021-11-22',
                },
                {
                    tracking_code: 223457,
                    created_date: '2021-11-30',
                }
            ];
        }
        this.setState({ deliveries: newData.sort(this.compareDeliveries) });
    }

    compareDeliveries(a, b) {
        return Date.parse(b.created_date) - Date.parse(a.created_date);
    }

    mockGetData() {
        // if (this.state.isSearchResult) {
        //     setTimeout(this.mockReturnSearchData.bind(this), 2000);
        // } else {
        //     setTimeout(this.mockReturnListData.bind(this), 2000);
        // }
        if (this.state.isSearchResult) {
            this.mockReturnSearchData();
        } else {
            this.mockReturnListData();
        }
    }

    mockReturnSearchData() {
        this.setState({
            deliveries: [{
                    tracking_code: 334567,
                    created_date: '2021-11-30',
            }]
        });
    }

    backToLists() {
        this.setState({isSearchResult: false}, () => {this.mockGetData()});
    }

    getSearchTitle() {
        return <div style={{position: 'relative', width: '100%', textAlign: 'center'}}>
            <Button type="link" onClick={this.backToLists.bind(this)} style={{position: 'absolute', left: '0px'}}><ArrowLeftOutlined />Back</Button>
            <span>Search Result</span>
        </div>;
    }

    searchChanged(e) {
        this.setState({
            searchKey: e.target.value
        });
    }

    render() {
        const inputStyle = {
            width: "calc(100% - 90px)",
            borderRadius: "5px",
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
            borderColor: "#c0afd9",
        };

        const tabList = [
            {
                key: 'active',
                tab: 'Active Deliveries',
            },
            {
                key: 'past',
                tab: 'Past Deliveries',
            },
        ];

        return <div>
            <div direction="horizontal" className="vertical-component">
                <span id="search-span">
                    <Input id="search" style={inputStyle} d="search" allowClear="true" bordered="true" placeholder="Search traking code" 
                    onChange={e => {this.searchChanged(e)}}/>
                </span>
                <Button id="search-button" type="primary" onClick={this.onSearchClick.bind(this)}> Search </Button>
            </div>
            {this.state.isSearchResult ? 
                <Card id="card" className="vertical-component"
                    title={this.getSearchTitle()}>
                    <DeliveryList key={uuid()} category={this.state.activeKey} deliveries={this.state.deliveries} />
                </Card>
            : <Card id="card" className="vertical-component"
                tabList={tabList}
                activeTabKey={this.state.activeKey}
                onTabChange={key => { this.onTabChanged(key) }}>
                    <DeliveryList key={uuid()} category={this.state.activeKey} deliveries={this.state.deliveries}/>
            </Card>}

        </div>;
    }
}

export default CustomerSPA;