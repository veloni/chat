import React from 'react';

import './Header.scss';

import iconSearch from './svg/search.svg';

const Header = ({ searchMessage, inputSearch }) => (
	<div className="wrapper-header">
		<div className="wrapper-info-chat">
			<span className="text-header">
				online
			</span>
		</div>
		<div className="wrapper-search-input-icon">
			<input
				className="input-search"
				ref={inputSearch}
				onKeyUp={(e) => searchMessage(e)}
			/>
			<div className="wraper-search-icon">
				<img 
					src={iconSearch} 
					className="icon-search" 
					alt="iconSearch"
				/>
			</div>
		</div>
	</div>
);

export default Header;
