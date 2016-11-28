import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
//components
import toastMethod from './toast';
import alertMethod from './alert';
import confirmMethod from './confirm';

export const toast = toastMethod;
export const alert = alertMethod;
export const confirm = confirmMethod;
