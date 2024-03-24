const Reservation = require('../models/reservationModel')

const get = async (req, res) => {
    try{
        const {id} = req.body
        const reservations = await Reservation.find()
                            .populate({
                                path:'user',
                                select: '_id email'
                            })
                            .populate({
                                path: 'schedule',
                                select: '_id start end room',
                                populate: {
                                    path: 'room',
                                    model: 'Room',
                                    select: 'name capacity'
                                }
                            })
        res.json({
            reservations
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const create = async (req, res) => {

    try{
        const {user, room, schedule} = req.body
        const newReservation = new Reservation({
            user,
            room,
            schedule
        })
        const savedReservation = await newReservation.save()
        
        res.status(200).json({
            savedReservation
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try{
        const {user, room, schedule} = req.body
        const reservationUpdated = await Reservation.findOneAndUpdate(
            { _id: req.params.id },
            { user, room, schedule },
            { new: true }
        );
        
        res.status(200).json({
            reservationUpdated
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        return res.json(reservation);
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    get,
    create,
    update,
    remove
}