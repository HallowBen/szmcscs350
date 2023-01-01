const BlogBody = document.getElementById("BlogBody")

String.prototype.trimToLength = function(x){
    return (this.length > x) 
    ? jQuery.trim(this).substring(0, x).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};

var directid

directid=localStorage.getItem("directid")
localStorage.removeItem("directid")


$.ajax({
    type: 'GET',
    url: '/blog/all',
    success: function(response){

        blog=response.blog
        blog.forEach(el => {
            let substring = el.poszt;
            substring=substring.trimToLength(80);
            esemeny_ido_szoveg="Esemény idje: "
                if(window.innerWidth<=700){
                    esemeny_ido_szoveg+="<br>"
                }
            esemenyideje = "esemeny-ideje"; if( el.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
            blogtipus = "blog-container"; if(el.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
            photo= "blog-photo"; if( el.kep === 0 ) { photo+=" non-visible"};
            aligneid= String(el.id)+String(el.id)

            BlogBody.innerHTML += `
            <div id="${el.id}" class="${blogtipus}">
                <div id="${aligneid}" class="b-row br-first">
                    <div class="blog-title">${el.cim}</div>
                    <div class="${esemenyideje}">${esemeny_ido_szoveg}${el.esemeny_datuma}</div>
                </div>
                <div class="b-row br-second">
                    <div class="b-photo-wrapper"><img src="${el.kep[0]}"class="${photo}"></div>
                    <div class="blog-content">${substring}</div>
                </div>
                <div class="b-row br-third">
                    <div class="blog-writer">Feltöltötte: ${el.nev}</div>
                    <div class="blog-date">${el.date}</div>
                </div>
                <div class="tovabb direct">-- Tovább --</div>
            </div>`;
        });

        main(blog);

    },
    error: function(response){
        console.log('error', error)
    }
})


function main(blog){
    const blogcontainer = [... document.getElementsByClassName("blog-container")]
    const tovabb = [... document.getElementsByClassName("tovabb")]


    if(directid!==0){
        blogcontainer.forEach(el=>{
            if((String(el.id)===String(directid))){

                document.getElementById(String(directid)+String(directid)).scrollIntoView({behavior: "smooth", block: "center"});
                blog.forEach(ele=>{
                    if(String(ele.id)===String(directid)){
                        correcttext=ele.poszt.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
                        aligneid= String(ele.id)+String(ele.id)
                        esemenyideje = "esemeny-ideje"; if( ele.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                        blogtipus = "blog-container"; if(ele.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
                        photo= "blog-photo"; if( ele.kep === 0 ) { photo+=" non-visible"};
                        galeria_url=String(window.location.origin)+String(ele.galeria)
                        console.log(galeria_url)

                        el.innerHTML = `<div id="${aligneid}" class="b-row br-first">
                        <div class="blog-title">${ele.cim}</div>
                        <div class="${esemenyideje}">Esemény idje: ${ele.esemeny_datuma}</div>
                    </div>
                    <div class="b-row br-second open-br">
                        <div class="blog-content open-content">${correcttext}</div>
                        <a href="${galeria_url}" class="b-photo-wrapper open-photo-wrapper"></a>
                    </div>`
                        ele.kep.forEach(elem=>{
                            $(el).find(".open-photo-wrapper").append(`<img src="${elem}"class="${photo}  open-photo">`)
                        })
                    el.innerHTML +=`<div class="b-row br-third">
                        <div class="blog-writer">Feltöltötte: ${ele.nev}</div>
                        <div class="blog-date">${ele.date}</div>
                    </div>
                    <div class="close"> -- Kevesebbet -- </div>`
                    }
                })
            }
        })
        directid=null;
        next(blog)        
    }



    $(tovabb).click(function(){
        blogcontainer.forEach(el=>{
            if((String(el.id)===String($(this).parent().attr("id")))){

                document.getElementById(String($(this).parent().attr("id"))+String($(this).parent().attr("id"))).scrollIntoView({behavior: "smooth", block: "center"});

                blog.forEach(ele=>{
                    if(String(ele.id)===String($(this).parent().attr("id"))){
                        correcttext=ele.poszt.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
                        aligneid= String(ele.id)+String(ele.id)
                        esemenyideje = "esemeny-ideje"; if( ele.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                        blogtipus = "blog-container"; if(ele.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
                        photo= "blog-photo"; if( ele.kep === 0 ) { photo+=" non-visible"};
                        galeria_url=String(window.location.origin)+String(ele.galeria)
                        console.log(galeria_url)
                        
                        el.innerHTML = `<div id="${aligneid}" class="b-row br-first">
                        <div class="blog-title">${ele.cim}</div>
                        <div class="${esemenyideje}">Esemény idje: ${ele.esemeny_datuma}</div>
                    </div>
                    <div class="b-row br-second open-br">
                        <div class="blog-content open-content">${correcttext}</div>
                        <a href="${galeria_url}" class="b-photo-wrapper open-photo-wrapper"></a>
                    </div>`
                        ele.kep.forEach(elem=>{
                            $(el).find(".open-photo-wrapper").append(`<img src="${elem}"class="${photo}  open-photo">`)
                        })
                    el.innerHTML +=`
                    <div class="b-row br-third">
                        <div class="blog-writer">Feltöltötte: ${ele.nev}</div>
                        <div class="blog-date">${ele.date}</div>
                    </div>
                    <div class="close"> -- Kevesebbet -- </div>`
                    }
                })
            }
        })
        next(blog)
    })
}

function next(blog){
    const close = [... document.getElementsByClassName("close")]
    const blogcontainer = [... document.getElementsByClassName("blog-container")]

    $(close).click(function(){
        blog.forEach(el=>{
            if(String(el.id)===String($(this).parent().attr("id"))){
                blogcontainer.forEach(ele=>{
                    if(String(ele.id)===String($(this).parent().attr("id"))){
                        let substring = el.poszt;
                        substring=substring.trimToLength(80);

                        aligneid= String(ele.id)+String(ele.id)
                        esemenyideje = "esemeny-ideje"; if( el.esemeny_datuma === 0 ) { esemenyideje+=" non-visible"};
                        blogtipus = "blog-container"; if(el.blog_tipus===`be`){blogtipus+=` beszamolo`} else{blogtipus += ` meghivo`};
                        photo= "blog-photo"; if( el.kep === 0 ) { photo+=" non-visible"};

                        ele.innerHTML = `
                            <div id="${aligneid}" class="b-row br-first">
                                <div class="blog-title">${el.cim}</div>
                                <div class="${esemenyideje}">Esemény idje: ${el.esemeny_datuma}</div>
                            </div>
                            <div class="b-row br-second">
                                <div class="b-photo-wrapper"><img src="${el.kep[0]}"class="${photo}"></div>
                                <div class="blog-content">${substring}</div>
                            </div>
                            <div class="b-row br-third">
                                <div class="blog-writer">Feltöltötte: ${el.nev}</div>
                                <div class="blog-date">${el.date}</div>
                            </div>
                            <div class="tovabb direct">-- Tovább --</div>`;
                        document.getElementById(String(ele.id)+String(ele.id)).scrollIntoView({behavior: "auto", block: "center"});
                        main(blog);

                    }

                })
                

            }
        })
    })
}