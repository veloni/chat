import { useEffect } from 'react'

const useScrollFirstRender = (scrollToBottom) => {
  
  const useScrollEff = () => {
    useEffect(() => {
      scrollToBottom();
    }, []); 
  };

  return useScrollEff;
};

export default useScrollFirstRender;