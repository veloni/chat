import sticker from '../sticker/sticker.png';

import { setDataFromLocalStorage } from '../helper';
import { useState } from 'react';

const useMessage = (
	inputMessage,
	switchСhat,
	funChatHistory,
	workChatHistory,
	setFunChatHistory,
	setWorkChatHistory,
	editTextState,
	editerMessage,
	scrollToBottom,
) => {
	const [rowTextArea, setRowTextArea] = useState(2);

  const addMessage = (e) => {
		if (e.shiftKey && e.ctrlKey) {
			newRowTextArea();
			return;
		}

		setLocalStorage();  

		if (e.key === 'Enter') {
			e.preventDefault();

			if (!inputMessage.current.value) { return; }

			const checkSpace = inputMessage.current.value.slice(-1) === '\n';

			if (checkSpace) {
				inputMessage.current.value.substring(0, inputMessage.current.value.length - 1);	
			}
			
			if (editTextState) { 
				editerMessage();
				return;
			} 

			switchСhat && setData(funChatHistory, setFunChatHistory, e);
			!switchСhat && setData(workChatHistory, setWorkChatHistory, e);

			scrollToBottom();  

			setRowTextArea(2);

			inputMessage.current.value = ''; 
		}
	};

	const setData = (typeChat, setTypeChat, e) => {
		setTypeCharForAll(typeChat, setTypeChat, false, e.target.value);
	};

	const addSticker = () => {
		switchСhat && setDataSticker(funChatHistory, setFunChatHistory);
		!switchСhat && setDataSticker(workChatHistory, setWorkChatHistory);
		
		scrollToBottom();
	};

	const setDataSticker = (typeChat, setTypeChat) => {
		setTypeCharForAll(typeChat, setTypeChat, true, sticker);
	};

	const setTypeCharForAll = (typeChat, setTypeChat, isImg, value) => {
		setTypeChat([
			...typeChat, 
			{
				date: giveDate(), 
				message: value,
				id: typeChat.length,
				nickName: 'Ваши сообщения',
				isImg,
			},
		]);
	} 

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

	const lengthСheck = () => {
		if (Number.isInteger(inputMessage.current.value.length / 64)) {
			newRowTextArea();
		}
	};

	const newRowTextArea = () => {
		rowTextArea !== 5 && setRowTextArea(rowTextArea + 1);
		if (inputMessage.current.value) {
			inputMessage.current.value = `${inputMessage.current.value}\n`;
		}
	}

  return [
		setLocalStorage,
		addMessage,
		addSticker,
		rowTextArea,
		lengthСheck,
  ];
};

export default useMessage;