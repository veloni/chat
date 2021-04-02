import { useState, useRef } from 'react';

import { getDataFromLocalStorage } from '../helper';

const useSearch = (
	switchСhat, 
	inputMessage, 
	setIsSearch, 
	isSearch,
) => {
	const [foundMessageFunChat, setFoundMessageFunChat] = useState([]);
	const [foundMessageWorkChat, setFoundMessageWorkChat] = useState([]);
	const [arrayFindMessage, setArrayFindMessage] = useState([]);
	const [fondMessageActive, setFondMessageActive] = useState(false);

	const inputSearchRef = useRef(null); 

	const searchMessage = () => {
		if (!inputSearchRef.current.value) { 
			setFoundMessageFunChat(null);	
			setFoundMessageWorkChat(null);	
			return; 
		};

		setIsSearch(inputSearchRef.current.value.length !== 1);

		const localHistory = giveLocalHistory();

		setArrayFindMessage([]);

		localHistory.forEach((item) => {
			if (item.message.toLowerCase().includes(inputSearchRef.current.value.toLowerCase())) {
				let triplePoint = '...';

				if (item.isImg === true) { return; }

				if (item.message.length < 20) { 
					triplePoint = '';
				}

				arrayFindMessage.push({
					date: item.date, 
					message: `${item.message.substr(0, 20)} ${triplePoint}`,
					isImg: item.isImg,
					id: item.id,
					nickName: item.nickName,
				},);
			}
		});

		switchСhat && setFoundMessageFunChat(arrayFindMessage);	
		!switchСhat && setFoundMessageWorkChat(arrayFindMessage);
	};

	const seeMessage = (id) => {
		setIsSearch(true);

		document.getElementById(id).scrollIntoView();
		document.getElementById(id).classList.add('find-message');
		
		setFondMessageActive(true);

		setTimeout(() => {
			!!document.getElementById(id) && document.getElementById(id).classList.remove('find-message');
			setFondMessageActive(false);
		}, 2000);
		
	};

	const clearSearch = () => {
		if (isSearch) {
			setIsSearch(false);
			setFoundMessageFunChat(null);	
			setFoundMessageWorkChat(null);	
			inputSearchRef.current.value = '';
		}
	};

	const giveLocalHistory = () => {
		if (switchСhat) {
			return (getDataFromLocalStorage('funChat'));
		} 
		return (getDataFromLocalStorage('workChat'));
	};
	
	const lengthСheck = () => {
		if (Number.isInteger(inputMessage.current.value.length / 64)) {
			inputMessage.current.value = `${inputMessage.current.value}\n`;
		}
	};

	return [
		foundMessageFunChat,
		foundMessageWorkChat,
		fondMessageActive,
		inputSearchRef,
		clearSearch,
		searchMessage,
		seeMessage,
		lengthСheck,
  ];
};

export default useSearch;