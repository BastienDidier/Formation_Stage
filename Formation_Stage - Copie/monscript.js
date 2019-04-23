$(document).ready(function () {
    alert("ok");
    let subBut=document.getElementById('subBut');
    $('#subBut').click(function(){
        $('#alertS').css("display","block");
        $('#alertD').css("display","none");
    });
    $('#canBut').click(function () {
        $('#alertD').css("display","block");
        $('#alertS').css("display","none");
        $('#surname').val('');
        $('#firstname').val('');
        $('#age').val('0');
        $('#commentaire').val('');
        $('#adresse').val('');
    })
});