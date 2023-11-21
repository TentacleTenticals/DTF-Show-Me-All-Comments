// ==UserScript==
// @name        DTF Show me comments
// @namespace   https://github.com/TentacleTenticals/
// @match       https://*dtf.ru/*
// @grant       Tentacle Tenticals
// @version     1.0.3
// @author      Tentacle Tenticals
// @description Сасай кудасай
// @homepage    https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments
// @updateURL   https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments/raw/main/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Show-Me-All-Comments/raw/main/main.user.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/splitCls/classes.js
//
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(() => {
  function checkForBtn(){
    if(!document.querySelector(`.page .comments`)) return;
    for(let i = 0, arr = document.querySelectorAll(`.page .comments .comment__load-more`), len = arr.length; i < len; i++){
      arr[i].click();
      console.log('Comments showed!!!');
    }
    // document.querySelectorAll(`.comments .comments__show-all`).click();
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
        console.log('OBS COMMENTS', item);
        checkForBtn();
        // if(item.classList.value.match(/comments__show-all/)){
        //   feedsSearch();
          // console.log('FOUNDED!!!', item);
        // }
      }
    });
  }

  function getPageType(url){
  if(!url){
    console.log('[GetPageType] error - no url');
    return;
  }
  url.replace(/https:\/\/.*dtf\.ru\/([^]+)/, (d, text) => {
    function ch(t){
      if(t) return true;
    }
    const arr = text.split('/');

    switch(true && true){
      case arr[0] && ch(arr[0].match(/^popular$/)?.input):{
        if(!arr[1]) return url = {type: 'popular'};
      }break;

      case arr[0] && ch(arr[0].match(/^new$/)?.input):{
        if(!arr[1]) return url = {type: 'new'};
      }break;

      case arr[0] && ch(arr[0].match(/^my$/)?.input):{
        if(arr[1] && arr[1].match(/^new$/)) return url = {type: 'my new'};
      }break;

      case arr[0] && ch(arr[0].match(/^bookmarks$/)?.input):{
        if(!arr[1]) return url = {type: 'bookmarks'};
      }break;

      case arr[0] && ch(arr[0].match(/^u$/)?.input):{
        if(arr[1] && !arr[2]) return url = {type: 'user page', name: arr[1]};
      else
        if(arr[1] && arr[2]) return url = {type: 'topic'};
      }break;

      case arr[0] && ch(arr[0].match(/^s$/)?.input):{
        if(arr[1] && !arr[2]) return url = {type: 'subsite', name: arr[1]};
      else
        if(arr[1] && arr[2]) return url = {type: 'topic'};
      }break;

      case arr[0] && ch(!arr[0].match(/^(u|s)$/)?.input):{
        if(arr[0] && !arr[1]) return url = {type: 'subsite', name: arr[0]};
      else
        if(arr[0] && arr[1]) return url = {type: 'topic'};
      }break;

    }
  })
  return url;
}

  function run(c){
    if(c.page !== 'def' && c.status !== 'ready') return;
    if(getPageType(document.location.href).type === 'topic'){
      checkForBtn();
      !obs.comments ? obsComments('start') : obsComments('restart');
    }
  }

  new El().onPageLoad(run);

})();
