const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const blacklist = []

app.listen(port, () => console.log(`server active on port ${port}`))

app.get('/', (req, res) => {
    let ipAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim()

    if (blacklist.includes(ipAddress)) {
        res.redirect('https://www.youtube.com/watch?v=8JTOHXAqpd4')
        return
    }

    fs.readdir(path.join(__dirname, '/public'), (err, files) => {
        if (!err) {
            const qrList = files.filter(file => ((file !== '.DS_Store') && (file[0] !== '.')))

            if (qrList.length > 0) {

                const randomFileNumber = Math.round(Math.random() * (qrList.length - 1))

                const fileName = qrList[randomFileNumber]

                blacklist.push(ipAddress)
                res.sendFile(path.join(__dirname, `/public/${fileName}`))
                return
            }

            res.send({ 'message': 'lol guess i messed up the code for this; lemme know on insta if you see this - https://instagram.com/nandan2702' })
            
        }
        console.log(err);
    })
})

app.get('/:literally-anything', (req, res) => {
    res.redirect('https://youtube.com/nandanv/videos')
})