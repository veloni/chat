import React from 'react';

import './Header.scss';

const Header = ({ 
	setSwitchChat, 
	setIsSearch, 
	switchСhat,
}) => {

	const clearStorage = () => {
		localStorage.clear();
		window.location.reload();
	};

	const switchChatToFun = () => {
		setIsSearch(false);
		setSwitchChat(true);
	}

	const switchChatToFWork = () => {
		setIsSearch(false);
		setSwitchChat(false);
	}
	
	return ( 
	<div className="wrapper-header">
		<div className="wrapper-info-chat">
			<div className="header-wrapper-switch-chat">
					<span 
						className={`icon-chats ${!switchСhat ? 'active-chat-button' : '' }`}
						onClick={() => switchChatToFWork()}
					>
						Рабочий чат
					</span>
					<span 
						className={`icon-chats ${switchСhat ? 'active-chat-button' : '' }`}
						onClick={() => switchChatToFun()}
					>
						Флудильня
					</span>
				</div>
			<div className="wrapper-button-clear-storage">
				<button 
					className="button-clear-storage"
					onClick={() => clearStorage()}
				>
					ClearStorage
				</button>
			</div>
		</div>
	</div>
	);
};


export default Header;
