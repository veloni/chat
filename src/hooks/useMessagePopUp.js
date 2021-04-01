import { useState } from 'react';

const useMessagePopUp = ({switchСhat, setFunChatHistory, setWorkChatHistory, inputMessage, funChatHistory, workChatHistory}) => {
  const [mousePositionX, setMousePositionX] = useState(null);
	const [mousePositionY, setMousePositionY] = useState(null);
	const [statePopUpEditMessage, setStatePopUpEditMessage] = useState(false);
  const [whatClick, setWhatClick] = useState(null);
  const [editTextState, setEditTextState] = useState(false); 

	const createPopUp = (e, id) => {
		setWhatClick(id);

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

   console.log(setFunChatHistory);
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

const setLocalStorage = () => {
  switchСhat && localStorage.setItem('funChat', JSON.stringify(funChatHistory));  
  !switchСhat && localStorage.setItem('workChat', JSON.stringify(workChatHistory));
};

 const setLocalAndRenderForAllChat = (localHistory) => {
  switchСhat && setLocalAndRender('funChat', setFunChatHistory, localHistory); 
  !switchСhat && setLocalAndRender('workChat', setWorkChatHistory, localHistory); 
} ;

const setLocalAndRender = (typeChat, setTypeChat, localHistory) => {
  localStorage.setItem(typeChat, JSON.stringify(localHistory));  
  renderData(typeChat, setTypeChat);
};

 const giveLocalHistory = () => {
  if (switchСhat) {
    return (JSON.parse(localStorage.getItem('funChat')));
  } 
  return (JSON.parse(localStorage.getItem('workChat')));
};

const renderData = (key, setType ) => {
  const localHistory = JSON.parse(localStorage.getItem(key));
  !!localHistory && setType(localHistory);
};

  return [
    mousePositionX, 
    mousePositionY,
    whatClick,
    createPopUp,
    statePopUpEditMessage,
    setStatePopUpEditMessage,
    deleteMessage,
    closeEditor,
    editMessage,
    editTextState,
    setEditTextState,
  ]
}

export default useMessagePopUp