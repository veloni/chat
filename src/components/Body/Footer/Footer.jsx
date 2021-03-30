import React from 'react';

import './Footer.scss';

import iconAddFiles from './svg/addFile.svg';
import iconSmile from './svg/smile.svg';
import iconEdit from './svg/edit.svg';
import iconClose from './svg/close.svg'; 
import iconSticker from './svg/sticker/sticker.png'; 

const Footer = ({ loadLocalStorage, addMessage, inputMessage, statePopUpSelectSmile, setStatePopUpSelectSmile, addSticker, editTextState, closeEditor }) => {
	return (
    <div className="wrapper-footer">

			<div className="wrapper-icon-footer">
				<img 
					src={iconAddFiles} 
					className="icon-footer" 
					alt="iconAddFiles"
				/>
			</div>

			<div className="wrapper-text-area-message">
				<textarea 
					ref={inputMessage}
					onKeyDown={(e) => addMessage(e)}
					className="text-area-message"
					placeholder="Write a message"
				>
				</textarea>
			</div>
			{ editTextState &&
				<div wrapper-icon-for-edit>
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
			}
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
					onMouseUp={() => loadLocalStorage()}
					title="sticker"
					src={iconSticker} 
					className="icon-footer" 
					alt="iconAddFiles"
				/>
			</div>

		</div>
	);
};

export default Footer;