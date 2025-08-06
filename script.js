
const followers = document.querySelector("#followers")

  document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();

     let name = (document.querySelector("#username").value);
     console.log(name);

     let url = 'https://api.github.com/users/'+name;

     console.log(url);
      const info = new XMLHttpRequest();
    info.open('GET',url);

    info.onreadystatechange = function () {
        if (info.readyState === 4 && info.status === 200) {
            const data = JSON.parse(this.responseText)
           document.querySelector("#dp").src = data.avatar_url;
            followers.innerHTML = data.followers;
            
        }
        else if (info.readyState === 4 && info.status !== 200) {
    followers.innerHTML = "User not found";
}

    }
    info.send();
  })
    
     



   

    












    // //  function(){
    //     // console.log(info.readyState);
    //     if (info.readyState === 4) {
    //         const data = JSON.parse(this.responseText)
    //         // console.log(typeof data);
    //         // console.log(data.followers);
            
    //         // console.log(data.name);
    //     }
    // }
    
    // // info.send();



