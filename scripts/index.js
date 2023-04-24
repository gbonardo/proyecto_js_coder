//Sistema para realizar solicitudes de compra.

const titulo = document.getElementById('titulo')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const divInicioSesion = document.getElementById('diviniciosesion')
const formInicioSesion = document.getElementById('forminiciosesion')
const formulario = document.getElementById('formulario')
const seleccionarProveedor = document.getElementById('seleccionarProveedor')
const inputCantidad = document.getElementById('cantidad')
const inputDescripcion = document.getElementById('descripcion')
const inputPrecio = document.getElementById('precio')
let labelSubTotal = document.getElementById('subtotal')
const inputAgregar = document.getElementById('agregar')
const idProvSeleccionado = document.querySelector('#idProvSeleccionado')
const rzSeleccionado = document.querySelector('#idProvSeleccionado')
const cuitProvSeleccionado = document.querySelector('#idProvSeleccionado')
const tdtotal = document.querySelector('#tdtotal')
let tbody = document.querySelector('#tbody')
const total = document.querySelector('#total')
let crearPdf = document.getElementById('crearPdf')
let cancelar = document.getElementById('cancelar')
let vistaPrevia = document.querySelector('#vistaPrevia')
let opcion = document.querySelector('#opcion')

crearPdf.disabled = true;

//Formulario de Inicio 
formInicioSesion.onsubmit = (e)=>{
    e.preventDefault()
    const infoUsuario = {
        nombre:inputNombre.value,
        apellido:inputApellido.value
    }
localStorage.setItem('infoUsuario',JSON.stringify(infoUsuario))
formInicioSesion.remove()
divInicioSesion.innerHTML = `<h3 class="bienvenida">¡Bienvenido! ${infoUsuario.nombre} ${infoUsuario.apellido}</h3>`
}
const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
if(infoUsuario){
    formInicioSesion.remove()
    divInicioSesion.innerHTML = `<h3 class="bienvenida">¡Bienvenido! ${infoUsuario.nombre} ${infoUsuario.apellido}</h3>`
}

//Clase Proveedor
class Proveedor {
    constructor(id, razonsocial, cuit){
        this.id = id
        this.razonsocial = razonsocial
        this.cuit = cuit
    }
}

//Constructor Proveedores
/*
const proveedores = [
    new Proveedor(1,'Dell',20123456711),
    new Proveedor(2,'HP',20123456721),
    new Proveedor(3,'Cisco',20123456731),
    new Proveedor(4,'Ricoh',20123456741),
    new Proveedor(5,'Lexmark',20123456751),
    new Proveedor (6,'Sony',20123456761),
    new Proveedor(7,'Samsung',20123456771)
]*/
//Elemento Select - Renderización de proveedores
/*
proveedores.forEach((prov) => {
    seleccionarProveedor.innerHTML += `<option value=${prov.id}>${prov.razonsocial}</option> `;
    })*/

//Ruta Relativa - Uso de Fetch
fetch('./data/data.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((proveedor) => {
            //const li = document.createElement('option')
            seleccionarProveedor.innerHTML += `
                <option value=${proveedor.id}>${proveedor.razonsocial}</option>
                
            `
            proveedorSeleccionado =()=>{
                let provElegido = ""
                const proveedorElegido = seleccionarProveedor.value
                const proveedor = data.find(p=>p.id===parseInt(proveedorElegido))
                
                document.querySelector('#idProvSeleccionado').innerHTML = proveedor.id
                document.querySelector('#rzProvSeleccionado').innerHTML = proveedor.razonsocial
                document.querySelector('#cuitProvSeleccionado').innerHTML = proveedor.cuit

                if(opcion === ""){
                    crearPdf.disabled = true
                } else{
                    crearPdf.disabled = false
                }
                
                return provElegido = `ID: ${proveedor.id} | Razón Social: ${proveedor.razonsocial} | Cuit: ${proveedor.cuit}`
            }     
        })
    })

