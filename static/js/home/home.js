// const BlogBody = document.getElementById("BlogBody")

const OwlCarousel = document.getElementById("OwlCarousel")
const OwlCarousel2 = document.getElementById("OwlCarousel-2")


String.prototype.trimToLength = function(x){
    return (this.length > x) 
    ? jQuery.trim(this).substring(0, x).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};

 $.ajax({
    type:'GET',
    url: `hblog/`,
    success: function(response){
        blog=response.blog
        if (blog.length<=2) {
            $("#Hirek").hide()
        }
        else{
            blog.forEach(el => {
                let substring = el.poszt;
                substring=substring.trimToLength(80);

                esemenyideje = "esemeny-ideje"; if( el.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                // blogtipus = "blog-container"; if(el.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
                var blogtipus;
                if(el.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
                photo= "blog-photo"; if( el.kep === 0 ) { photo+=" non-visible"};

                OwlCarousel.innerHTML+=`<div class="owl-item element">
                    <div class="element-bg-kep" style="background-image: url('${el.kep}');"></div>
                    <div class="element-cim ${blogtipus}">${el.cim}</div>
                    <div class="${blogtipus} element-btn-container"><div id="${el.id}" class="element-tovabb tovabb">--Tovább--</div></div>
                </div>`
            });
            // <img src="${el.kep}" class="element-kep" alt="">
            owlcarousel();
        }
},
    error: function(response){
        console.log('error', error)
    }

})

function main(){
    const tovabb = [... document.getElementsByClassName("tovabb")]

    $(tovabb).click(function(){
        if(String($(this).attr("id"))==="Ossz"){
            window.location.assign(window.location.href+"blog")
        }
        else{
                localStorage.setItem("directid",$(this).attr("id"))
                window.location.assign(window.location.href+"blog")
        }
    })
    }


    function owlcarousel(){
        var owl = $('#OwlCarousel1').owlCarousel({
            loop:true,
            margin: 30,
            autoplay:true,
            nav: true,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:3,
                    
                },
            }
            })
        
            $('.owl-next').click(function() {
            owl.trigger('next.owl.carousel');
        })
        $('.owl-prev').click(function() {
            owl.trigger('prev.owl.carousel');
        })
        main();
    }


function hide() {
    const MainNavbar = document.getElementById("MainNavbar")
    const HeaderWrap = document.getElementById("HeaderWrap")
    var HWtop = HeaderWrap.getBoundingClientRect().top;
    var MNtop = MainNavbar.getBoundingClientRect().top;
    var MNbottom = MainNavbar.getBoundingClientRect().bottom;
    var HWbottom = HeaderWrap.getBoundingClientRect().bottom;
    var HWcenter = (HWbottom+HWtop)/2
    var elementVisible2 = 100;
    var elementVisible = 45

    if ((HWtop <= MNbottom - elementVisible) && !(MNtop > HWcenter - elementVisible2)) {
        MainNavbar.classList.remove("nav-shown")
        MainNavbar.classList.add("nav-hidden");
    }
    else{
        MainNavbar.classList.remove("nav-hidden");
        MainNavbar.classList.add("nav-shown")
    }
}

window.addEventListener("scroll", hide);





$.ajax({
    type:'GET',
    url: `hesemeny/`,
    success: function(response){
        esemeny=response.esemeny
        if (esemeny.length<=2) {
            $("#Gallery").hide()
        }
        else{
            esemeny.forEach(el => {

                esemenyideje = "g-esemeny-ideje"; if( el.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                photo= "g-hg-photo";

                OwlCarousel2.innerHTML+=`<div class="owl-item g-element">
                    <div class="g-element-bg-kep" style="background-image: url('${el.kep}');"></div>
                    <div class="g-element-cim">${el.cim}</div>
                    <div class="g-element-frissitve">Frissítve: ${el.date}</div>
                    <div class="g-element-btn-container"><div data-url="${el.galleria}" class="g-element-tovabb g-tovabb">--Tovább--</div></div>
                </div>`
            });
            owlcarousel2();
                    // <img src="${el.kep}" class="g-element-kep" alt="">
        }
},
    error: function(response){
        console.log('error', error)
    }

})
 function owlcarousel2(){
        var owl = $('#OwlCarousel2').owlCarousel({
            loop:true,
            margin: 30,
            autoplay:true,
            nav: true,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:3,
                },
            }
            })
        
            $('.owl-next').click(function() {
            owl.trigger('next.owl.carousel');
        })
        $('.owl-prev').click(function() {
            owl.trigger('prev.owl.carousel');
        })
        main2();
    }

    function main2(){
        const gtovabb = [... document.getElementsByClassName("g-tovabb")]
    
        $(gtovabb).click(function(){
            window.location.assign(window.location.origin+$(this).attr("data-url"))
        })
        }