import React from 'react';

import './Aside.scss';

const Aside = ({ setSwitchChat, switchСhat, foundMessage, seeMessage }) => { 
	const clearStorage = () => {
		localStorage.clear();
		window.location.reload();
	};

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
			<div className="wrapper-button-clear-storage">
				<button 
					className="button-clear-storage"
					onClick={() => clearStorage()}
				>
					ClearStorage
				</button>
			</div>
			<div className="wrapper-find-message">
				{foundMessage.map((item, key) => (
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