//Calcular Subtotal
inputPrecio.oninput=()=>{
    labelSubTotal.innerHTML = `$ ${inputCantidad.value * inputPrecio.value}`
}

//Cambio de Proveedor Seleccionado
/*
proveedorSeleccionado =()=>{
    const provSeleccionado = document.getElementById('seleccionarProveedor')
    
    const proveedorElegido = provSeleccionado.value

    const proveedor = proveedores.find(p=>p.id===parseInt(proveedorElegido))
    
        document.querySelector('#idProvSeleccionado').innerHTML = proveedor.id
    document.querySelector('#rzProvSeleccionado').innerHTML = proveedor.razonsocial
    document.querySelector('#cuitProvSeleccionado').innerHTML = proveedor.cuit
}*/

const planilla = []

let numItem = 0
//Boton Agregar del Formulario
formulario.onsubmit = (evento)=>{
    evento.preventDefault()
numItem++
    const subTotal = inputCantidad.value * inputPrecio.value
    const datosItem = {
        cantidad:inputCantidad.value,
        descripcion:inputDescripcion.value,
        precio: inputPrecio.value,
        subtotal: subTotal,
    }
    if(inputCantidad.value === "" || inputDescripcion.value === "" || inputPrecio.value === "" ){
        alert('Completar todos los campos para agregar el producto/servicio en el planilla.')
        numItem--
    } else {
    if(numItem <= 10){
    planilla.push(datosItem)          
    tbody.innerHTML += `<tr>
    <td>${numItem}</td>
    <td>${datosItem.cantidad}</td>
    <td>${datosItem.descripcion}</th>
    <td>$${datosItem.precio}</th>
    <td>$${datosItem.subtotal}</th>
    </tr>`
    let total = 0
    planilla.forEach(i=>{
    total+= i.subtotal   
})
localStorage.setItem('planilla', JSON.stringify(planilla))
tdtotal.innerHTML = `$  ${total}`
} else {
    alert('No esta permitido agregar más de diez items')
}
}
}

function recorrerTabla(){
    let str = ''
    const tablaPlanilla = document.querySelector('#tablaPlanilla')
    for (let i = 0; i <= tablaPlanilla.rows.length-1; i++) {
        str += '\n'
        for (let j = 0; j <= tablaPlanilla.rows[i].cells.length-1; j++) {
            if(j == 0) {
                str += `*`
            } else {
                let col = tablaPlanilla.rows[i].cells[j].innerText
                str += ` | ${col}            `
            }    
        }
    }
    return str   
}

function quienSolicita(){
    const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
    let solicitante = `${infoUsuario.nombre} ${infoUsuario.apellido}`
    
    return solicitante
}

let fechaActual = new Date()

//Generar PDF - Libreria jsPDF
crearPdf.onclick = function(){
    
    const prov = proveedorSeleccionado()
    const fechaSolicitud = fechaActual.toLocaleDateString()
    const str = recorrerTabla()
    const solicitante = quienSolicita()
    console.log(tbody.value)
    if(numItem === 0){
        alert('Debe agregar minimo un item')
    }else{
    const doc = new jsPDF()
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Solicitud de Compra", 60, 20);
    doc.setFontSize(12);
    doc.text("Solicitante:", 20, 30);
    doc.text(50, 30, solicitante);
    doc.text("Fecha:", 140, 30);
    doc.text(160, 30, fechaSolicitud);
    doc.text("Proveedor:", 20, 40);
    doc.text(50, 40, prov)
    doc.text(20, 50, str);
    doc.save('Solicitud-Compra.pdf');
} 
}
//Boton Cancelar
cancelar.onclick = function(){
inputCantidad.value = ''
inputDescripcion.value = ''
inputPrecio.value = ''
tdtotal.innerHTML = `$  `
tbody.innerHTML = ``
numItem = 0
labelSubTotal.innerHTML = `$ `
}
    



