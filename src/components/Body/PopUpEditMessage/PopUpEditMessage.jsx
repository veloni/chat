import React from 'react';

import './PopUpEditMessage.scss';

const PopUpEditMessage = ({ 
	mousePositionX, 
	mousePositionY, 
	deleteMessage, 
	editMessage,
	popUpEdit,
}) => {
	mousePositionY = parseInt(mousePositionY) - 100;
	
	return (
    <div
			className="wrapper-pop-up"
			ref={popUpEdit}
			style={{ 
				top: `${mousePositionY}px`, 
				left: mousePositionX, 
			}}
		>
			<div 
				className="pop-up-edit-delete"
				onClick={(e) => editMessage()}
			>
				Редактировать
			</div>
			<div 
				className="pop-up-edit-delete"
				onClick={(e) => deleteMessage()}
			>
				Удалить 
			</div>
		</div>
	);
};

export default PopUpEditMessage;