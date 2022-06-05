const express = require("express")
const cors =require('cors')
const mongoose=require('mongoose')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const userRoute=require('./routes/userRoutes')
const roomRoute=require('./routes/roomRoutes')

const PORT =process.env.PORT || 8080


app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use(cors())
app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
    res.redirect(`${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

app.use('/room',userRoute)
app.use('/room',roomRoute)
mongoose.connect("mongodb+srv://Guhan:guhan@cluster0.gubnl.mongodb.net/club?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  server.listen(PORT,()=>{
      console.log(`server started on Port ${PORT}`)
  })

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId);

        socket.on('message', (message) => {
            io.to(roomId).emit('createMessage', message)
        }); 

        socket.on('disconnect',()=>{
            socket.to(roomId).emit('user-disconnected', userId);
        })
    })
})

