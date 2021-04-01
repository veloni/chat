import { useEffect } from 'react';

import { getDataFromLocalStorage, setDataFromLocalStorage } from './helper';

const useBackgroundImage = ({mainBodyRef}) => {

 	useEffect(() => {
		firstLoadBackgroundMessage();
	}); 

	const isBackgroundMessage = getDataFromLocalStorage('firstload');
	
  const loadBackgroundImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		
		input.onchange = e => { 
			const file = e.target.files[0]; 

			const reader = new FileReader();
			reader.readAsDataURL(file); 

			reader.onload = readerEvent => {
				const pathImage = readerEvent.target.result; 
		
				if (pathImage.includes('/png')) {
          setDataFromLocalStorage('BackgroundImage', pathImage);
          setDataFromLocalStorage('isBackgroundImage', true);

					mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
				}
		  }
		}
		input.click();
	};

	const deleteBackgroundImage = () => {
    setDataFromLocalStorage('BackgroundImage', '');
    setDataFromLocalStorage('isBackgroundImage', false);

		mainBodyRef.current.style.backgroundImage = 'none';
	};

	const firstLoadBackgroundMessage = () => {
		const pathImage = getDataFromLocalStorage('BackgroundImage');
		if (!isBackgroundMessage) {
			mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
		}
	};

  return [
    loadBackgroundImage,
    deleteBackgroundImage,
  ];
};

export default useBackgroundImage;