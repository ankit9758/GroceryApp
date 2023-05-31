import axios, { AxiosRequestConfig } from 'axios';
import {BASE_URL} from './AppConstant'

export const callApi = (
  methodType: AxiosRequestConfig['method'],
  url: string,
  params?: any,
) => {
  console.log('group chatss url is',BASE_URL+url)
  console.log('param iss======>',params);
 
  return axios({
    method: methodType,
    url: BASE_URL + url,
    data: params,
    
  })
  
    .then(function (response) {
      console.log('response cgdf-->',response.request)
      return Promise.resolve(response);
    })
    .catch(function (response) {
      console.log('response cgr-->',response)

      return Promise.reject(response);
    });
};
export const callApiWithoutParams = (
  methodType: AxiosRequestConfig['method'],
  url: string,
  
) => {
  console.log('group chatss url is',BASE_URL+url)

 
  return axios({
    method: methodType,
    url: BASE_URL + url,
   
    
  })
  
    .then(function (response) {
      console.log('response cgdf-->',response.request)
      return Promise.resolve(response);
    })
    .catch(function (response) {
      console.log('response cgr-->',response)

      return Promise.reject(response);
    });
};

export const callApiUser = (
  methodType: AxiosRequestConfig['method'],
  url: string,
  header?: AxiosRequestConfig['headers'],
) => {
  return axios({
    method: methodType,
    url: BASE_URL + url,
    headers: header,
  })
    .then(function (response) {
      return Promise.resolve(response);
    })
    .catch(function (response) {
      return Promise.reject(response);
    });
};
