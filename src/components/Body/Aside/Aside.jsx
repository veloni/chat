import React from 'react';

import iconSearch from './svg/search.svg';
import iconClose from './svg/close.svg';

import './Aside.scss';

const Aside = ({
	inputSearchRef, 
	searchMessage, 
	isSearch, 
	clearSearch, 
	switchСhat, 
	foundMessageFunChat, 
	foundMessageWorkChat, 
	seeMessage,
}) => (
	<div className="wrapper-aside"> 
		<div className="wrapper-search-input-icon">
			<input
				className="input-search"
				ref={inputSearchRef}
				onChange={(e) => searchMessage(e)}
			/>
			<div className="wraper-search-icon">
				<img 
					src={isSearch ? iconClose : iconSearch} 
					className={isSearch ? "close-icon-search" : "icon-search"} 
					alt="iconSearch"
					onClick={() => clearSearch()}
				/>
			</div>
			</div>
		<div className="wrapper-find-message">
			{switchСhat && 
			!!foundMessageFunChat && 
			foundMessageFunChat.map((item, key) => (
				<div 
					key={key}
					className="wrapper-found-message"
					onClick={() => seeMessage(item.id)}
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
					onClick={() => seeMessage(item.id)}
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

export default Aside;