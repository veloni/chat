import React, { useRef, useState, useEffect } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Aside from './Aside/Aside';
import PopUpEditMessage from './PopUpEditMessage/PopUpEditMessage';
import PopUpSelectSmile from './PopUpSelectSmile/PopUpSelectSmile';
import RenderMessage from './RenderMessage/RenderMessage';

import useMessagePopUp from '../../hooks/useMessagePopUp';
import usePopUpSmiles from '../../hooks/usePopUpSmiles';
import useLoadMessageFirstEntreance from '../../hooks/useLoadMessageFirstEntreance';
import useSwitchChat from '../../hooks/useSwitchChat';
import useFunWorkChat from '../../hooks/useFunWorkChat';
import useBackgroundImage from '../../hooks/useBackgroundImage';
import useSearch from '../../hooks/useSearch';
import useMessage from '../../hooks/useMessage';

import './Body.scss';

const Body = () => {
	const [
		isFirstLocalStorage,
		setFirstLocalStorage
	] = useLoadMessageFirstEntreance();
	
	const [
    funChatHistory,
    workChatHistory,
    setFunChatHistory,
    setWorkChatHistory,
    inputMessage,
    mainBodyRef,
	] = useFunWorkChat();

	const [
		loadBackgroundImage,
    deleteBackgroundImage,
	] = useBackgroundImage({ mainBodyRef });

	const [
		addSmile,
    checkPoUpSmile,
		statePopUpSelectSmile,
		popUpSmile,
		setStatePopUpSelectSmile,
	] = usePopUpSmiles({ inputMessage });

	const [
		switchСhat,
    setSwitchChat,
    switchChatToFun,
    switchChatToFWork,
	] = useSwitchChat();

	const [
		foundMessageFunChat,
		foundMessageWorkChat,
		isSearch,
		clearSearch,
		searchMessage,
		setIsSearch,
		inputSearch,
		seeMessage,
		lengthСheck,
	] = useSearch({ switchСhat, inputMessage});

	const [
		mousePositionX, 
    mousePositionY,
    createPopUp,
    statePopUpEditMessage,
    deleteMessage,
    closeEditor,
    editMessage,
    editTextState,
    editerMessage,
    checkPoUpEditClick,
    popUpEdit,
  ] = useMessagePopUp({
		 switchСhat, 
		 setFunChatHistory, 
		 setWorkChatHistory, 
		 inputMessage, 
		 funChatHistory, 
		 workChatHistory
	});

	const [
		setLocalStorage,
    addMessage,
    addSticker,
	] = useMessage({ 
		inputMessage,
		switchСhat,
		funChatHistory,
		workChatHistory,
		setFunChatHistory,
		setWorkChatHistory,
		editTextState,
		editerMessage,
		mainBodyRef,
	 });


	useEffect(() => {
		!isFirstLocalStorage && setFirstLocalStorage();
	});

	useEffect(() => {
		scrollToBottom();
	}, []);

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

	const scrollToBottom = () => {
	 	setTimeout(() => {
			mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
		}, 1); 
	};

	const checkPopUps = (e) => {
		checkPoUpEditClick(e);
		statePopUpSelectSmile && checkPoUpSmile(e);
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
					switchChatToFun={switchChatToFun}
					switchChatToFWork={switchChatToFWork}
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