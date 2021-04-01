import React, { useRef, useState, useEffect } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import PopUpEditMessage from './PopUpEditMessage/PopUpEditMessage';
import PopUpSelectSmile from './PopUpSelectSmile/PopUpSelectSmile';
import RenderMessage from './Hook/RenderMessage';

import loadMessageFirstEntreance from './Hook/loadMessageFirstEntreance';
/* import messageHook from './Hook/messageHook'; */

import sticker from './sticker/sticker.png';

import './Body.scss';

const Body = () => {
	const [isLoadMessage, setIsLoadMessage] = useState(JSON.parse(localStorage.getItem('firstLoad')));
	const isBackgroundMessage = (JSON.parse(localStorage.getItem('firstLoad')));

	const [mousePositionX, setMousePositionX] = useState(null);
	const [mousePositionY, setMousePositionY] = useState(null);

	const [statePopUpEditMessage, setStatePopUpEditMessage] = useState(false);
	const [statePopUpSelectSmile, setStatePopUpSelectSmile] = useState(false);
	const [switchСhat , setSwitchChat] = useState(true);
	const [whatClick, setWhatClick] = useState(null);
	const [editTextState, setEditTextState] = useState(false);

	const [funChatHistory, setFunChatHistory] = useState([]);
	const [workChatHistory, setWorkChatHistory] = useState([]);
	const [foundMessageFunChat, setFoundMessageFunChat] = useState([]);
	const [foundMessageWorkChat, setFoundMessageWorkChat] = useState([]);

	const [isSearch, setIsSearch] = useState(false);

	const [arrayFindMessage, setArrayFindMessage] = useState([]);

	const mainBodyRef = useRef(null);
	const inputMessage = useRef(null);
	const popUpEdit = useRef(null);
	const popUpSmile = useRef(null);
	const inputSearch = useRef(null); 
	
	useEffect(() => {
		setIsLoadMessage()
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, []);

	useEffect(() => {
		loadMessageFirstEntreance(isLoadMessage, setIsLoadMessage);
	}, [isLoadMessage]);

	useEffect(() => {
		firstLoadBackgroundMessage();
	});

	useEffect(() => {
 		renderData('workChat', setWorkChatHistory);
  }, []);

	useEffect(() => {
		renderData('funChat', setFunChatHistory); 
  }, []);

	const renderData = (key, setType ) => {
		const localHistory = JSON.parse(localStorage.getItem(key));
		!!localHistory && setType(localHistory);
	};

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
		}; 

		return (`${hour}:${min}`);
	};

	const createPopUp = (e, id) => {
		setWhatClick(id);

		setMousePositionX(`${e.nativeEvent.pageX}px`);
		setMousePositionY(`${e.nativeEvent.pageY}px`);

		setStatePopUpEditMessage(true);
	};

	const deleteMessage = () => {
	 	setStatePopUpEditMessage(false); 

		let localHistory;

		localHistory = giveLocalHistory();

		localHistory.map.function((item, index) => {
			if (item.id === whatClick) {
				localHistory.splice(index, 1);
				return;
			}
		});

		setLocalAndRenderForAllChat(localHistory);
	};

	const editMessage = () => {
		setLocalStorage();
		setEditTextState(true);
		setStatePopUpEditMessage(false); 

		let localHistory;

		localHistory = giveLocalHistory();
	
		localHistory.map.function((item) => {
			if (item.isImg === true) { 
				return;
			}

			if (item.id === whatClick) {
				inputMessage.current.value = item.message;
			}
		});
	};

	const editerMessage = () => {
		let localHistory;

		localHistory = giveLocalHistory();

		localHistory.map.function((item) => {
			if (item.id === whatClick) {
				item.message = inputMessage.current.value;
			}
		});
		
		setLocalAndRenderForAllChat(localHistory);
		
		closeEditor();
	};

	const loadBackgroundImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		
		input.onchange = e => { 
			const file = e.target.files[0]; 

			const reader = new FileReader();
			reader.readAsDataURL(file); 

			reader.onload = readerEvent => {
				const pathImage = readerEvent.target.result; 
		
				if (pathImage.includes('/png')) {
					localStorage.setItem('BackgroundImage', JSON.stringify(pathImage));
					localStorage.setItem('isBackgroundImage', JSON.stringify(true));

					mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
				}
		  }
		}
		input.click();
	};

	const deleteBackgroundImage = () => {
		localStorage.setItem('BackgroundImage', JSON.stringify(''));
		localStorage.setItem('isBackgroundImage', JSON.stringify(false));
		mainBodyRef.current.style.backgroundImage = 'none';
	};

	const firstLoadBackgroundMessage = () => {
		const pathImage = JSON.parse(localStorage.getItem('BackgroundImage'));
		if (isBackgroundMessage) {
			mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
		}
	};

	const closeEditor = () => {
		setEditTextState(false);
		inputMessage.current.value = '';
	};

	const checkPopUps = (e) => {
		checkPoUpEditClick(e);
		statePopUpSelectSmile && checkPoUpSmile(e);
	};

	const checkPoUpEditClick = (e) => {
		if (statePopUpEditMessage && e.target !== popUpEdit) {
		 	setStatePopUpEditMessage(false); 
		}
	};

	const checkPoUpSmile = (e) => {
		const isPopUpSmile = (statePopUpSelectSmile && e.target !== popUpSmile);
		isPopUpSmile && setStatePopUpSelectSmile(!isPopUpSmile);
	};

	const addSmile = (emoji) => {
		inputMessage.current.value = inputMessage.current.value + String.fromCodePoint(emoji); 
	};

	const scrollToBottom = () => {
		setTimeout(() => {
			mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight,);
		}, 1);
	};
	
	const setLocalStorage = () => {
		switchСhat && localStorage.setItem('funChat', JSON.stringify(funChatHistory));  
		!switchСhat && localStorage.setItem('workChat', JSON.stringify(workChatHistory));
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

	const setLocalAndRender = (typeChat, setTypeChat, localHistory) => {
		localStorage.setItem(typeChat, JSON.stringify(localHistory));  
		renderData(typeChat, setTypeChat);
	};

	const searchMessage = () => {
		if (!inputSearch.current.value) { 
			setFoundMessageFunChat(null);	
			setFoundMessageWorkChat(null);	
			return; 
		};

		console.log(inputSearch.current.value.length);

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

	const setLocalAndRenderForAllChat = (localHistory) => {
		setLocalAndRender('funChat', setFunChatHistory, localHistory); 
		setLocalAndRender('workChat', setWorkChatHistory, localHistory); 
	};

	return (
		<div className="wrapper-main"
			onClick={(e) => checkPopUps(e)}
		>
			{statePopUpEditMessage && <PopUpEditMessage
				popUpEdit={popUpEdit}
				mousePositionX={mousePositionX}
				mousePositionY={mousePositionY}
				deleteMessage={deleteMessage}
				editMessage={editMessage}
			/>}
			<Aside
				foundMessageFunChat={foundMessageFunChat}
				foundMessageWorkChat={foundMessageWorkChat}
				switchСhat={switchСhat}
				seeMessage={seeMessage}
				inputSearch={inputSearch}
				isSearch={isSearch}
				clearSearch={clearSearch}
				searchMessage={searchMessage}
			/>
			<div className="wrapper-header-body">
				<Header
					mainBodyRef={mainBodyRef}
					switchСhat={switchСhat}
					setIsSearch={setIsSearch}
					setSwitchChat={setSwitchChat}
					scrollToBottom={scrollToBottom}
				/>
				<div 
					className="main-body"
					ref={mainBodyRef}
				>
					<RenderMessage
						funChatHistory={funChatHistory}
						workChatHistory={workChatHistory}
						switchСhat={switchСhat}
						createPopUp={createPopUp}
					/>
				</div>
				{statePopUpSelectSmile && <PopUpSelectSmile
					popUpSmile={popUpSmile}
					addSmile={addSmile}
				/>}
				<Footer
					loadBackgroundImage={loadBackgroundImage}
					deleteBackgroundImage={deleteBackgroundImage}
					setLocalStorage={setLocalStorage}
					addMessage={addMessage}
					statePopUpSelectSmile={statePopUpSelectSmile}
					setStatePopUpSelectSmile={setStatePopUpSelectSmile}
					inputMessage={inputMessage}
					switchСhat={switchСhat}
					addSticker={addSticker}
					editTextState={editTextState}
					closeEditor={closeEditor}
					lengthСheck={lengthСheck}
				/>
			</div>
		</div>
	);
};

export default Body;