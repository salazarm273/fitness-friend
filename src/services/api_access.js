const api_root = "http://localhost:8080/fitworld";
let userId = 0;

export function GetUsers(){
    return myFetch(api_root + "/")
           .then(function(response) {
                 return response.json();
            })
}

export function GetFriends(){
    return myFetch(api_root + `/seeFriends`, {userId: 0})
           .then(function(response) {
                 return response.json();
            })
}






function myFetch(url = ``, data = null) {
    let options = {
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
    };
    if(data){
        options = { 
          ...options,
          method:  "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        };
    }
    return fetch(url, options)
    .then(response =>{
      return response.json()
    }); // parses response to JSON
}