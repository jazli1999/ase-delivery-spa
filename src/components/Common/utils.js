import { Tag } from 'antd';

export const api_url = 'http://localhost:10789/api';

export function getXSRFToken() {
    return document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    .split('=')[1];
    
}

export function getTag(status) {
    switch (status) {
        case 0:
            return <Tag color="volcano">Central Deposit</Tag>;
        case 1:
            return <Tag color="blue">Delivering</Tag>;
        case 2:
            return <Tag color="cyan">Delivered</Tag>;
        case 3:
            return <Tag color="green">Picked Up</Tag>;
        default:
            return <Tag color="red">Error</Tag>;
    }
}