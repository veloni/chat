import React from 'react';

import Message from '../Message/Message';

const RenderMessage = ({ 
	workChatHistory,
	funChatHistory,
	createPopUp,
	switchСhat,
}) => (
	<div className="wrapper-main-body">
		{switchСhat && funChatHistory.map((item, key) => (
			<Message
				item={item}
				key={key}
				createPopUp={createPopUp}
			/>
		))} 
		{!switchСhat && workChatHistory.map((item, key) => (
			<Message
				item={item}
				key={key}
				createPopUp={createPopUp}
			/>
		))}
	</div>
);

export default RenderMessage;
