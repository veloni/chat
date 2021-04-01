import { useState, useRef } from 'react';

const useSearch = ({ switchСhat, inputMessage, setIsSearch, isSearch }) => {
	const [foundMessageFunChat, setFoundMessageFunChat] = useState([]);
	const [foundMessageWorkChat, setFoundMessageWorkChat] = useState([]);
	const [arrayFindMessage, setArrayFindMessage] = useState([]);

	const inputSearch = useRef(null); 
	
	const searchMessage = () => {
		if (!inputSearch.current.value) { 
			setFoundMessageFunChat(null);	
			setFoundMessageWorkChat(null);	
			return; 
		};

		if (inputSearch.current.value.length === 1) {
			setIsSearch(false);
		} else {
			setIsSearch(true);
		}

		const localHistory = giveLocalHistory();

		setArrayFindMessage([]);

		localHistory.forEach((item,) => {
			if (item.message.includes(inputSearch.current.value)) {
				let triplePoint = '...';

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

		setTimeout(() => {
			document.getElementById(id).classList.remove('find-message');
		}, 2000);
	};

	const clearSearch = () => {
		if (isSearch) {
			setIsSearch(false);
			setFoundMessageFunChat(null);	
			setFoundMessageWorkChat(null);	
			inputSearch.current.value = '';
		}
	};

	const giveLocalHistory = () => {
		if (switchСhat) {
			return (JSON.parse(localStorage.getItem('funChat')));
		} 
		return (JSON.parse(localStorage.getItem('workChat')));
	};
	
	const lengthСheck = () => {
		if (Number.isInteger(inputMessage.current.value.length / 64)) {
			inputMessage.current.value = `${inputMessage.current.value}\n`;
		}
	};

	return [
		foundMessageFunChat,
		foundMessageWorkChat,
		clearSearch,
		searchMessage,
		inputSearch,
		seeMessage,
		lengthСheck,
  ]
}

export default useSearch