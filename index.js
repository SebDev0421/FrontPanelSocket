var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//const fcm = require('fcm-notification');
//const FCM = new fcm('./frontpanelnotificatons-firebase-adminsdk-2k5zf-dfdccd5abf.json');
//const tokens = [];





io.on('connection',(socket)=>{
  socket.emit('testBackGround',true)
    socket.on('onNewOrder',(data)=>{
        socket.emit('onDatesNewOrder',data)
        
    })

    socket.on('onDeleteTask',(data)=>{
        socket.emit('onDatesDeleteOrder',data)
        
    })
    
    socket.on('onEditTask',(data)=>{
        socket.emit('onDatesEditOrder',data)
        
    })
    
  socket.on('onCompleteTask',(data)=>{
      console.log(data)
      socket.emit('onDatesCompleteOrder',data)
      
  })

  socket.on('onUserDelete',(data)=>{
    console.log(data)
    socket.emit('onDatesUserDelete'+data,true)
    
  })

  
})

http.listen(3080, () => {
  console.log('listening on *:3080');
});


 
    
 
