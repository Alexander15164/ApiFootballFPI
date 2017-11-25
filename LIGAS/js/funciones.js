$(document).ready(function CargarLigas()
{
  $.ajax({
    headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
    url: 'https://api.football-data.org/v1/competitions',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    console.log(response);
    $.each(response,function(indice){
      var option = $('<option value='+response[indice].id+'>'+response[indice].caption+" ("+response[indice].league+')'+'</option>');
      $("#ligas").append(option);



    });
  });

$("#ligas").change(function CargarEquipos(){
  $("#resultado").html("");
  $("#equipos").html("");
  var valor = $("#ligas").val();
   console.log(valor);
  $.ajax({
    headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
    url: 'https://api.football-data.org/v1/competitions/'+valor+"/teams",
    dataType: 'json',
    type: 'GET',
  }).done(function(responses) {
    console.log("entro");
    console.log(responses);
    for (var i = 0; i < responses.teams.length; i++) {
       console.log("entro2");
      var cada =responses.teams[i]._links.players.href;
      var option = $('<option value='+cada+' >'+responses.teams[i].name+'</option>');
      $("#equipos").append(option);
    }

  });

});

$("#equipos").change(function CargarJugadores(){
  $("#resultado").html("");
  var valorJu = $("#equipos").val();

  $.ajax({
    headers: { 'X-Auth-Token': 'b1f07037b5c2461a81558d48cd16fcc1' },
    url: valorJu,
    dataType: 'json',
    type: 'GET',
  }).done(function(responsess) {
    console.log("entro");
     console.log(responsess);
    if (responsess.players.length==0) {
      console.log("no hay");
      var p = $('<br><br><br><h1 class="resultado" >No hay Jugadores registrados en este quipo</h1>');
      $("#resultado").append(p);
    }
    else {
      for (var i = 0; i < responsess.players.length; i++) {
         console.log("entro2");
        var div = $('<div class="jugador"><h3> Nombre:'+responsess.players[i].name+'</h3><br><h4> Posicion:'+responsess.players[i].position+'</h4><br><h4> Numero de jugador:'+responsess.players[i].jerseyNumber+'</h4><br><h4> Fecha de nacimiento:'+responsess.players[i].dateOfBirth+'</h4><br><h4>Nacionalidad: '+responsess.players[i]. nationality+'</h4><br><br></div>');
        $("#resultado").append(div);
      }

    }

  });

});
});
