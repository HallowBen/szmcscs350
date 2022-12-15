const SegedTable = document.getElementById("SegedTable")
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
                <tr class="sor">
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
