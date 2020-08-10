var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fcm = require('fcm-notification');
const FCM = new fcm('./frontpanelnotificatons-firebase-adminsdk-2k5zf-dfdccd5abf.json');
const token = 'fFZyrNDsScKOo7PvaKmxtK:APA91bEq09rcr9e0L13wgjButnBPLpyeBxOzEhkZnnJhKDrwkK2fXOstkX5qL3sl6U7cVhJJ--KL7JvnkmK_TNcWmZvTYSd0iblybTAA3cgT7LJGYi1_Mc8ugOLlAwO806YjkQj2z2GO';

const sendMessage = (title,body)=>{
    
return message = {
        notification:{
            title : title,
            body : body
        },
        token : token
};
}



io.on('connection',(socket)=>{
    socket.on('onNewOrder',(data)=>{
        socket.emit('onDatesNewOrder',data)
        FCM.send(sendMessage('Nueva orden creada','La orden '+data.numOrder+' ha sido creada'), function(err, response) {
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
})

http.listen(3080, () => {
  console.log('listening on *:3080');
});


 
    
 
