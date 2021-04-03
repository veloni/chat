import { useState } from 'react';

import { getDataFromLocalStorage, setDataFromLocalStorage } from '../helper';

const useSwitchChat = (scrollToBottom) => {
  const [switchСhat, setSwitchChat] = useState(getDataFromLocalStorage('isTypeChat'));
  const [isSearch, setIsSearch] = useState(getDataFromLocalStorage('isTypeChat'));

  const switchChatToFun = () => {
    switcherChat(false, true);
	};

	const switchChatToWork = () => {
    switcherChat(false, false);
	};

  const switcherChat = (oneBol, twoBol) => {
    setIsSearch(oneBol); 
		setSwitchChat(twoBol);
    scrollToBottom();
    setDataFromLocalStorage('isTypeChat', twoBol);
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