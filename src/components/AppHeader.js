import React from 'react';
import './AppHeader.less';

class AppHeader extends React.Component {
    render() {
        return <div id="AppHeader">
        <span id="AppName">ASE Delivery</span>
        <span id="Log">Login</span>
    </div>
    }
}

export default AppHeader;