import React from 'react';

import './Header.scss';

const Header = ({ 
	switchСhat,
	switchChatToFun,
	switchChatToFWork,
}) => {
	
	const clearStorage = () => {
		localStorage.clear();
		window.location.reload();
	};

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
