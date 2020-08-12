var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fcm = require('fcm-notification');
const FCM = new fcm('./frontpanelnotificatons-firebase-adminsdk-2k5zf-dfdccd5abf.json');
const tokens = [];

const sendMessage = (title,body)=>{
    
return message = {
        notification:{
            title : title,
            body : body
        }

};
}



io.on('connection',(socket)=>{
    socket.on('onNewOrder',(data)=>{
        socket.emit('onDatesNewOrder',data)
        FCM.sendToMultipleToken(sendMessage('Nueva orden creada','La orden '+data.numOrder+' ha sido creada'),tokens, function(err, response) {
            if(err){
             console.log('error found', err);
            }else {
              console.log('response here', response);
            }
        })
    })

    socket.on('onDeleteTask',(data)=>{
        socket.emit('onDatesDeleteOrder',data)
        FCM.send(sendMessage('Orden eliminada','La orden '+data.numOrder+' ha sido eliminada'), function(err, response) {
            if(err){
             console.log('error found', err);
            }else {
              console.log('response here', response);
            }
        })
    })
    
    socket.on('onEditTask',(data)=>{
        socket.emit('onDatesEditOrder',data)
        FCM.send(sendMessage('Orden modificada','La orden '+data.numOrder+' ha sido modificada'), function(err, response) {
            if(err){
             console.log('error found', err);
            }else {
              console.log('response here', response);
            }
        })
    })
    
  socket.on('onCompleteTask',(data)=>{
      console.log(data)
      socket.emit('onDatesCompleteOrder',data)
      FCM.send(sendMessage('Orden completada','La orden '+data.numOrder+' ha sido entregada y finalizada'), function(err, response) {
          if(err){
           console.log('error found', err);
          }else {
            console.log('response here', response);
          }
      })
  })

  socket.on('onUserDelete',(data)=>{
    console.log(data)
    socket.emit('onDatesUserDelete'+data,true)
    
  })

  socket.on('onNewTokenDevice',(value)=>{
    tokens.push(value)
  })
})

http.listen(3080, () => {
  console.log('listening on *:3080');
});


 
    
 
