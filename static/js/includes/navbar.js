const subnavcontainer = [...document.getElementsByClassName("sub-nav-container")]
const navitem = [... document.getElementsByClassName("nav-item")]
const subnavitem = [... document.getElementsByClassName("sub-nav-item")]
const navitemwrapper = [... document.getElementsByClassName("nav-item-wrapper")]
const navwrapper = [... document.getElementsByClassName("nav-wrapper")]
const navbar = [...document.getElementsByClassName("navbar")]
const navlink = [... document.getElementsByClassName("nav-link")]

// mobile
const MobileWidth= 1100
const mobilebtn =[... document.getElementsByClassName("mobile-btn")]
const mobilenav = [... document.getElementsByClassName("mobile-nav")]
const mobileclose = [... document.getElementsByClassName("mobile-close")]
const mobilemorenav =[... document.getElementsByClassName("mobile-more-nav")]
const mobilenavdetail=[... document.getElementsByClassName("mobile-nav-detail")]

const MainNavbar = document.getElementById("MainNavbar")

var screenwidth=screen.width

mainnav();


window.onresize = function(){
    screenwidth=screen.width;
    mainnav();
}

function mainnav(){
    // reset things

    $(document).off()
    $(mobileclose).off()
    $(mobilenav).off()
    $(navitem).off()
    $(subnavcontainer).off()
    $(subnavitem).off()
    $(mobilenavdetail).off()

    // reset end

    // class reset


    MainNavbar.classList.remove("more")

    $(mobilenavdetail).parent().removeClass("clicked")

    $(mobilenavdetail).children().removeClass("mobile-more")

    $(mobilenav).removeClass("mobile-clicked")

    MainNavbar.classList.remove("clicked")

    navitemwrapper.forEach(el => {
        el.classList.remove("non-visible")
        el.classList.remove("mobile-nav-item-wrapper")
        el.classList.add("nav-item-wrapper")
    });

    mobilebtn.forEach(el => {
            el.classList.add("non-visible")
            el.classList.remove("mobile-clicked","mobile-hover")
    });

    navwrapper.forEach(el => {
        el.classList.add("nav-wrapper")
        el.classList.remove("mobile-nav-wrapper")
    });

    navbar.forEach(el => {
        el.classList.add("nav-bar")
        el.classList.remove("mobile-navbar")
        el.classList.remove("mobile-clicked")
    });

    navitem.forEach(el => {
        el.classList.add("nav-item")
        el.classList.remove("mobile-nav-item")
    });

    subnavitem.forEach(el=>{
        el.classList.remove("mobile-sub-nav-item")
        el.classList.add("sub-nav-item")
    })
    subnavcontainer.forEach(el=>{
        el.classList.add("non-visible")
        el.classList.remove("mobile-sub-nav")
    })

    // class reset end

    if (screenwidth>=MobileWidth) {

        navitemwrapper.forEach(el => {
            el.classList.remove("non-visible")
        });

        mobilebtn.forEach(el => {
            el.classList.add("non-visible")
        });

        $(navitem).mouseover(function(){
            $(this).addClass("nav-hover");
            if ($(this).next().length !== 0) {
                        if ($(this).next().attr("class").split(/\s+/).includes("sub-nav-container")) {
                            $(this).next().addClass("sub-nav");
                            $(this).next().removeClass("non-visible"); 
                        }}
        })

        $(navitem).mouseout(function(){
            $(this).removeClass("nav-hover");
                if ($(this).next().length !== 0) {
                    if ($(this).next().attr("class").split(/\s+/).includes("sub-nav-container")) {
                        $(this).next().removeClass("sub-nav");
                        $(this).next().addClass("non-visible");
                }
                }
        })



        $(subnavcontainer).mouseover(function(){
            $(this).prev().addClass("nav-hover");
            $(this).addClass("sub-nav");
            $(this).removeClass("non-visible");
        })

        $(subnavcontainer).mouseout(function(){
            $(this).prev().removeClass("nav-hover");
            $(this).removeClass("sub-nav");
            $(this).addClass("non-visible")
        })



        $(subnavitem).mouseover(function(){
            $(this).addClass("nav-hover");
        })

        $(subnavitem).mouseout(function(){
            $(this).removeClass("nav-hover");
        })

        $(navlink).click(function(){
            window.location.assign(window.location.origin+$(this).attr("data-url"))
        })
    }

// ----------------------------------------------------------------------------

    if (screenwidth<MobileWidth) {

        // prev settings

        navitemwrapper.forEach(el => {
            el.classList.add("non-visible")
            el.classList.remove("nav-item-wrapper")
        });

        mobilebtn.forEach(el => {
            if (!el.classList.contains("mobile-close")) {
                el.classList.remove("non-visible")
            }
        });

        // end of prev settings

        $(mobilenav).mouseover(function(){
            $(this).addClass("mobile-hover");
        }
        )
        
        $(mobilenav).mouseout(function(){
            $(this).removeClass("mobile-hover");
        })
       
        $(mobilenav).click(function(){
            MainNavbar.classList.add("clicked");
            $(this).addClass("mobile-clicked");
            mobile();
        })


        function mobile(){

            $(document).click(function(event) { 
                var $target = $(event.target);
                if(!($target.closest(navwrapper).length || $target.closest("#SocialMedia").length)&& !$(navwrapper).attr("class").includes("non-visible")){
                    mainnav();
                }        
              });


            if(MainNavbar.classList.contains("clicked")){
                
                navitemwrapper.forEach(el => {
                    el.classList.remove("non-visible")
                });
   
                navwrapper.forEach(el => {
                    el.classList.remove("nav-wrapper")
                    el.classList.add("mobile-nav-wrapper")
                });

                navbar.forEach(el => {
                    el.classList.remove("nav-bar")
                    el.classList.add("mobile-navbar")
                });

                navitem.forEach(el => {
                    el.classList.remove("nav-item")
                    el.classList.add("mobile-nav-item")
                });

                navitemwrapper.forEach(el => {
                    el.classList.add("mobile-nav-item-wrapper")
                });

                mobilebtn.forEach(el => {
                    if (el.classList.contains("mobile-close")) {
                        el.classList.remove("non-visible")
                    }
                });

                $(mobileclose).click(function(){
                    MainNavbar.classList.remove("clicked")
                    $(mobilenav).removeClass("mobile-clicked")
                    mobile()
                })
                $(mobileclose).mouseover(function(){
                    $(this).addClass("mobile-hover")
                })
                $(mobileclose).mouseout(function(){
                    $(this).removeClass("mobile-hover")
                })

                 $(mobilenavdetail).mouseover(function(){
                    $(this).first().addClass("mobile-hover")
                })
                 $(mobilenavdetail).mouseout(function(){
                    $(this).first().removeClass("mobile-hover")
                 })

                $(navitem).mouseover(function(){
                        $(this).addClass("mobile-hover")
                })

                $(navitem).mouseout(function(){
                        $(this).removeClass("mobile-hover")
                })

                $(navitem).click(function(){
                    if(!$(this).attr("class").split(/\s+/).includes("clicked")){
                        $(this).children().children().addClass("mobile-more")
                        MainNavbar.classList.add("more")
                        $(this).addClass("clicked")
                        $(this).children().children().removeClass("mobile-less")
                    }
                    else{
                        MainNavbar.classList.remove("more")
                        $(this).children().children().removeClass("mobile-more")
                        $(this).children().children().addClass("mobile-less")
                        $(this).removeClass("clicked")
                    }
                    let el= $(this)
                    mobilemore(el);
                 })

                //  $(mobilenavdetail).click(function(){
                //     if(!$(this).parent().attr("class").split(/\s+/).includes("clicked")){
                //         $(this).children().addClass("mobile-more")
                //         MainNavbar.classList.add("more")
                //         $(this).parent().addClass("clicked")
                //         $(this).children().removeClass("mobile-less")
                //     }
                //     else{
                //         MainNavbar.classList.remove("more")
                //         $(this).children().removeClass("mobile-more")
                //         $(this).children().addClass("mobile-less")
                //         $(this).parent().removeClass("clicked")
                //     }
                //     let el= $(this).parent()
                //     mobilemore(el);
                //  })
            }

            else{
                mainnav()
            }

        }

        function mobilemore(el){
            if(MainNavbar.classList.contains("more")){

                    $(el).next().removeClass("non-visible")
                    $(el).next().addClass("mobile-sub-nav")
                    $(el).next().children(".sub-nav-item").addClass("mobile-sub-nav-item")
                    $(el).next().children(".sub-nav-item").removeClass("sub-nav-item")
        
                    $(subnavitem).mouseover(function(){
                        $(this).addClass("nav-hover")
                    })
                    $(subnavitem).mouseout(function(){
                        $(this).removeClass("nav-hover")
                    })
                    
                    $(navlink).click(function(){
                        window.location.assign(window.location.origin+$(this).attr("data-url"))
                    })
                }

            else{
                $(el).next().addClass("non-visible")
                $(el).next().removeClass("mobile-sub-nav")
                $(el).next().children(".sub-nav-item").removeClass("mobile-sub-nav-item")
                $(el).next().children(".sub-nav-item").addClass("sub-nav-item")
                $(subnavitem).off()
            }
        }

    }
}