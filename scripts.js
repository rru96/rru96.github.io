document.onreadystatechange = () => {
    if(document.readyState === "complete"){
        
        // let d, h, m, s;
        // function currentTime(){
        //     const today = new Date();
        //     d = today.getDay();
        //     h = today.getHours();
        //     m = today.getMinutes();
        //     s = today.getSeconds();
        //     m = checkTime(m);
        //     s = checkTime(s);
            
            
        //     let t = setTimeout(()=>{
        //         checkOpen();
        //         currentTime();
        //     },1000);
        // }

        // function checkTime(i){
        //     if(i < 10){
        //         i = "0" + i;
        //         return i;
        //     }
        // }
        // currentTime();

        


        function remapScreen(){
            let containerTop = document.getElementsByClassName("container-top-fixed")[0];
            let containerBottom = document.getElementsByClassName("container-bottom-fixed")[0];
            let containerContent = document.getElementsByClassName("container-content")[0];

            let cth = containerTop.clientHeight;
            let cbh = containerBottom.clientHeight;

            containerContent.style.marginTop = cth;
        }


        window.onresize = () =>{
            remapScreen()
        }


    }
}
