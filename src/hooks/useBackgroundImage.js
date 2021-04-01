import { useEffect } from 'react';

const useBackgroundImage = ({mainBodyRef}) => {

 	useEffect(() => {
		firstLoadBackgroundMessage();
	}); 

	const isBackgroundMessage = JSON.parse(localStorage.getItem('firstLoad'));
	
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
					localStorage.setItem('BackgroundImage', JSON.stringify(pathImage));
					localStorage.setItem('isBackgroundImage', JSON.stringify(true));

					mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
				}
		  }
		}
		input.click();
	};

	const deleteBackgroundImage = () => {
		localStorage.setItem('BackgroundImage', JSON.stringify(''));
		localStorage.setItem('isBackgroundImage', JSON.stringify(false));
		mainBodyRef.current.style.backgroundImage = 'none';
	};

	const firstLoadBackgroundMessage = () => {
		const pathImage = JSON.parse(localStorage.getItem('BackgroundImage'));
		if (!isBackgroundMessage) {
			mainBodyRef.current.style.backgroundImage = `url( ${pathImage} )`;
		}
	};

  return [
    loadBackgroundImage,
    deleteBackgroundImage,
  ]
}

export default useBackgroundImage
