const {getAllUsers} = require('../user/user.controller');
const {getAllRents} = require('../rent/rent.controller');

const getUsersStats = () => {
    return new Promise((resolve, reject) => {
        const stats = {
            nbTotal: 0,
            nb24h: 'NC',
            nb7j: 'NC',
            nb1m: 'NC',
        };

        getAllUsers()
            .then(users => {
                stats.nbTotal = users.length;

                resolve(stats);
            })
            .catch((mongoResErr) => reject(mongoResErr));

    });
};

const getRentsStats = () => {
    return new Promise((resolve, reject) => {
        const stats = {
            nbTotal: 0,
            nb24h: 'NC',
            nb7j: 'NC',
            nb1m: 'NC',
        };

        getAllRents()
            .then(rents => {
                stats.nbTotal = rents.length;

                resolve(stats);
            })
            .catch((mongoResErr) => reject(mongoResErr));

    });
};

module.exports = {getUsersStats, getRentsStats};