// Nicholas Santamaria y Andrea Reyes

var express = require('express');

var motorRender = require('express-handlebars');
var exphbs = require('express-handlebars');


var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var entradas = {};

entradas.general = [];

entradas.registro = [];

fs.readFile(__dirname + '/registro.txt', (err, data) => {
    if (err) {

    } else {
        entradas = JSON.parse(data);
    }

});


function registroDeVisita(url) {
    if (entradas.general.length != 0) {
        let encontrado = false;
        entradas.general.forEach((v, index) => {
            if (v.url == url) {
                v.entradas++;
                let vis = v.entradas;
                encontrado = true;
                entradas.registro.push({ url: url, entradas: vis, fecha: new Date() });
            }
        });
        if (encontrado == false) {
            entradas.general.push({ url: url, entradas: 1, fecha: new Date() });
            entradas.registro.push({ url: url, entradas: 1, fecha: new Date() });
        }

    } else {
        entradas.general.push({ url: url, entradas: 1, fecha: new Date() });
        entradas.registro.push({ url: url, entradas: 1, fecha: new Date() });
    }

    fs.writeFile('registro.txt', JSON.stringify(entradas), 'utf8', function () { });
}



app.get('/inicio', function(request, response){
    response.render('inicio',{layout:false});
    registroDeVisita("inicio");
    });

app.get('/nosotros', function(request, response){
        response.render('sobrenosotros',{layout:false});
        registroDeVisita("nosotros");

        });

app.get('/contacto', function(request, response){
        response.render('contacto',{layout:false});
        registroDeVisita("contacto");

        });

app.get('/principal', function(request, response){
        response.render('pagina',{layout:false, entradas:entradas});
        registroDeVisita("principal");

        });
 
app.listen(5000, function() {
  });

 