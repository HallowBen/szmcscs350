window.addEventListener("scroll", reveal);
function reveal() {
    var reveals = document.getElementById("Up");
    var footer = document.getElementById("Footer")
    $("#Up").off()

    var windowHeight = $(document).height();
    var height= footer.getBoundingClientRect().top;
    var windowPrecent = 0.2;

    if (height<=windowHeight-(windowHeight*windowPrecent)) {
        reveals.classList.remove("up-un-revealed");
        reveals.classList.add("up-reveal");
    }
    else{
        reveals.classList.remove("up-reveal");
        reveals.classList.add("up-un-revealed");
    }

    if ($("#Up").attr("class").split(/\s+/).includes("up-reveal")) {
        $("#Up").click(function(){
            $('html, body').animate({scrollTop:0}, 'slow');
        })    
    }
}

