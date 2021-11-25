import React from 'react';
import './AppHeader.less';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { setUser } from './LoginPage/loginSlice'


function AppHeader() {
        const userRole = useSelector((state) => state.login.userRole);
        const dispatch = useDispatch();
        return (
            <div id="AppHeader" style={{paddingLeft: '50px', paddingRight: '50px'}}>
                <span id="AppName">ASE Delivery</span>
                <span id="userRole"> {userRole ? userRole : 'Guest'} </span>
                {userRole && 
                <Button style={{marginTop: '15px', marginLeft: '10px'}}
                    onClick={() => {dispatch(setUser({
                    userRole: null, username: null, uid: null
                }))}}> 
                Log out 
                </Button>}
            </div>);

}

export default AppHeader;