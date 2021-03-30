import React, { useRef, useState, useEffect } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import PopUpEditMessage from './PopUpEditMessage/PopUpEditMessage';
import PopUpSelectSmile from './PopUpSelectSmile/PopUpSelectSmile';

import sticker from './sticker/sticker.png';

import './Body.scss';

const Body = () => {
	const [mousePositionX, setMousePositionX] = useState(null);
	const [mousePositionY, setMousePositionY] = useState(null);

	const [statePopUpEditMessage, setStatePopUpEditMessage] = useState(false);
	const [statePopUpSelectSmile, setStatePopUpSelectSmile] = useState(false);
	const [switchСhat , setSwitchChat] = useState(true);
	const [whatClick, setWhatClick] = useState(null);
	const [editTextState, setEditTextState] = useState(false);

	const [heightScroll, setHeightScroll] = useState(null);

	const [funChatHistory, setFunChatHistory] = useState([]);
	const [workChatHistory, setWorkChatHistory] = useState([]);

	const mainBodyRef = useRef(null);
	const inputMessage = useRef(null);

	useEffect(() => {
		setHeightScroll(mainBodyRef.current.scrollHeight);
		scrollToBottom();
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
		loadLocalStorage();  
		
		if (e.key === 'Enter') {
		 	e.preventDefault();
			if (!inputMessage.current.value) { return; }

			if (editTextState) { 
				editerMessage();
				return;
			}

			if (switchСhat) { 
				setData(funChatHistory, setFunChatHistory, 'funChat', e);
			} else { 
			setData(workChatHistory, setWorkChatHistory, 'workChat', e);
		 	} 
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
			},
		]);
	};

	const addSticker = () => {
		if (switchСhat) { 
			setDataSticker(funChatHistory, setFunChatHistory, 'funChat');
		} else {
			setDataSticker(workChatHistory, setWorkChatHistory, 'workChat');
		}

		scrollToBottom();
	}

	const setDataSticker = (typeChat, setTypeChat, key) => {
		setTypeChat([
			...typeChat, 
			{
				date: giveDate(), 
				message: sticker,
				isImg: true,
				id: typeChat.length,
			},
		]);
	};

	const giveDate = () => {
		const date = new Date();
		const hour = date.getHours();
		let min = date.getMinutes();

 		if (min < 10) { min = `0${min}`}; 

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

		if (switchСhat) {
			localHistory = JSON.parse(localStorage.getItem('funChat'));
		} else {
			localHistory = JSON.parse(localStorage.getItem('workChat'));
		}

		localHistory.map(function(item, index) {
			if (item.id === whatClick) {
				localHistory.splice(index, 1);
				return;
			}
		});

		if (switchСhat) {
			localStorage.setItem('funChat', JSON.stringify(localHistory));  
 	 		renderData('funChat', setFunChatHistory); 
		} else {
			localStorage.setItem('workChat', JSON.stringify(localHistory));  
 	 		renderData('workChat', setWorkChatHistory); 
		}
	};

	const editMessage = () => {
		setEditTextState(true);
		setStatePopUpEditMessage(false);

		let localHistory;

		if (switchСhat) {
			localHistory = JSON.parse(localStorage.getItem('funChat'));
		} else {
			localHistory = JSON.parse(localStorage.getItem('workChat'));
		}
	
		localHistory.map(function(item) {
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

		if (switchСhat) {
			localHistory = JSON.parse(localStorage.getItem('funChat'));
		} else {
			localHistory = JSON.parse(localStorage.getItem('workChat'));
		}

		localHistory.map(function(item) {
			if (item.id === whatClick) {
				item.message = inputMessage.current.value;
			}
		});
		
		if (switchСhat) {
			localStorage.setItem('funChat', JSON.stringify(localHistory));  
 	 		renderData('funChat', setFunChatHistory); 
		} else {
			localStorage.setItem('workChat', JSON.stringify(localHistory));  
 	 		renderData('workChat', setWorkChatHistory); 
		}

		closeEditor();
	}

	const closeEditor = () => {
		setEditTextState(false);
		inputMessage.current.value = '';
	}

	const addSmile = (emoji) => {
		inputMessage.current.value = inputMessage.current.value + String.fromCodePoint(emoji); 
	}

	const scrollToBottom = () => {
		mainBodyRef.current.scroll(0, heightScroll);
	}
	
	const loadLocalStorage = () => {
		localStorage.setItem('funChat', JSON.stringify(funChatHistory));  
		localStorage.setItem('workChat', JSON.stringify(workChatHistory));
	}

	return (
		<div className="wrapper-main">
			{
				statePopUpEditMessage && 
				<PopUpEditMessage
					mousePositionX={mousePositionX}
					mousePositionY={mousePositionY}
					deleteMessage={deleteMessage}
					editMessage={editMessage}
				/>
			}
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
									{	
										!item.isImg &&
										<span className="text-in-message">
											{item.message}
										</span>
									}
									{	
										item.isImg && 
										<img
										className="wrapper-sticker"
										src={item.message}
										/>
									}
									<div className="wrapper-time-in-message">
										<span className="time-in-message"
										>
											{item.date}
										</span>
									</div>
								</div>
							</div>
						))} 

						{!switchСhat && workChatHistory.map((item, key) => (
							<div 
								key={key}
								className="wrapper-message"
							>
								<div 
									className="wrapper-message-text"
									onClick={(e) => createPopUp(e, item.id)}
								>
									{	
										!item.isImg &&
										<span className="text-in-message">
											{item.message}
										</span>
									}
									{	
										item.isImg && 
										<img
											className="wrapper-sticker"
											src={item.message}
										/>
									}
									<div className="wrapper-time-in-message">
										<span className="time-in-message"
										>
											{item.date}
										</span>
									</div>
								</div>
							</div>
						))} 
					</div>
				</div>
				{
					statePopUpSelectSmile && 
					<PopUpSelectSmile
						addSmile={addSmile}
					/>
				}
				<Footer
					loadLocalStorage={loadLocalStorage}
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