export const api_url = 'http://localhost';

export function getXSRFToken() {
    return document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    .split('=')[1];
    
}