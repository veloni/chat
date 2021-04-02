import React, { useEffect } from 'react';

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
import useScroll from '../../hooks/useScroll';

import './Body.scss';

const Body = () => {

	useLoadMessageFirstEntreance();
	
	const [
		funChatHistory,
    workChatHistory,
    inputMessage,
    mainBodyRef,
    setFunChatHistory,
    setWorkChatHistory,
	] = useFunWorkChat();

	const scrollToBottom = useScroll(mainBodyRef);

	const [
		loadBackgroundImage,
    deleteBackgroundImage,
	] = useBackgroundImage(mainBodyRef);

	const [
		popUpSmile,
    statePopUpSelectSmile,
    checkPoUpSmile,
    addSmile,
    setStatePopUpSelectSmile,
	] = usePopUpSmiles(inputMessage);

	const [
    switchСhat,
    setSwitchChat,
    switchChatToFun,
    switchChatToWork,
    setIsSearch,
    isSearch,
	] = useSwitchChat(scrollToBottom);

	const [
		foundMessageFunChat,
		foundMessageWorkChat,
		fondMessageActive,
		inputSearchRef,
		clearSearch,
		searchMessage,
		seeMessage,
		lengthСheck,
	] = useSearch(
		switchСhat, 
		inputMessage, 
		setIsSearch, 
		isSearch,
	 );

	const [
		mousePositionX, 
    mousePositionY,
    editTextState,
    popUpEditRef,
    createPopUp,
    statePopUpEditMessage,
    deleteMessage,
    closeEditor,
    editMessage,
    editerMessage,
    checkPoUpEditClick,
  ] = useMessagePopUp(
		switchСhat, 
		fondMessageActive,
		setFunChatHistory, 
		setWorkChatHistory, 
		inputMessage, 
		funChatHistory, 
		workChatHistory,
	);

	const [
		setLocalStorage,
    addMessage,
    addSticker,
	] = useMessage(
		inputMessage,
		switchСhat,
		funChatHistory,
		workChatHistory,
		setFunChatHistory,
		setWorkChatHistory,
		editTextState,
		editerMessage,
		scrollToBottom,
	 );

	const checkPopUps = (e) => {
		checkPoUpEditClick(e);
		statePopUpSelectSmile && checkPoUpSmile(e);
	};

	return (
		<div 
			className="wrapper-main"
			onClick={(e) => checkPopUps(e)}
		>
			{statePopUpEditMessage && <PopUpEditMessage
				popUpEditRef={popUpEditRef}
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
				inputSearchRef={inputSearchRef}
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
					switchChatToFun={switchChatToFun}
					switchChatToWork={switchChatToWork}
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