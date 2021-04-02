import { useState, useRef, useEffect } from 'react';

import { getDataFromLocalStorage } from './helper';

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
    const localHistory = getDataFromLocalStorage(key);
    !!localHistory && setType(localHistory);
  };

  return [
    funChatHistory,
    workChatHistory,
    inputMessage,
    mainBodyRef,
    setFunChatHistory,
    setWorkChatHistory,
  ];
};

export default useFunWorkChat;
