// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcEDdafyiyykgKxyJdZBQac8ihzAbn8K0VDTmh4FuRivjYxPjOd0ql90hC__QkW6UA9JEO5tsZar8KUcV6ITF3T9390QECeaZS2k-K3TqCJY3ZRLcrwc89ZwwHjRx3it6gfduQol_ht-Ykx3jGWssi5AmDTYZlAfmChXc74jhWh5EcZ9kGqA_g23TLmB2Zp_yl4xna'
let token = new Fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode());
