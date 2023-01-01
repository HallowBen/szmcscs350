const Thead=document.getElementById("Thead")
const SegedTable = document.getElementById("SegedTable")


function st(){
    const theadc = [... document.getElementsByClassName("theadc")]
    
    var order = "date"
    var real = "date"
    
    table(order)
    
    $(theadc).click(function(){
        var next= $(this).children().attr("id")
        if (next === real) {
            $(this).children().children().toArray().forEach(el => {
                if ($(el).attr("class").includes("inactive-order")) {
                    $(el).removeClass("inactive-order")
                }
                else{
                    $(el).addClass(" inactive-order")
                }
            });
            if(order===real){
                order=String("-"+real)
            }
            else{
                order=real
            }
            console.log(order)
        }
        else{
            $(theadc).children().children().toArray().forEach(el => {
                if (!$(el).attr("class").includes("inactive-order")) {
                    $(el).addClass(" inactive-order")
                }
            });
            order=real=next
            $(this).children().children().toArray().forEach(el => {
                if ($(el).attr("class").includes("row2")) {
                    $(el).removeClass(" inactive-order")
                }
            });
            console.log(order,";",real)
        }
        table(order)
    })
    
    function table(orderby){
        $.ajax({
            type:'GET',
            url: `seged/${orderby}`,
            success: function(response){
                console.log('success',response)
                data=response.data
    
                SegedTable.innerHTML=""
    
                data.forEach(el => {
                    SegedTable.innerHTML+=`
                    <tr class="sor tbr">
                        <td class="tipus oszlop">
                                <a href="${el.file}"><img src="${el.file_tipus}" class="tipus-icon"></a>
                            </td>
                            <td class="nev oszlop">
                                ${el.cim}
                            </td>
                            <td class="temkor oszlop">
                                ${el.tema}
                            </td>
                            <td class="feltoltes-datuma oszlop">
                                ${el.date}
                            </td>
                    </tr>`
                });
            },
            error: function(response){
                console.log('error', error)
            }
        })
    }
    
}
rotate()
$(window).resize(rotate)
function rotate(){
    if(window.innerWidth<640){
        Thead.innerHTML=""
        Thead.classList.add("non-visible")
        if(window.innerHeight<640){
            SegedTable.innerHTML=`<div class="st-hely-szov">Az ön eszközén ez az oldal nem megjeleníthető!<br><span class="smiley">	&#128532;</span></div>`
        }
        else{
            SegedTable.innerHTML=`<div class="st-hely-szov">Kérem fordítsa el az eszközét!<br><i class="fa-sharp fa-solid fa-rotate-right fa-spin" style="margin-top: 20px; font-size:60px; --fa-animation-duration: 3s; --fa-animation-iteration-count:3; --fa-animation-timing: ease-in-out;"></i></div>`
        }
    }
    else{
        Thead.classList.remove("non-visible")
        Thead.innerHTML=`<td class="tipus oszlop theadc">
        Típus&nbsp;
        <span id="file_tipus" class="order-by">
            <i class="fa-solid fa-sort-up row1 inactive-order"></i>
            <i class="fa-solid fa-sort-down row2 inactive-order"></i>
        </span>
    </td>
    <td class="nev oszlop theadc">
        Fájl neve&nbsp;
        <span id="cim" class="order-by">
            <i class="fa-solid fa-sort-up row1 inactive-order"></i>
            <i class="fa-solid fa-sort-down row2 inactive-order"></i>
        </span>
    </td>
    <td class="temkor oszlop theadc">
        Témakör&nbsp;
        <span id="tema" class="order-by">
            <i class="fa-solid fa-sort-up row1 inactive-order"></i>
            <i class="fa-solid fa-sort-down row2 inactive-order"></i>
        </span>
    </td>
    <td class="feltoltes-datuma oszlop theadc">
        Feltöltés dátuma&nbsp;
        <span id="date" class="order-by">
            <i class="fa-solid fa-sort-up row1 inactive-order"></i>
            <i class="fa-solid fa-sort-down row2"></i>
        </span>
    </td>`
    st()
    }
}