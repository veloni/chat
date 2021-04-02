import React from 'react';

import Message from '../Message/Message';

const RenderMessage = ({ 
	workChatHistory,
	funChatHistory,
	createPopUp,
	switchСhat,
}) => (
	<div 
	className="wrapper-main-body">
		<div className="wrapper-main-body-two">
			{switchСhat && funChatHistory.slice(0).reverse().map((item, key) => (
				<Message
					item={item}
					key={key}
					createPopUp={createPopUp}
				/>
			))} 
			{!switchСhat && workChatHistory.slice(0).reverse().map((item, key) => (
				<Message
					item={item}
					key={key}
					createPopUp={createPopUp}
				/>
			))}
		</div>
	</div>
);

export default RenderMessage;
