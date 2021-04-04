import { useState, useRef } from 'react';

import { getDataFromLocalStorage } from '../helper';

const useSearch = (
	switchСhat, 
	setIsSearch, 
	isSearch,
) => {
	const [foundMessageFunChat, setFoundMessageFunChat] = useState([]);
	const [foundMessageWorkChat, setFoundMessageWorkChat] = useState([]);
	const [arrayFindMessage, setArrayFindMessage] = useState([]);
	const [foundMessageActive, setFondMessageActive] = useState(false);

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

				if (item.isImg) { return; }

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
	
	return [
		foundMessageFunChat,
		foundMessageWorkChat,
		foundMessageActive,
		inputSearchRef,
		clearSearch,
		searchMessage,
		seeMessage,
  ];
};

export default useSearch;