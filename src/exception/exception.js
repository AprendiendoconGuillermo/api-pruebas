// excepción al crear una documento
const success = (res, mensaje, payload) => {
    message(res, 201, mensaje, payload, false);    
}
// excepción al no encontrar un documento
const notFound = (res, mensaje, payload) => {    
    message(res, 404, mensaje, payload, true);    
}
// excepción al encontrar un documento
const found  = (res, mensaje, payload) => {
    message(res, 200, mensaje, payload, false);    
}
// excepción al enviar una petición errónea
const badRequest = (res, mensaje, payload) => {
    message(res, 400, mensaje, payload, true);
}
// no tiene permiso
const forbidden = (res, mensaje, payload) => {
    message(res, 403, mensaje, payload, true);
}
// token inválido o sesión expirada
const unauthorized = (res, mensaje, payload) => {
    message(res, 401, mensaje, payload, true);
}
// excepción interna del proyecto 
const internalError = (res,  mensaje, payload) => {
    message(res, 500,  mensaje, payload, true);
}
// mensaje a devolver
function message(res, code, mensaje, payload, flag){
    res.status(code).json({error: flag, mensaje: mensaje, data: payload??null});
}
// exportamos las excepciones para poder importarlas en otros archivos
module.exports = {
    success,
    notFound,
    found,
    badRequest,
    internalError,
    unauthorized,
    forbidden
}