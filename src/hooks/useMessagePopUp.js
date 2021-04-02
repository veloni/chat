import { useState, useRef } from 'react';

import { getDataFromLocalStorage, setDataFromLocalStorage } from '../helper';

const useMessagePopUp = (
  switchСhat, 
  fondMessageActive,
  setFunChatHistory, 
  setWorkChatHistory, 
  inputMessage, 
  funChatHistory, 
  workChatHistory,
) => {
  const [mousePositionX, setMousePositionX] = useState(null);
	const [mousePositionY, setMousePositionY] = useState(null);
	const [statePopUpEditMessage, setStatePopUpEditMessage] = useState(false);
  const [whatClick, setWhatClick] = useState(null);
  const [editTextState, setEditTextState] = useState(false); 

	const popUpEditRef = useRef(null);

	const createPopUp = (e, id) => {
    setWhatClick(id);

    fondMessageActive && document.getElementById(id).classList.remove('find-message');

    setMousePositionX(`${e.nativeEvent.pageX}px`);
    setMousePositionY(`${e.nativeEvent.pageY}px`);

    setStatePopUpEditMessage(true);
	};

  const deleteMessage = () => {
    setStatePopUpEditMessage(false); 

    let localHistory;

    localHistory = giveLocalHistory();

    localHistory.forEach(function(item, index) {
      if (item.id === whatClick) {
        localHistory.splice(index, 1);
      return;
      }
    });

    setLocalAndRenderForAllChat(localHistory);
  };

  const closeEditor = () => {
    setEditTextState(false);
    inputMessage.current.value = '';
  };

  const editMessage = () => {
    setLocalStorage();
    setEditTextState(true);
    setStatePopUpEditMessage(false); 

    let localHistory;

    localHistory = giveLocalHistory();

    localHistory.forEach(function(item) {
      if (item.isImg === true) { 
        setEditTextState(false);
        return;
      }

      if (item.id === whatClick) {
        inputMessage.current.value = item.message;
      }
    });
  };

  const editerMessage = () => {
    let localHistory;

    localHistory = giveLocalHistory();

    localHistory.forEach(function(item) {
      if (item.id === whatClick) {
        item.message = inputMessage.current.value;
      }
    });

    setLocalAndRenderForAllChat(localHistory);

    closeEditor();
  };

  const checkPoUpEditClick = (e) => {
    const decompCheckPoistion = statePopUpEditMessage && e.target !== popUpEditRef;
    decompCheckPoistion && setStatePopUpEditMessage(!decompCheckPoistion); 
  };

  const setLocalStorage = () => {
    switchСhat && setDataFromLocalStorage('funChat', funChatHistory);  
    !switchСhat && setDataFromLocalStorage('workChat', workChatHistory);
  };

  const setLocalAndRenderForAllChat = (localHistory) => {
    switchСhat && setLocalAndRender('funChat', setFunChatHistory, localHistory); 
    !switchСhat && setLocalAndRender('workChat', setWorkChatHistory, localHistory); 
  };

  const setLocalAndRender = (typeChat, setTypeChat, localHistory) => {
    localStorage.setItem(typeChat, JSON.stringify(localHistory));  
    renderData(typeChat, setTypeChat);
  };

  const giveLocalHistory = () => {
    if (switchСhat) {
      return (getDataFromLocalStorage('funChat'));
    } 
    return (getDataFromLocalStorage('workChat'));
  };

  const renderData = (key, setType ) => {
    const localHistory = getDataFromLocalStorage(key);
    !!localHistory && setType(localHistory);
  };

  return [
    mousePositionX, 
    mousePositionY,
    editTextState,
    popUpEditRef,
    createPopUp,
    statePopUpEditMessage,
    deleteMessage,
    closeEditor,
    editMessage,
    editerMessage,
    checkPoUpEditClick,
  ];
};

export default useMessagePopUp;