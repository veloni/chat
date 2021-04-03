import { setDataFromLocalStorage, getDataFromLocalStorage } from '../helper';

import { useEffect } from 'react';

const useLoadMessageFirstEntreance = () => {
	useEffect(() => {
		!isFirstLocalStorage && setFirstLocalStorage();
	});

  const isFirstLocalStorage = getDataFromLocalStorage('firstLoad');

  const setFirstLocalStorage = () => {
    setDataFromLocalStorage('funChat', firstLoadMessageFunChat);
    setDataFromLocalStorage('workChat', firstLoadMessageWorkChat);
    setDataFromLocalStorage('firstLoad', true);
  };

  const firstLoadMessageFunChat = [
    {
      date: '12:02', 
      message: 'Я вас категорически приветствую 😄',
      isImg: false,
      id: '0',
      nickName: 'Владимир',
    },
    {
      date: '12:25',  
      message: 'И я вас категорически приветствую 😀',
      isImg: false,
      id: '1',
      nickName: 'Клим',
    },
    {
      date: '20:20', 
      message: 'Клим Климыч добрый вечер',
      isImg: false,
      id: '2',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:21', 
      message: 'Клим Климыч добрый вечер',
      isImg: false,
      id: '3',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:22', 
      message: 'Сан Саныч добрый вечер',
      isImg: false,
      id: '4',
      nickName: 'Иван Иваныч',
    },
    {
      date: '20:23', 
      message: 'Иван Иваныч добрый вечер',
      isImg: false,
      id: '5',
      nickName: 'Клим Климыч',
    },
    {
      date: '20:24', 
      message: 'Владимир Владимирович добрый вечер',
      isImg: false,
      id: '6',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:25', 
      message: 'Сан Саныч добрый вечер',
      isImg: false,
      id: '7',
      nickName: 'Владимир Владимирович',
    },
    {
      date: '20:26', 
      message: 'Клим Климыч добрый вечер',
      isImg: false,
      id: '8',
      nickName: 'Сан Климыч',
    },
  ];

  const firstLoadMessageWorkChat = [
    {
      date: '08:02', 
      message: 'Опять сервак упал',
      isImg: false,
      id: '0',
      nickName: 'Сан Саныч',
    },
    {
      date: '12:56',  
      message: 'Встань и иди',
      isImg: false,
      id: '1',
      nickName: 'Владимир',
    },
    {
      date: '20:20', 
      message: 'Ну что поделать',
      isImg: false,
      id: '2',
      nickName: 'Владимир',
    },
    {
      date: '20:21', 
      message: 'Сервак упал',
      isImg: false,
      id: '3',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:22', 
      message: 'Сервак поднял',
      isImg: false,
      id: '4',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:23', 
      message: 'Сервак упал',
      isImg: false,
      id: '5',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:24', 
      message: 'Сервак поднял',
      isImg: false,
      id: '6',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:25', 
      message: 'Сервак упал',
      isImg: false,
      id: '7',
      nickName: 'Сан Саныч',
    },
    {
      date: '20:26', 
      message: 'Сервак поднял',
      isImg: false,
      id: '8',
      nickName: 'Сан Саныч',
    },
  ];

  return [isFirstLocalStorage, setFirstLocalStorage];
};

export default useLoadMessageFirstEntreance;

