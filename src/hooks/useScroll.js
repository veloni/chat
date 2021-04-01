import { useEffect } from 'react';

const useScroll = ({ mainBodyRef }) => {

   useEffect(() => {
		scrollToBottom();
	}); 

	 const scrollToBottom = () => {
	 	setTimeout(() => {
			mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
		}, 1); 
	}; 

  return [
		scrollToBottom,
  ]
}

export default useScroll