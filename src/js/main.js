import Router from './router';

let contentSpaDiv = document.querySelector('.content-spa');

Router();

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js');
}
export default contentSpaDiv;

