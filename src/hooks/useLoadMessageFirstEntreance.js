const useLoadMessageFirstEntreance = () => {
  const isFirstLocalStorage = JSON.parse(localStorage.getItem('firstLoad'));

  const setFirstLocalStorage = () => {
    localStorage.setItem('funChat', JSON.stringify(firstLoadMessageFunChat));
    localStorage.setItem('workChat', JSON.stringify(firstLoadMessageWorkChat));
    localStorage.setItem('firstLoad', JSON.stringify(true));
  };

  const firstLoadMessageFunChat = [
    {
      date: "12:02", 
      message: "Я вас категорически приветсвую 😄",
      isImg: false,
      id: '0',
      nickName: "Владимир",
    },
    {
      date: "12:25",  
      message: "И я вас категорически приветсвую 😀",
      isImg: false,
      id: '1',
      nickName: "Клим",
    },
    {
      date: "20:20", 
      message: "Клим Климыч добрый вечер",
      isImg: false,
      id: '2',
      nickName: "Сан Саныч",
    },
  ];

  const firstLoadMessageWorkChat = [
    {
      date: "08:02", 
      message: "Опять сервак упал",
      isImg: false,
      id: '0',
      nickName: "Сан Саныч",
    },
    {
      date: "12:56",  
      message: "Встань и иди",
      isImg: false,
      id: '1',
      nickName: "Владимир",
    },
    {
      date: "20:20", 
      message: "Ну что поделать",
      isImg: false,
      id: '2',
      nickName: "Владимир",
    },
  ];

  return [isFirstLocalStorage, setFirstLocalStorage];
}

export default useLoadMessageFirstEntreance

