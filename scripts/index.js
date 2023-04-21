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
const labelSubTotal = document.getElementById('subtotal')
const inputAgregar = document.getElementById('agregar')
const idProvSeleccionado = document.querySelector('#idProvSeleccionado')
const rzSeleccionado = document.querySelector('#idProvSeleccionado')
const cuitProvSeleccionado = document.querySelector('#idProvSeleccionado')
const tdtotal = document.querySelector('#tdtotal')
const tbody = document.querySelector('#tbody')
const total = document.querySelector('#total')
const crearPdf = document.getElementById('crearPdf')
const vistaPrevia = document.querySelector('#vistaPrevia')


//Formulario de Inicio de Sesión
formInicioSesion.onsubmit = (e)=>{
    e.preventDefault()
    const infoUsuario = {
        nombre:inputNombre.value,
        apellido:inputApellido.value
    }
localStorage.setItem('infoUsuario',JSON.stringify(infoUsuario))
formInicioSesion.remove()
divInicioSesion.innerHTML = `<h3>Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}</h3>`
}
const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
if(infoUsuario){
    formInicioSesion.remove()
    divInicioSesion.innerHTML = `<h3>Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}</h3>`
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
            
                const proveedorElegido = seleccionarProveedor.value
            
                const proveedor = data.find(p=>p.id===parseInt(proveedorElegido))
                
                document.querySelector('#idProvSeleccionado').innerHTML = proveedor.id
                document.querySelector('#rzProvSeleccionado').innerHTML = proveedor.razonsocial
                document.querySelector('#cuitProvSeleccionado').innerHTML = proveedor.cuit
                
            }     
        })
    })

//Calcular Subtotal
inputPrecio.oninput=()=>{
    labelSubTotal.innerHTML = inputCantidad.value * inputPrecio.value
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

//Boton Agregar del Formulario
let numItem = 0

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
    console.log(datosItem)
    console.log(inputCantidad.value)
    console.log(inputDescripcion.value)
    console.log(inputPrecio.value)
    if(inputCantidad.value === "" || inputDescripcion.value === "" || inputPrecio.value === "" ){
        alert('Completar todos los campos para agregar el producto/servicio en el planilla.')
    } else {
    if(numItem <= 10){
    planilla.push(datosItem)          
    tbody.innerHTML += `<tr>
    <td>${numItem}</td>
    <td>${datosItem.cantidad}</td>
    <td>${datosItem.descripcion}</th>
    <td>${datosItem.precio}</th>
    <td>${datosItem.subtotal}</th>
    </tr>`
    let total = 0
    planilla.forEach(i=>{
    total+= i.subtotal   
})
localStorage.setItem('planilla', JSON.stringify(planilla))
tdtotal.innerHTML = `$  ${total}`
} else {
    alert('No esta permitido agregar más de diez item')
}
}
}

//Generar PDF - Libreria jsPDF
crearPdf.onclick = function(){
    
    const doc = new jsPDF()
    doc.text("Solicitud de Compra", 20, 20);
   
    doc.save('Solicitud-Compra.pdf');
    }

    



