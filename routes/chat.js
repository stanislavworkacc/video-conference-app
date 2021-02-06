const {Router} = require('express')
const router = Router();
const { v4: uuidV4 } = require('uuid')


router.get('/', (req, res) => {
        res.redirect(`/${uuidV4()}`)
})

router.get('/:room', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

        res.render('room', {
                title: 'Чат',
                roomId: req.params.room
        })
})

module.exports = router;