import React from 'react';

import './Header.scss';

import iconSearch from './svg/search.svg';

const Header = () => (
	<div className="wrapper-header">
		<div className="wrapper-info-chat">
			<span className="text-header">
				online
			</span>
		</div>
		<div className="wraper-search-icon">
			<img 
				src={iconSearch} 
				className="icon-search" 
				alt="iconSearch"
			/>
		</div>
	</div>
);

export default Header;
