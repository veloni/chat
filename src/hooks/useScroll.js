import { useEffect } from 'react';

const useScroll = (mainBodyRef) => {

	useEffect(() => {
		mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
  },[]);
	
	const scrollToBottom = () => {
		mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
	}; 

  return scrollToBottom;
}

export default useScroll;