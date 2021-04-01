import { useState, useRef } from 'react';

const useFunWorkChat = () => {
  const [funChatHistory, setFunChatHistory] = useState([]);
  const [workChatHistory, setWorkChatHistory] = useState([]);
  const inputMessage = useRef(null);
  
  return [
    funChatHistory,
    workChatHistory,
    setFunChatHistory,
    setWorkChatHistory,
    inputMessage,
  ]
}

export default useFunWorkChat
