// ==UserScript==
// @name        DTF Show Me All Comments
// @namespace   https://github.com/TentacleTenticals/
// @match       https://dtf.ru/*
// @grant       Tentacle Tenticals
// @version     1.0.0
// @author      Tentacle Tenticals
// @description Сасай кудасай
// @homepage    https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments
// @updateURL   https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments/raw/main/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments/raw/main/main.user.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/splitCls/classes.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(() => {
  const obs = {};

  function checkForBtn(){
    if(!document.querySelector(`.page .comments`)) return;
    for(let i = 0, arr = document.querySelectorAll(`.page .comments .comments__show-all`), len = arr.length; i < len; i++){
      arr[i].click();
      console.log('Comments showed!!!');
    }
  }

  function obsComments(mode){
    new El().Obs({
      obs: obs,
      target: document.querySelector(`.page .comments .comments__content`),
      check: true,
      search: /comments/,
      name: 'comments',
      mode: mode,
      cfg: {attributes: false, childList: true, subtree: false, characterData: false},
      func: (item) => {
        if(!item.className) return;
        checkForBtn();
      }
    });
  }

  function getPageType(url){
    if(!url){
      console.log('[GetPageType] error - no url');
      return;
    }
    return url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
      let arr = text.split('/');

      if(arr[0] && arr[0].match(/^popular$/)){
        if(!arr[1]) {
          // console.log('Popular');
          return 'popular';
        }
      }

      if(arr[0] && arr[0].match(/^new$/)){
        if(!arr[1]) {
          // console.log('Popular');
          return 'new';
        }
      }

      if(arr[0] && arr[0].match(/^my$/)){
        if(arr[1] && arr[1].match(/^new$/)) {
          // console.log('Popular');
          return 'my new';
        }
      }

      if(arr[0] && arr[0].match(/^bookmarks$/)){
        if(!arr[1]) {
          // console.log('Bookmarks');
          return 'bookmarks';
        }
      }

      if(arr[0] && arr[0].match(/^u$/)){
        if(arr[1] && !arr[2]) {
          // console.log('User');
          return 'user pages';
        }else
        if(arr[1] && arr[2]) {
          // console.log('User blog');
          return 'topics';
        }
      }
      if(arr[0] && arr[0].match(/^s$/)){
        if(arr[1] && !arr[2]) {
          // console.log('Subsite');
          return 'subsites';
        }else
        if(arr[1] && arr[2]) {
          // console.log('Subsite topic');
          return 'topics';
        }
      }
      if(arr[0] && !arr[0].match(/^(u|s)$/)){
        if(arr[0] && !arr[1]) {
          // console.log('DTF subsite');
          return 'subsites';
        }else
        if(arr[0] && arr[1]) {
          // console.log('DTF subsite Topic');
          return 'topics';
        }
      }
    })
  }

  function run({page, status}){
    if(page !== 'def' && status !== 'ready') return;
    if(getPageType(document.location.href) === 'topics'){
      checkForBtn();
      !obs.comments ? obsComments('start') : obsComments('restart');
    }
  }

  new El().onPageLoad(run);

})();
