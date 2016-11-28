import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
//components
import toastMethod from './toast.jsx';
import alertMethod from './alert.jsx';
import confirmMethod from './confirm.jsx';

export const toast = toastMethod;
export const alert = alertMethod;
export const confirm = confirmMethod;
