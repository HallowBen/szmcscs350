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
            window.location.assign(window.location.href+"hirek")
        }
        else{
                localStorage.setItem("directid",$(this).attr("id"))
                window.location.assign(window.location.href+"hirek")
        }
    })
    }


    function owlcarousel(){
        var owl = $('#OwlCarousel1').owlCarousel({
            loop:true,
            margin: 30,
            autoplay:true,
            nav: false,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                },
                650:{
                    items:2,
                },
                750:{
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
    var HWbottom = HeaderWrap.getBoundingClientRect().bottom;
    var HWcenter = (HWbottom+HWtop)/2
    var elementVisible2 = 100;

    if ((HWtop < 0) && !(MNtop > HWcenter - elementVisible2)) {
        MainNavbar.classList.remove("nav-shown")
        MainNavbar.classList.add("nav-hidden");
    }
    else{
        if(MainNavbar.classList.contains("nav-hidden")){
        MainNavbar.classList.remove("nav-hidden");
        MainNavbar.classList.add("nav-shown")
        }
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
                esemeny_ido_szoveg="Frissítve: "
                if(window.innerWidth<=1100){
                    esemeny_ido_szoveg+="<br>"
                }

                esemenyideje = "g-esemeny-ideje"; if( el.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                photo= "g-hg-photo";

                OwlCarousel2.innerHTML+=`<div class="owl-item g-element">
                    <div class="g-element-bg-kep" style="background-image: url('${el.kep}');"></div>
                    <div class="g-element-cim">${el.cim}</div>
                    <div class="g-element-frissitve">${esemeny_ido_szoveg}${el.date}</div>
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
        nav: false,
        autoplayTimeout:4000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1,
            },
            650:{
                items:2,
            },
            750:{
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

    WidthRespons()
    $(window).resize(WidthRespons)

function WidthRespons(){
    var KapTov=[...document.getElementsByClassName("tov_oldal")]
    var KapOld=[...document.getElementsByClassName("kap_oldal")]
    var OwlNav=[...document.getElementsByClassName("owl-nav")]
    
    if(window.innerWidth<650){
        KapTov.forEach(el => {
            el.classList.add("non-visible")
            el.classList.remove("clickable")
        });
        KapOld.forEach(el => {
            el.classList.add("clickable")
        });
        $(KapOld).click(function(){
            window.open($(this).attr("data-url"))
        })
        OwlNav.forEach(el => {
            el.classList.add("non-visible")
        });
    }
    else{
        KapTov.forEach(el => {
            el.classList.remove("non-visible")
            el.classList.add("clickable")
        });
        KapOld.forEach(el => {
            el.classList.remove("clickable")
        });
        $(KapTov).click(function(){
            window.open($(this).parent().attr("data-url"))
        })
        OwlNav.forEach(el => {
            el.classList.remove("non-visible")
        });
    }
}