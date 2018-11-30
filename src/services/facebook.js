import * as api from './api_access'
 window.fbAsyncInit = function() {
    FB.init({
      appId      : '999386450251942',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });
      
    FB.AppEvents.logPageView();   
    

    // eslint-disable-next-line
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
  };
   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
    
   
   export function FBLogin(){
       FB.login(
           response => statusChangeCallback(response),
           {scope: 'public_profile,email,user_photos'}
       )
   }
   function statusChangeCallback(response){
    console.log(response);
    FB.api("/me?fields=name,email,birthday,picture", me => {
     console.log(me);
     api.Loginfb(me.name, response.authResponse.userID, response.authResponse.accessToken)

    })
   } 