import React from 'react';

import './PopUpEditMessage.scss';

const PopUpEditMessage = ({ 
	mousePositionX, 
	mousePositionY, 
	deleteMessage, 
	editMessage,
	popUpEditRef,
}) => (
	<div
		className="wrapper-pop-up"
		ref={popUpEditRef}
		style={{ 
			top: `${parseInt(mousePositionY) - 100}px`, 
			left: mousePositionX, 
		}}
	>
		<div 
			className="pop-up-edit-delete"
			onClick={() => editMessage()}
		>
			Редактировать
		</div>
		<div 
			className="pop-up-edit-delete"
			onClick={() => deleteMessage()}
		>
			Удалить 
		</div>
	</div>
);

export default PopUpEditMessage;