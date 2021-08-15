const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Bishal Pandit',
        email: 'bishalpandit17@gmail.com',
        password: bcrypt.hashSync('12345',10),
        isAdmin: true,
    },
    {
        name: 'Rajat Goyal',
        email: 'rajatgoyal32@gmail.com',
        password: bcrypt.hashSync('12345',10),
    },
    {
        name: 'Arpit Verwal',
        email: 'arpitverwa78@gmail.com',
        password: bcrypt.hashSync('12345',10),
    },
]

module.exports = users