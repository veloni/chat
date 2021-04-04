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

  const switcherChat = (isSearch, isSwitch) => {
    setIsSearch(isSearch); 
		setSwitchChat(isSwitch);
    scrollToBottom();
    setDataFromLocalStorage('isTypeChat', isSwitch);
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