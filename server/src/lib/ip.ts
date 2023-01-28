import ip from 'ip';

const host = ip.address();
const port = 3333;
const address = `http://${host}:${port}`;

export { host, port, address };
