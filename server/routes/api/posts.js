const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Add post
router.post('/', async(req, res) => {
        const posts = await loadPostsCollection()
        await posts.insertOne({
            text: req.body.text,
            createdAt: new Date()
        })
        res.status(201).send()
    })
    // Get post
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).sort({
        "createdAt": -1
    }).toArray())

})

// Delete post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection()
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send()
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://abc123:michael123@cluster0-yavih.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true
        }
    )
    return client.db('vuexpress').collection('posts')
}

module.exports = router