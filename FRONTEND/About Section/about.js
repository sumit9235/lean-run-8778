
    const socket = io("http://localhost:8000/", { transports: ["websocket"] });
     document.querySelector("#form").addEventListener("submit",(e)=>{
        e.preventDefault();
        let name=localStorage.getItem("user");
        if(name==null){
          name="Anonnymous"
        }
        let msg = document.querySelector("#message").value;
        sent_msg(name,msg)
        document.querySelector("#message").value = '';
     })

     function sent_msg(name,msg){
        socket.emit("chat",name,msg)
     }
     
     
     socket.on("recived_msg",(name,msg)=>{
      let div = document.querySelector(".message-box");
      let p = document.createElement("p");
      let nameSpan = document.createElement("span");
      let msgSpan = document.createElement("span");
      
      nameSpan.textContent = `${name}: `;
      nameSpan.className = "name";
      
      msgSpan.textContent = msg;
      msgSpan.className = "msg";
      
      p.appendChild(nameSpan);
      p.appendChild(msgSpan);
      
      div.appendChild(p);
    })