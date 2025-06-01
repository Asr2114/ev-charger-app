const express = require('express');
const Station = require('../models/Station');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const stations = await Station.find();
    res.json(stations);
});

router.post('/', auth, async(req, res) =>{
    const station = new Station(req.body);
    await station.save();
    res.json(station);
});

router.put('/:id', auth, async(req, res) => {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(station);
});

router.delete('/:id', auth, async(req, res)=>{
    await Station.findByIdAndDelete(req.params.id);
    res.json({message: 'Station Deleted'});
});

module.exports = router;

