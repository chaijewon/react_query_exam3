const express=require("express")
const app=express()

const server=require("http").createServer(app)
const port=5555

// 서버 개통
/*
    1. bind(ip,port)
    2. listen => 대기상태
    3. accept => 클라이언트 접근
    4. read => 값을 읽는다 (전송) ==> on
    5. write => 응답  ==> emit

    client(react) => 문자발송 => emit
    server => on => emit
    client => on
 */
server.listen(port,()=>{
    console.log("Server Start...")
})
const socketio=require("socket.io")
const io=socketio.listen(server)

io.on('connection',(socket)=>{
    socket.on('chat-msg',(msg)=>{
        console.log(msg)
        io.emit('chat-msg',msg)
    })
})