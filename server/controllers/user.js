const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body
        const profile_pic = 'https://robohash.org/${username}.png'
        const db = req.app.get('db')

        //Checks if the user already has account
        const foundUser = await db.find_user_by_username({username})
        if(foundUser[0]){
            return res.status(400).send('Username is already taken')
        }

        //Hash & Salt password
        let salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.create_user({username, hash, profile_pic})
        
        //place user on a session, sending info to client-side
        req.session.user = newUser[0]
        res.status(201).send(req.session.user)

    },
    login: async(req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        //Checks if the user is already in the db
        const foundUser = await db.find_user_by_username({username})
        if(foundUser[0]){
            return res.status(404).send('Username not found')
        }
        //password check
        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
        if(!authenticated){
            return res.status(401).send('Incorrect password')
        }
        delete foundUser[0].password

        //Place the user ona  session, and send the info client-side
        req.session.user = foundUser[0]
        res.status(202).send(req.session.user)
    },
    logout: async(req, res) => {
        //clear user session
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async(req, res) => {
        if(req.session.user){
           res.send(req.session.user) 
        }else{
            res.sendStatus(404)
        }
    }
}