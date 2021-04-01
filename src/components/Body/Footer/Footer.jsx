import React from 'react';

import iconSmile from './svg/smile.svg';
import iconEdit from './svg/edit.svg';
import iconClose from './svg/close.svg'; 
import iconBackground from './svg/background.svg'; 
import iconSticker from './svg/sticker/sticker.png'; 

import './Footer.scss';

const Footer = ({ 
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
}) => (
	<div className="wrapper-footer">
			<div className="wrapper-icon-for-backgrond-image">
				<div className="wrapper-icon-edit-delete">
					<img 
					src={iconBackground} 
					className="icon-footer" 
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
				onChange={(e) => lengthСheck()}
				onKeyDown={(e) => addMessage(e)}
				className="text-area-message"
				placeholder="Write a message"
			>
			</textarea>
		</div>
		{editTextState && (
			<div clasname="wrapper-icon-for-edit">
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
		<div className="wrapper-icon-footer">
			<img 
				onClick={() => setStatePopUpSelectSmile(!statePopUpSelectSmile)}
				src={iconSmile} 
				title="smiles"
				className="icon-footer" 
				alt="iconAddFiles"
			/>
		</div>
		<div className="wrapper-icon-footer">
			<img 
				onMouseDown={() => addSticker()}
				onMouseUp={() => setLocalStorage()}
				title="sticker"
				src={iconSticker} 
				className="icon-footer" 
				alt="iconAddFiles"
			/>
		</div>
	</div>
);

export default Footer;