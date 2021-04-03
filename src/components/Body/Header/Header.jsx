import React from 'react';

import { clearStorage } from '../../../helper';

import './Header.scss';

const Header = ({ 
	switchСhat,
	switchChatToFun,
	switchChatToWork,
}) => ( 
	<div className="wrapper-header">
		<div className="wrapper-info-chat">
			<div className="header-wrapper-switch-chat">
					<span 
						className={`icon-chats ${!switchСhat ? 'active-chat-button' : '' }`}
						onClick={() => switchChatToWork()}
					>
						Рабочий&nbsp;чат
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


export default Header;
