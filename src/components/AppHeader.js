import React from 'react';
import './AppHeader.less';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { setUser } from './LoginPage/loginSlice'


function AppHeader() {
        const userRole = useSelector((state) => state.login.userRole);
        const dispatch = useDispatch();
        const headerStyle = {
            paddingLeft: '50px', 
            paddingRight: '50px',
            boxShadow: "0px 0px 8px rgba(208, 216, 243, 0.6)",
        }
        return (
            <div id="AppHeader" style={headerStyle}>
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