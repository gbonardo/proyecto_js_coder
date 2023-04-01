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
const proveedores = [
    new Proveedor(1,'Dell',20123456711),
    new Proveedor(2,'HP',20123456721),
    new Proveedor(3,'Cisco',20123456731),
    new Proveedor(4,'Ricoh',20123456741),
    new Proveedor(5,'Lexmark',20123456751),
    new Proveedor (6,'Sony',20123456761),
    new Proveedor(7,'Samsung',20123456771)
]

//Elemento Select - Renderización de proveedores
proveedores.forEach((prov) => {
    seleccionarProveedor.innerHTML += `<option value=${prov.id}>${prov.razonsocial}</option> `;
    })

//Calcular Subtotal
inputPrecio.oninput=()=>{
    labelSubTotal.innerHTML = inputCantidad.value * inputPrecio.value
    
}

//Cambio de Proveedor Seleccionado
proveedorSeleccionado =()=>{
    const provSeleccionado = document.getElementById('seleccionarProveedor')
    
    const proveedorElegido = provSeleccionado.value

    const proveedor = proveedores.find(p=>p.id===parseInt(proveedorElegido))
    
        document.querySelector('#idProvSeleccionado').innerHTML = proveedor.id
    document.querySelector('#rzProvSeleccionado').innerHTML = proveedor.razonsocial
    document.querySelector('#cuitProvSeleccionado').innerHTML = proveedor.cuit
    
}

const planilla = []
//Boton Agregar del Formulario

formulario.onsubmit = (evento)=>{
        evento.preventDefault()
        const subTotal = inputCantidad.value * inputPrecio.value
        const datosItem = {
            cantidad:inputCantidad.value,
            descripcion:inputDescripcion.value,
            precio: inputPrecio.value,
            subtotal: subTotal,
        }
        planilla.push(datosItem)          
        tbody.innerHTML += `<tr>
        <td></td>
        <td>${datosItem.cantidad}</td>
        <td>${datosItem.descripcion}</th>
        <td>${datosItem.precio}</th>
        <td>${datosItem.subtotal}</th>
        </tr>`
        let total = 0
        planilla.forEach(i=>{
        total+= subTotal   
})
tdtotal.innerHTML = `$  ${total}`
}
