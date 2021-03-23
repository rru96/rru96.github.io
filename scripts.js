$(document).ready(function () {
    






    function addActions(){
        let nTab = document.getElementsByClassName("nav")[0];

        nTab.addEventListener("mousedown",function(ev){
            ev.preventDefault();

            void nTab.offsetWidth;

            if($(nTab).css('right') < 0+"px"){
                nTab.classList.remove("menuOut");
                nTab.classList.add("menuIn");
            }else{
                nTab.classList.add("menuOut");
            }
        });












            // let nTab = document.getElementsByClassName("navtab")[0];
            // let nItem = document.getElementsByClassName("navitem")[0];
            
            // void nTab.offsetWidth;
            // void nItem.offsetWidth;
            // if($(nTab).css('right') < 0+"px"){
            //     nTab.classList.remove("menuOut");
            //     nTab.classList.add("menuIn");

            //     nItem.classList.remove("menuOut");
            //     nItem.classList.add("menuIn");
            // }else{
            //     nTab.classList.add("menuOut");
            //     nItem.classList.add("menuOut");
            // }
    }


    addActions();

});