import sticker from '../sticker/sticker.png';

import { setDataFromLocalStorage } from './helper';

const useMessage = ({ 
	inputMessage,
		switchСhat,
		funChatHistory,
		workChatHistory,
		setFunChatHistory,
		setWorkChatHistory,
		editTextState,
		editerMessage,
    scrollToBottom,
 }) => {

  const addMessage = (e) => {
		if (e.shiftKey && e.ctrlKey) {
			inputMessage.current.value = `${inputMessage.current.value}\n`;
			return;
		}
		setLocalStorage();  

		if (e.key === 'Enter') {
		 	e.preventDefault();
			if (!inputMessage.current.value) { return; }

		 	if (editTextState) { 
				editerMessage();
				return;
			} 
	
			switchСhat && setData(funChatHistory, setFunChatHistory, 'funChat', e);
			!switchСhat && setData(workChatHistory, setWorkChatHistory, 'workChat', e);

	 		scrollToBottom();  

		 	inputMessage.current.value = ''; 
		}
	};

	const setData = (typeChat, setTypeChat, key, e) => {
		setTypeChat([
			...typeChat, 
			{
				date: giveDate(), 
				message: e.target.value,
				isImg: false,
				id: typeChat.length,
				nickName: "Ваши сообщения",
			},
		]);
	};

	const addSticker = () => {
		switchСhat && setDataSticker(funChatHistory, setFunChatHistory, 'funChat');
		!switchСhat && setDataSticker(workChatHistory, setWorkChatHistory, 'workChat');
		
		scrollToBottom();
	};

	const setDataSticker = (typeChat, setTypeChat) => {
		setTypeChat([
			...typeChat, 
			{
				date: giveDate(), 
				message: sticker,
				isImg: true,
				id: typeChat.length,
				nickName: "Ваши сообщения",
			},
		]);
	};

	const giveDate = () => {
		const date = new Date();
		const hour = date.getHours();
		let min = date.getMinutes();

 		if (min < 10) { 
			min = `0${min}`;
		}

		return (`${hour}:${min}`);
	};

  const setLocalStorage = () => {
		switchСhat && setDataFromLocalStorage('funChat', funChatHistory);  
		!switchСhat && setDataFromLocalStorage('workChat', workChatHistory);
	};

  return [
    setLocalStorage,
    addMessage,
    addSticker,
  ];
};

export default useMessage;