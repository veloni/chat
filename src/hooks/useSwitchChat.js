import { useState } from 'react';

const useSwitchChat = (scrollToBottom) => {
  const [switchСhat, setSwitchChat] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const switchChatToFun = () => {
    switcherChat(false, true)
	};

	const switchChatToWork = () => {
    switcherChat(false, false);
	};

  const switcherChat = (oneBol, twoBol) => {
    setIsSearch(oneBol); 
		setSwitchChat(twoBol);
    scrollToBottom();
  }

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