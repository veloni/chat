import React from 'react';

import './PopUpSelectSmile.scss';

const PopUpSelectSmile = ({ addSmile, popUpSmile }) => {
	const emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 
									0x1F355, 0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 
									0x1F579, 0x1F4DA, 0x1F431, 0x1F42A, 0x1F439, 0x1F424];

	return (
		<div 
			className="wrapper-pop-up-smiles"
			ref={popUpSmile}
		>
			{emojis.map((item, index) => (
				<div 
					key={index}
					className="smile-icon"
					onClick={() => addSmile(item)}
				> 
					{String.fromCodePoint(item)}
				</div>
			))} 
		</div>
	);
};

export default PopUpSelectSmile;
