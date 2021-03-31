import React from 'react';

import './Header.scss';

import iconSearch from './svg/search.svg';
import iconClose from './svg/close.svg';

const Header = ({ searchMessage, inputSearch, isSearch, endSearch}) => (
	<div className="wrapper-header">
		<div className="wrapper-info-chat">
			<span className="text-header">
				online
			</span>
		</div>
		<div className="wrapper-search-input-icon">
			<input
				defaultValue="Клим"
				className="input-search"
				ref={inputSearch}
				onChange={(e) => searchMessage(e)}
			/>
			<div className="wraper-search-icon">
				<img 
					src={isSearch ? iconClose : iconSearch} 
					className="icon-search" 
					alt="iconSearch"
					onClick={() => endSearch()}
				/>
			</div>
		</div>
	</div>
);

export default Header;
