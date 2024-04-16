const Reservation = require('../models/reservationModel')
const Schedule = require('../models/scheduleModel')

const get = async (req, res) => {
    try{
        const reservations = await Reservation.find({"user": req.params.id})
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

        return res.status(200).json({
            status: 200,
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
        
        const {user, schedule} = req.body

        const userHasReservation = await Reservation.find({schedule, user})
        console.log(userHasReservation)
        if (userHasReservation && userHasReservation.length > 0) return res.status(400).json({
            status: 400,
            message: "You have already a reservation for this schedule."
        })
        
        const roomCapacity = await Schedule.findById({"_id": schedule})
                        .populate({
                            path: 'room',
                            select: 'capacity',
                        }).select('room')
        const currentReservations = await Reservation.find({schedule}).countDocuments()
        const availableCapacity = roomCapacity.room.capacity - currentReservations
        if(availableCapacity === 0){
            return res.status(400).json({
                status: 400,
                message: "Not capacity available"
            })
        }
        
        const newReservation = new Reservation({
            user,
            schedule
        })
        const savedReservation = await newReservation.save()

        res.status(201).json({
            status: 201,
            message: "Reservation created",
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
        
        res.status(201).json({
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
        return res.status(200).json({
            status:200,
            reservation}
        )
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