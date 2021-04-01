import { useState, useRef } from 'react';

const useSwitchChat = () => {
  const [switchСhat, setSwitchChat] = useState(true);

  const switchChatToFun = () => {
/* 		setIsSearch(false); */
		setSwitchChat(true);
	/* 	scrollToBottom();  */
	};

	const switchChatToFWork = () => {
/* 		setIsSearch(false); */
		setSwitchChat(false);
	 /* 	scrollToBottom();  */
	};

  return [
    switchСhat,
    setSwitchChat,
    switchChatToFun,
    switchChatToFWork,
  ]
}

export default useSwitchChat