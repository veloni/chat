import React from 'react';

import './Aside.scss';

const Aside = ({ setSwitchChat, switchСhat }) => {

	return (
    <div className="wrapper-aside"> 
			<div className="header-aside">
				<span 
					className={`icon-work-chat ${!switchСhat ? 'active-chat-button' : '' }`}
					onClick={() => setSwitchChat(false)}
				>
					Work-chat
				</span>

				<span 
					className={`icon-work-chat ${switchСhat ? 'active-chat-button' : '' }`}
					onClick={() => setSwitchChat(true)}
				>
					Fun-chat
				</span>
			</div>

			<div className="list-users">
				<div className="wrapper-list-users">
					users list
				</div>
			</div>

		</div>
	);
};

export default Aside;