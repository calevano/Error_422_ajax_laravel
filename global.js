$(document).on("click",'#btnValidar' ,function (e){
    e.preventDefault();
    $.ajax({
        type    : 'POST',
        url     : $("#form").attr("action"),
        data    : $("#form").serialize(),
        dataType: 'json',
        beforeSend: function () {
            $('.fields-errors').empty(); //Laravel añade clase a los inputs donde muestra el error
        },
        success: function (response) {
            location.reload(); //
        },
        error: function(err){
            pintaError(err);
        }
    });
});

/*DEVOLVER ERRORES EN JSON*/
function pintaError(err){
    console.log('entraste a error');
    if( err.status === 422 ) {
        console.log('entraste a error 422----');
        var errors = err.responseJSON;
        $.each( errors , function( key, value ) {
            var errorInput = '#' + key; 
            var campo = $(errorInput).parent();
            campo.first().append("<strong class='text-danger fields-errors'>"+value+"</strong>");
        });
    }
}
