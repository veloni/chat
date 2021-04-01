import { useState, useRef } from 'react';

const usePopUpSmiles = ({ inputMessage }) => {
	const [statePopUpSelectSmile, setStatePopUpSelectSmile] = useState(false);
	const popUpSmile = useRef(null);

	const checkPoUpSmile = (e) => {
		const isPopUpSmile = (statePopUpSelectSmile && e.target !== popUpSmile);
		isPopUpSmile && setStatePopUpSelectSmile(!isPopUpSmile);
	};

	const addSmile = (emoji) => {
		inputMessage.current.value = inputMessage.current.value + String.fromCodePoint(emoji); 
	};

	return [
    popUpSmile,
    statePopUpSelectSmile,
    checkPoUpSmile,
    addSmile,
    setStatePopUpSelectSmile,
  ];
};

export default usePopUpSmiles;