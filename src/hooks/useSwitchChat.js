import { useState } from 'react';

const useSwitchChat = ({ scrollToBottom }) => {
  const [switchСhat, setSwitchChat] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const switchChatToFun = () => {
 		setIsSearch(false); 
		setSwitchChat(true);
    scrollToBottom();
	};

	const switchChatToWork = () => {
 		setIsSearch(false); 
		setSwitchChat(false);
    scrollToBottom();
	};

  return [
    switchСhat,
    setSwitchChat,
    switchChatToFun,
    switchChatToWork,
    setIsSearch,
    isSearch,
  ];
};

export default useSwitchChat;