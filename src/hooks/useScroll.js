const useScroll = (mainBodyRef) => {
	const scrollToBottom = () => {
		setTimeout(() => {
			mainBodyRef.current.scrollTo(0, mainBodyRef.current.scrollHeight);
		}, 1);
	}; 

  return scrollToBottom;
};

export default useScroll;