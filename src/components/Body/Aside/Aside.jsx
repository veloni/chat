import React from 'react';

import './Aside.scss';

const Aside = ({ setSwitchChat, switchСhat, foundMessageFunChat, foundMessageWorkChat, seeMessage, setIsSearch }) => { 
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
    <div className="wrapper-aside"> 
			<div className="header-aside">
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
			<div className="wrapper-find-message">
				{switchСhat && 
				!!foundMessageFunChat && 
				foundMessageFunChat.map((item, key) => (
					<div 
						key={key}
						className="wrapper-found-message"
						onClick={(e) => seeMessage(item.id)}
					>
						<div className="wrapper-find-message-nick-name">
							<div className="wrapper-find-nick-name">
								{item.nickName}
							</div>
							<div className="wrapper-find-text-message">
								{item.message}
							</div>
						</div>
						<div className="wrapper-time">
							{item.date}
						</div>
					</div>
				))} 
				{!switchСhat && 
				!!foundMessageWorkChat && 
				foundMessageWorkChat.map((item, key) => (
				<div 
					key={key}
					className="wrapper-found-message"
					onClick={(e) => seeMessage(item.id)}
				>
					<div className="wrapper-find-message-nick-name">
						<div className="wrapper-find-nick-name">
							{item.nickName}
						</div>
						<div className="wrapper-find-text-message">
							{item.message}
						</div>
					</div>
					<div className="wrapper-time">
						{item.date}
					</div>
				</div>
			))} 
			</div>
		</div>
	);
};
export default Aside;