const mongoose = require('mongoose')
const Meme = require('../database/models/meme.model');


exports.updateVote = async function(req, res) {

    console.log('running addVote route')

    // guard clause to make sure meme id is set
    if (!req.body.memeID || !req.body.userID ) return res.status(400).send({success: false, message: 'request missing vote info'})

    // queries meme objects to retrieve meme with ID from filter
    const meme = await Meme.findOne({_id: req.body.memeID})
    if(!meme) return res.status(400).send({success: false, message: "could not retrieve meme with id: " + req.body.memeID})
    console.log('successfully retrieved meme with ID: ' + meme._id)

    // stores votes in votes variable
    let votes = meme.votes
    if(!votes) return res.status(404).send({success: false, message: 'Meme votes could not be retrieved'})
    console.log('successfully retrieved ' + votes.length + ' vote(s)')

    // creates update object from request body
    const newVote = {
        _id: new mongoose.Types.ObjectId(),
        value: req.body.value,
        userID: req.body.userID,
        value: req.body.value,
        createdAt: Date.now()
    }

    // guard clause against missing or badly transcribed vote info
    if (!newVote._id || !newVote.userID || !newVote.value || !newVote.createdAt) return res.status(400).send({success: false, message: 'vote could not be added, because vote info was missing'})
    if (!(newVote.value === 1 || newVote.value === -1)) return res.status(400).send({success: false, message: "votes can only have value of 1 or -1"})

    // checks if votes array includes vote. If not, then adds vote. If yes, checks vot value and updates vote value
    const oldVote = votes.find((element) => element.userID === newVote.userID)

    if(!oldVote) {
        votes.push(newVote)
    } else if (oldVote.value == newVote.value) {
        votes = votes.filter((element) => element.userID !== newVote.userID)
    } else { 
        votes = votes.filter((element) => element.userID !== newVote.userID)
        votes.push(newVote)
    }

    // creates update variable and pushes new vote
    const update = { votes: votes }

    // find meme according to filter variable and update with votes array
    // source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    Meme.findOneAndUpdate({_id: req.body.memeID}, update, {new: true, strict: true}, function(error, meme){
        if(error){
            return res.status(404).send(error)
        }
        res.status(200).send(meme)
        console.log('successfully updated meme with id: ' + meme._id +', and added vote with id: ' + newVote._id)
    })
};



