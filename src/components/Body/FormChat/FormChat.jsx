import React from 'react';

import iconSmile from './svg/smile.svg';
import iconEdit from './svg/edit.svg';
import iconClose from './svg/close.svg'; 
import iconBackground from './svg/background.svg'; 
import iconSticker from './svg/sticker/sticker.png'; 

import './FormChat.scss';

const FormChat = ({ 
	setLocalStorage, 
	addMessage, 
	inputMessage, 
	statePopUpSelectSmile, 
	setStatePopUpSelectSmile, 
	addSticker, 
	editTextState, 
	closeEditor,
	loadBackgroundImage,
	deleteBackgroundImage,
	lengthСheck,
	rowTextArea,
}) => (
	<div className="wrapper-form-chat">
		<div className="wrapper-icon-for-backgrond-image">
			<div className="wrapper-icon-edit-delete">
				<img 
					src={iconBackground} 
					className="icon-form-chat" 
					alt="iconAddFiles"
					onClick={() => loadBackgroundImage()}
				/>
			</div>
			<div className="wrapper-icon-edit-delete">
				<img 
					onClick={() => deleteBackgroundImage()}
					src={iconClose} 
					className="icon-close" 
					alt="iconAddFiles"
				/>
			</div>
		</div>
		<div className="wrapper-text-area-message">
			<textarea 
				ref={inputMessage}
				onChange={() => lengthСheck()}
				onKeyDown={(e) => addMessage(e)}
				className="text-area-message"
				placeholder="Введите сообщение"
				rows={rowTextArea}
			/>
		</div>
		{editTextState && (
			<div clasName="wrapper-icon-for-edit">
				<div className="wrapper-icon-edit-delete">
					<img 
						src={iconEdit} 
						className="icon-edit" 
						alt="iconAddFiles"
					/>
				</div>
				<div className="wrapper-icon-edit-delete">
					<img 
						onClick={() => closeEditor()}
						src={iconClose} 
						className="icon-close" 
						alt="iconAddFiles"
					/>
				</div>
			</div>
		)}
		<div className="wrapper-icon-form-chat">
			<img 
				onClick={() => setStatePopUpSelectSmile(!statePopUpSelectSmile)}
				src={iconSmile} 
				title="smiles"
				className="icon-form-chat" 
				alt="iconAddFiles"
			/>
			<img 
				onMouseDown={() => addSticker()}
				onMouseUp={() => setLocalStorage()}
				title="sticker"
				src={iconSticker} 
				className="icon-form-chat" 
				alt="iconAddFiles"
			/>
		</div>
	</div>
);

export default FormChat;