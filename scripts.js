document.onreadystatechange = () => {
    if (document.readyState === "complete") {

        let containerContent, containerTop, containerBottom;
        let csvHeaders;
        let cards = [];
        let currentCard = 0;


        Papa.parse("./listing.csv", {
            download: true,
            header: true,
            complete: function (results, file) {
                csvHeaders = results.meta.fields;
                createAnimalCards(results);
            }
        })

        // create card-container
        // image-container
        // info-container
        // go through headers

        function createAnimalCards(results) {
            let sex_index = csvHeaders.indexOf("SEX");
            let adoption_index = csvHeaders.indexOf("ADOPTION MM/DD/YY");
            let animals = results.data; // individual animal arrays (csv rows)
            for (let i = 0; i < animals.length; i++) {
                let card = "";
                card += "<div class='card'>" +
                    "<div class='image-container'><img class='animal-image' src='./img/" + animals[i][csvHeaders[0]] + ".jpg'></div>";
                    if(animals[i][csvHeaders[adoption_index]] !=""){
                        card+= "<img class='animal-image adopted' src='./img/adopted.png'></div>"
                    };                   
                    card+= "<div class='info-container'>";
                    

                    if(animals[i][csvHeaders[sex_index]] === "M"){
                        for (let j = 0; j < csvHeaders.length; j++) {
                            if(csvHeaders[j].substring(0,2) === "ID" || csvHeaders[j].substring(0,7) === "SPECIES" || csvHeaders[j].substring(0,3) === "SEX" || csvHeaders[j].substring(0,7) === "SPECIES" || csvHeaders[j].substring(0,8) === "ADOPTION"){
                                // IGNORE HEADING
                            }else if(csvHeaders[j].substring(0,4) === "NAME"){ 
                                if(animals[i][csvHeaders[j]].length > 9){
                                    card+="<p><span class='blue'>"+csvHeaders[j].substring(0)+"</span> : <br><span>"+animals[i][csvHeaders[j]]+"</span>";
                                }else{
                                    card+="<p><span class='blue'>"+csvHeaders[j].substring(0)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                                }
                            }else if(csvHeaders[j].substring(0,5) === "BREED"){
                                if(animals[i][csvHeaders[j]].length > 12){
                                    card+="<p><span class='blue'>BREED</span> :<br class='pad'><span>"+animals[i][csvHeaders[j]]+"</span>";
                                }else{
                                    card+="<p><span class='blue'>BREED</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                                }
                            }else if(csvHeaders[j].substring(0,6) === "INTAKE"){
                                card+="<p><span class='blue'>"+csvHeaders[j].substring(0,6)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                            }else{
                                card+="<p><span class='blue'>"+csvHeaders[j].substring(0)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                            }
                        }

                    }else if(animals[i][csvHeaders[sex_index]] === "F"){
                        for (let j = 0; j < csvHeaders.length; j++) {
                            if(csvHeaders[j].substring(0,2) === "ID" || csvHeaders[j].substring(0,7) === "SPECIES" || csvHeaders[j].substring(0,3) === "SEX" || csvHeaders[j].substring(0,7) === "SPECIES" || csvHeaders[j].substring(0,8) === "ADOPTION"){
                                // IGNORE HEADING
                            }else if(csvHeaders[j].substring(0,4) === "NAME"){ 
                                if(animals[i][csvHeaders[j]].length > 9){
                                    card+="<p><span class='pink'>"+csvHeaders[j].substring(0)+"</span> : <br><span>"+animals[i][csvHeaders[j]]+"</span>";
                                }else{
                                    card+="<p><span class='pink'>"+csvHeaders[j].substring(0)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                                }
                            }else if(csvHeaders[j].substring(0,5) === "BREED"){
                                if(animals[i][csvHeaders[j]].length > 12){
                                    card+="<p><span class='pink'>BREED</span> :<br class='pad'><span>"+animals[i][csvHeaders[j]]+"</span>";
                                }else{
                                    card+="<p><span class='pink'>BREED</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                                }
                            }else if(csvHeaders[j].substring(0,6) === "INTAKE"){
                                card+="<p><span class='pink'>"+csvHeaders[j].substring(0,6)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                            }else{
                                card+="<p><span class='pink'>"+csvHeaders[j].substring(0)+"</span> : <span>"+animals[i][csvHeaders[j]]+"</span>";
                            }
                        }
                    }
                    card += "</div></div>";
                cards.push(card);
            }
            
            document.getElementsByClassName("slideshow")[0].innerHTML = cards[currentCard];
        }

        function init(){
            let arrows = document.getElementById("arrows");
            let arrLeft = document.getElementById("left");
            let arrRight = document.getElementsByClassName("arrow-right")[0];

            arrows.addEventListener("click", function(e){
                if(e.target.classList.contains("arrow-left")){
                    scrollAnimal("left");
                }else if(e.target.classList.contains("arrow-right")){
                    scrollAnimal("right")   ;
                }
            });

            
        }

        function scrollAnimal(direction){
            let c = document.getElementsByClassName("slideshow")[0];
            switch (direction) {
                case "left":
                    currentCard-= 1;
                    if(currentCard < 0){
                        //-2 to compensate for headings row
                        currentCard = cards.length-2;
                    }
                    
                    c.innerHTML = "";
                    c.innerHTML = cards[currentCard];
                    break;
                case "right":
                    currentCard+= 1;
                    if(currentCard > cards.length-2){
                        //-2 to compensate for headings row
                        currentCard = 0;
                    }

                    c.innerHTML = "";
                    c.innerHTML = cards[currentCard];
                    break;
                default:
                    break;
            }
        }

        function remapScreen() {
            containerTop = document.getElementsByClassName("container-top-fixed")[0];
            //containerBottom = document.getElementsByClassName("container-bottom-fixed")[0];
            containerContent = document.getElementsByClassName("container-content")[0];

            let cth = containerTop.clientHeight;
            //let cbh = containerBottom.clientHeight;

            containerContent.style.marginTop = cth;
        }

        window.onresize = () => {
            remapScreen();
        }

        remapScreen();
        init();
        

        //containerContent.innerHTML = createAnimalCard("001.jpg","001","Bruno","Cockapoo","Male","7/21/23");

    }
}
