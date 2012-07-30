var servidor = require("socket.io").listen(6969);

servidor.sockets.on("connection", inicio);
//Todo para los sockets es independiente para cada uno, las variables por ejemplo
function inicio(socket)
{
	//Esta línea escuchará el evento ingresoUsuario, cuándo esto ocurra se dispara la función emitir
	socket.on("ingresoUsuario", emitir);
}
function emitir(nombre)
{
	servidor.sockets.emit("notificarNombre", nombre);
}