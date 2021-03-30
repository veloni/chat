import React, { useRef, useState, useEffect } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import PopUpEditMessage from './PopUpEditMessage/PopUpEditMessage';
import PopUpSelectSmile from './PopUpSelectSmile/PopUpSelectSmile';

import sticker from './sticker/sticker.png';

import './Body.scss';

const Body = () => {
	const [isLoadMessage, setIsLoadMessage] = useState(JSON.parse(localStorage.getItem('firstLoad')));

	const [mousePositionX, setMousePositionX] = useState(null);
	const [mousePositionY, setMousePositionY] = useState(null);

	const [statePopUpEditMessage, setStatePopUpEditMessage] = useState(false);
	const [statePopUpSelectSmile, setStatePopUpSelectSmile] = useState(false);
	const [switchСhat , setSwitchChat] = useState(true);
	const [whatClick, setWhatClick] = useState(null);
	const [editTextState, setEditTextState] = useState(false);

/* 	const [heightScroll, setHeightScroll] = useState(null); */

	const [funChatHistory, setFunChatHistory] = useState([]);
	const [workChatHistory, setWorkChatHistory] = useState([]);

	const mainBodyRef = useRef(null);
	const inputMessage = useRef(null);
	const popUpEdit = useRef(null);
	const popUpSmile = useRef(null);

	useEffect(() => {
		addMessageFirstRender();
	}, []);

	useEffect(() => {
 		renderData('workChat', setWorkChatHistory);
  }, []);

	useEffect(() => {
		renderData('funChat', setFunChatHistory); 
  }, []);

	 const addMessageFirstRender = () => {
		if (isLoadMessage) { return; }
		let firstLoadMessageFunChat = 
			[
				{
					date: "12:02", 
					message: "Я вас категорически приветсвую 😄",
					isImg: false,
					id: '0',
					nickName: "Владимир"
				},
				{
					date: "12:25",  
					message: "И я вас категорически приветсвую 😀",
					isImg: false,
					id: '1',
					nickName: "Клим"
				},
				{
					date: "20:20", 
					message: "Клим Климыч добрый вечер",
					isImg: false,
					id: '2',
					nickName: "Сан Саныч"
				},
			];

		let firstLoadMessageWorkChat = 
			[
				{
					date: "08:02", 
					message: "Опять сервак упал",
					isImg: false,
					id: '0',
					nickName: "Сан Саныч"
				},
				{
					date: "12:56",  
					message: "Встань и иди",
					isImg: false,
					id: '1',
					nickName: "Владимир"
				},
				{
					date: "20:20", 
					message: "Ну что поделать",
					isImg: false,
					id: '2',
					nickName: "Владимир"
				},
			];

		localStorage.setItem('funChat', JSON.stringify(firstLoadMessageFunChat));
		localStorage.setItem('workChat', JSON.stringify(firstLoadMessageWorkChat));
		localStorage.setItem('firstLoad', JSON.stringify(true));

		setIsLoadMessage(true);
	};

	const renderData = (key, setType ) => {
		const localHistory = JSON.parse(localStorage.getItem(key));
		!!localHistory && setType(localHistory);
	};

	const addMessage = (e) => {
		setLocalStorage();  

		if (e.shiftKey && e.ctrlKey) {
			inputMessage.current.value = `${inputMessage.current.value}\n`;
			return;
		}

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

		localHistory.map((item, index) => {
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
	
		localHistory.map((item) => {
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

		localHistory.map((item) => {
			if (item.id === whatClick) {
				item.message = inputMessage.current.value;
			}
		});
		
		setLocalAndRenderForAllChat(localHistory);
		
		closeEditor();
	};

	const closeEditor = () => {
		setEditTextState(false);
		inputMessage.current.value = '';
	};

	const checkPopUps = (e) => {
		checkPoUpEditClick(e);
		checkPoUpSmile(e);
	}

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
		mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
	};
	
	const setLocalStorage = () => {
		localStorage.setItem('funChat', JSON.stringify(funChatHistory));  
		localStorage.setItem('workChat', JSON.stringify(workChatHistory));
	};

	const giveLocalHistory = () => {
		if (switchСhat) {
			return (JSON.parse(localStorage.getItem('funChat')));
		} 
		return (JSON.parse(localStorage.getItem('workChat')));
	};

	const setLocalAndRender = (typeChat, setTypeChat, localHistory) => {
		localStorage.setItem(typeChat, JSON.stringify(localHistory));  
		renderData(typeChat, setTypeChat);
	}

	const setLocalAndRenderForAllChat = (localHistory) => {
		switchСhat && setLocalAndRender('funChat', setFunChatHistory, localHistory); 
		!switchСhat && setLocalAndRender('workChat', setWorkChatHistory, localHistory); 
	}

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
				setSwitchChat={setSwitchChat}
				switchСhat={switchСhat}
			/>
			<div className="wrapper-header-body">
				<Header/>
				<div 
					className="main-body"
					ref={mainBodyRef}
				>
					<div className="wrapper-main-body">
						{switchСhat && funChatHistory.map((item, key) => (
							<div 
								key={key}
								className="wrapper-message"
							>
								<div 
									className="wrapper-message-text"
									onClick={(e) => createPopUp(e, item.id)}
								>
									<div className="wrapper-nick-message">
										<div className="wrapper-nick-name">
											{item.nickName}
										</div>
										{!item.isImg &&
											<span className="text-in-message">
												{item.message}
											</span>}
										{item.isImg && 
											<img
											className="wrapper-sticker"
											src={item.message}
											alt={"sticler"}
											/>}
									</div>
									<div className="wrapper-time-in-message">
										<span className="time-in-message">
											{item.date}
										</span>
									</div>
								</div>
							</div>
						))} 
						{!switchСhat && workChatHistory.map((item, key) =>  (
							<div 
								key={key}
								className="wrapper-message"
							>
								<div 
									className="wrapper-message-text"
									onClick={(e) => createPopUp(e, item.id)}
								>
									<div className="wrapper-nick-message">
										<div className="wrapper-nick-name">
											{item.nickName}
										</div>
										{!item.isImg &&
											<span className="text-in-message">
												{item.message}
											</span>}
										{item.isImg && 
											<img
											className="wrapper-sticker"
											src={item.message}
											alt={"sticler"}
											/>}
									</div>
									<div className="wrapper-time-in-message">
										<span className="time-in-message">
											{item.date}
										</span>
									</div>
								</div>
							</div>
						))} 
						</div>
					</div>
				{statePopUpSelectSmile && <PopUpSelectSmile
					popUpSmile={popUpSmile}
					addSmile={addSmile}
				/>}
				<Footer
					setLocalStorage={setLocalStorage}
					addMessage={addMessage}
					statePopUpSelectSmile={statePopUpSelectSmile}
					setStatePopUpSelectSmile={setStatePopUpSelectSmile}
					inputMessage={inputMessage}
					switchСhat={switchСhat}
					addSticker={addSticker}
					editTextState={editTextState}
					closeEditor={closeEditor}
				/>
			</div>
		</div>
	);
};

export default Body;