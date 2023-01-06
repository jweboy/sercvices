import Redis from 'ioredis';

const redis = new Redis('redis://default:461267b11bda4f79aaa2a0a3ef278bbb@apn1-allowed-lobster-33380.upstash.io:33380');

export default redis;
