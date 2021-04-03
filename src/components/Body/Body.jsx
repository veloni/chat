import React from 'react';

import Header from './Header/Header';
import FormChat from './FormChat/FormChat';
import Aside from './Aside/Aside';
import PopUpEditMessage from './PopUpEditMessage/PopUpEditMessage';
import PopUpSelectSmile from './PopUpSelectSmile/PopUpSelectSmile';
import RenderMessage from './RenderMessage/RenderMessage';

import useScrollFirstRender from '../../hooks/useScrollFirstRender';
import useCheckPopUps from '../../hooks/useCheckPopUps';
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

	const useScrollEff = useScrollFirstRender(scrollToBottom);

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
		foundMessageActive,
		inputSearchRef,
		clearSearch,
		searchMessage,
		seeMessage,
	] = useSearch(
		switchСhat, 
		inputMessage, 
		setIsSearch, 
		isSearch,
	 );

	const [
		mousePositionX, 
    mousePositionY,
		mousePositionYTop,
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
		foundMessageActive,
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
		rowTextArea,
		lengthСheck,
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

	const [
		checkPopUps
	] = useCheckPopUps(
		checkPoUpEditClick, 
		statePopUpSelectSmile, 
		checkPoUpSmile
	);

	useScrollEff();

	return (
		<div 
			className="wrapper-main"
			onClick={(e) => checkPopUps(e)}
		>
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
				<FormChat
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
					rowTextArea={rowTextArea}
				/>
				{statePopUpEditMessage && <PopUpEditMessage
					popUpEditRef={popUpEditRef}
					mousePositionX={mousePositionX}
					mousePositionY={mousePositionY}
					mousePositionYTop={mousePositionYTop}
					deleteMessage={deleteMessage}
					editMessage={editMessage}
				/>}
			</div>
		</div>
	);
};

export default Body;