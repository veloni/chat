import { useState } from 'react';

const useSwitchChat = ( scrollToBottom ) => {
  const [switchСhat, setSwitchChat] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const switchChatToFun = () => {
 		setIsSearch(false); 
		setSwitchChat(true);
	};

	const switchChatToFWork = () => {
 		setIsSearch(false); 
		setSwitchChat(false);
	};

  return [
    switchСhat,
    setSwitchChat,
    switchChatToFun,
    switchChatToFWork,
    setIsSearch,
    isSearch,
  ]
}

export default useSwitchChat