import React, { useEffect, useState } from 'react';
import './App.css';
import service from "./services/services";
import axios from 'axios';

function App() {
  const [message, setMessage] = useState({
    message:{
      to:"",
      body:""
    },
    submitting: false,
    error: false
  })
  useEffect(()=>{
    axios.get('http://localhost:3001/api/greeting')
    .then(res=>{
      console.log(res.data)
    })
    service.getGreeting().then(res=>console.log(res, 2))
  }, [])
  const onHandleChange = (e) =>{
    let target = e.target;
    let {name, value} = target;
    setMessage((prevState)=>{
      return {
        ...prevState,
        message:{
          ...prevState.message,
          [name]:value
        }
      }
    })
  }
  const onSubmit = () =>{
    setMessage({ ...message, submitting: true })
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage({
            ...message,
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          setMessage({
            ...message,
            error: true,
            submitting: false
          });
        }
      });
  }
  return (
   <>
     <form className={message.error ? 'error sms-form' : 'sms-form'}>
        <div>
          <label htmlFor="to">To:</label>
          <input
             type="tel"
             name="to"
             id="to"
             value={message.message.to}
             onChange={onHandleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea name="body" id="body" value={message.message.body} onChange={onHandleChange}/>
        </div>
        <button onClick={onSubmit} type="button">
          Send message
        </button>
      </form>
   </>
  );
}

export default App;
