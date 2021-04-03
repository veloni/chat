const useCheckPopUps = (
  checkPoUpEditClick, 
  statePopUpSelectSmile, 
  checkPoUpSmile,
) => {
  const checkPopUps = (e) => {
    checkPoUpEditClick(e);
    statePopUpSelectSmile && checkPoUpSmile(e);
  }
  return [checkPopUps];
};

export default useCheckPopUps;
