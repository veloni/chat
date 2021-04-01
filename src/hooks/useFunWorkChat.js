import { useState, useRef, useEffect } from 'react';

const useFunWorkChat = () => {
  const [funChatHistory, setFunChatHistory] = useState([]);
  const [workChatHistory, setWorkChatHistory] = useState([]);
  const inputMessage = useRef(null);
  const mainBodyRef = useRef(null);

  useEffect(() => {
    renderData('workChat', setWorkChatHistory);
  }, []);

 useEffect(() => {
   renderData('funChat', setFunChatHistory); 
 }, []);

 const renderData = (key, setType ) => {
   const localHistory = JSON.parse(localStorage.getItem(key));
   !!localHistory && setType(localHistory);
 };

  return [
    funChatHistory,
    workChatHistory,
    setFunChatHistory,
    setWorkChatHistory,
    inputMessage,
    mainBodyRef,
  ]
}

export default useFunWorkChat
