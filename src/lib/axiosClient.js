const axios = require('axios')

const axiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    },
})

module.exports = axiosClient