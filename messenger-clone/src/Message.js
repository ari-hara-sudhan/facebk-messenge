import React ,{forwardRef} from 'react'
import "./Message.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import db from './firebase';
const  Message= forwardRef(({message,username,id},ref)=> {
    const isUser= message.username===username;
    return (
    <div ref={ref} >
    <Card  className={`message ${isUser && "message__user"}`} >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         <div className="message__container">
         <p>{ !isUser && `${message.username||"unknown User"}` }  {message.message}</p>
         {isUser && <HighlightOffIcon className="message__delete" onClick={e=>db.collection("texts").doc(id).delete()}/>}
             </div>   

        </Typography>
        </CardContent>
    </Card>
         
     
            
        </div>
    )
})

export default Message
