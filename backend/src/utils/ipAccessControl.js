import AccessControl from 'express-ip-access-control';

const options = {
    mode: 'allow',
    denys: [],
    allows: ['127.0.0.1', "::1", '192.168.0.0/16'],
    forceConnectionAddress: false,
    log: function (clientIp, access) {
        // console.log(clientIp + (access ? ' accessed.' : ' denied.'));
    },
    statusCode: 401,
    redirectTo: '',
    message: 'Unauthorized'
}

export default AccessControl(options);
