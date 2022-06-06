const Room =require('../model/roomModel')

module.exports.getRoom=async(req,res)=>{
    try {
        const nameList =await Room.find({createdby:req.userId});

        if(nameList){
            res.json(nameList)
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports.createRoom =async(req,res)=>{
    try {
        const roomName = new Room ({
            room:req.body.room,
            createdby:req.userId,
        })
        const createData=await roomName.save();
        if(createData){
            res.send(createData)
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports.deleteRoom=async (req,res)=>{
    try {
        const List =  await Room.findByIdAndDelete(req.params.id)
        if(List){
            res.send("deleted Successfully")
        }
    } catch (error) {
        console.log(error)
    }
}
