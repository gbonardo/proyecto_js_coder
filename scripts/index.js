//Sistema para realizar solicitudes de compra.

class Proveedor {
    constructor(id, razonsocial, cuit){
        this.id = id
        this.razonsocial = razonsocial
        this.cuit = cuit
    }
}

const proveedores = [
    new Proveedor(1,'dell',20123456711),
    new Proveedor(2,'hp',20123456721),
    new Proveedor(3,'cisco',20123456731),
    new Proveedor(4,'ricoh',20123456741),
    new Proveedor(5,'lexmark',20123456751),
    new Proveedor (6,'sony',20123456761),
    new Proveedor(7,'samsung',20123456771)
]

let seleccionarProveedor = parseInt(prompt('Solicitud de compra de un producto/servicio. \n\nSeleccione un proveedor, según el número que tiene asignado: 1.Dell - 2.HP - 3.Cisco - 4.Ricoh - 5.Lexmark - 6.Sony - 7.Samsung'))

let proveedorSeleccionado = false

let infoProveedor
let proveedor

while(proveedorSeleccionado === false){
    proveedor = proveedores.find((proveedor => proveedor.id===seleccionarProveedor))
   if(!proveedor){
        seleccionarProveedor = parseInt(prompt('Por favor ingrese un numero de acuerdo al proveedor: 1.Dell - 2.HP - 3.Cisco - 4.Ricoh - 5.Lexmark - 6.Sony - 7.Samsung'))
       } else {
        proveedorSeleccionado = true
    }
}


/*while (proveedorSeleccionado === false){
    if(seleccionarProveedor != 0 && seleccionarProveedor <= 7){
        proveedorSeleccionado = true
    } else{
        seleccionarProveedor = parseInt(prompt('Por favor ingrese un numero de acuerdo al proveedor: 1.Dell - 2.HP - 3.Cisco - 4.Ricoh - 5.Lexmark - 6.Sony - 7.Samsung'))
    }
}*/

/*
while (proveedorSeleccionado === false){
    if (seleccionarProveedor === 1){
        proveedorSeleccionado = true
        infoProveedor = dell
    } else if (seleccionarProveedor === 2){
        proveedorSeleccionado = true
        infoProveedor = hp
    } else if (seleccionarProveedor === 3){
        proveedorSeleccionado = true
        infoProveedor = cisco
    } else if (seleccionarProveedor === 4){
        proveedorSeleccionado = true
        infoProveedor = ricoh
    } else if (seleccionarProveedor === 5){
        proveedorSeleccionado = true
        infoProveedor = lexmark
    } else if (seleccionarProveedor === 6){
        proveedorSeleccionado = true
        infoProveedor = sony
    } else if (seleccionarProveedor === 7){
        proveedorSeleccionado = true
        infoProveedor = samsung
    } else {
    seleccionarProveedor = parseInt(prompt('Por favor ingrese un número de acuerdo al proveedor: 1.Dell - 2.HP - 3.Cisco - 4.Ricoh - 5.Lexmark - 6.Sony - 7.Samsung'))
  }
}

alert('El proveedor seleccionado es: ' + infoProveedor.razonsocial)
console.log('infoProveedor', infoProveedor)
*/
class Item{
    constructor(cantidad, descripcion, precio, subtotal){
        this.cantidad = cantidad
        this.descripcion = descripcion
        this.precio = precio
        this.subtotal = subtotal
    }
}

let item1 = new Item()
let item2 = new Item()
let item3 = new Item()
let item4 = new Item()
let item5 = new Item()

function multiplicar(cantidad, precio){
    let resultado = cantidad * precio
    return resultado
}

for(i=1; i<=5; i++){

    let cantidadingresada = parseInt(prompt('Item \n Ingresar cantidad: '))
         while(!Number.isInteger(cantidadingresada) || cantidadingresada === 0){
           if(Number.isInteger(cantidadingresada) && cantidadingresada > 0){
    
              } else{
                 alert('Ingresar un valor numerico entero, diferente a 0, ni dejar en blanco.')
                  cantidadingresada = parseInt(prompt('Item \n Ingresar cantidad: '))
            }
    }

    let descripcioningresada = prompt('Item \n Ingresar descripción: ')
        while(descripcioningresada === ''){
            if(descripcioningresada != '' ){

                } else{
                 alert('Ingrese una descripción, no dejar este campo en blanco.')
                 descripcioningresada = prompt('Item \n Ingresar descripción: ')
            }
        }

    let precioingresado = Number(prompt('Item \n Ingresar precio: '))
    while(!Number(precioingresado) || precioingresado === 0){
        if(Number(precioingresado) && precioingresado != 0){
            
     }else{
        alert('Ingresar un valor numérico entero o decimal (con "."), diferente a 0, ni dejar este campo en blanco.')
        precioingresado = Number(prompt('Item \n Ingresar precio: '))
        }
    }

    let subtotalcalculado = multiplicar(cantidadingresada, precioingresado)

    if(i === 1){
     item1.cantidad = cantidadingresada
     item1.descripcion = descripcioningresada
     item1.precio = precioingresado
     item1.subtotal = subtotalcalculado
    } else if ( i === 2){
        item2.cantidad = cantidadingresada
        item2.descripcion = descripcioningresada
        item2.precio = precioingresado
        item2.subtotal = subtotalcalculado
    }
    else if ( i === 3){
        item3.cantidad = cantidadingresada
        item3.descripcion = descripcioningresada
        item3.precio = precioingresado
        item3.subtotal = subtotalcalculado
    }
    else if ( i === 4){
        item4.cantidad = cantidadingresada
        item4.descripcion = descripcioningresada
        item4.precio = precioingresado
        item4.subtotal = subtotalcalculado
    }
    else {
        item5.cantidad = cantidadingresada
        item5.descripcion = descripcioningresada
        item5.precio = precioingresado
        item5.subtotal = subtotalcalculado
    }
    
    if (i < 5){
        let consulta = prompt('¿Desea agregar otro producto/servicio? \n Ingresa en minúscula "s" (SI) o "n" (NO).')
        if(consulta === 's'){
            
          } else if (consulta === 'n'){
            break
          } else {
            consulta = prompt('Ingresar según lo indicado a continuación: ¿Desea agregar otro producto/servicio? \n Ingresa en minúscula "s" (SI) o "n" (NO).')
          }
        } else{
        }

    }

//console.log(item1, item2, item3, item4, item5)

//Listado - Items de los productos/servicios ingresados.
if(item5.cantidad > 0){
let total = item1.subtotal + item2.subtotal + item3.subtotal + item4.subtotal + item5.subtotal

alert('Listado\nCantidad  | Descripción       | Precio    |  Subtotal' +
      '\n'  + item1.cantidad + '             ' + item1.descripcion  + '      ' + item1.precio + '       ' +  item1.subtotal + 
      '\n'  + item2.cantidad + '             ' +  item2.descripcion + '      ' + item2.precio + '       ' + item2.subtotal + 
      '\n'  + item3.cantidad + '             ' + item3.descripcion  + '      ' + item3.precio + '       ' + item3.subtotal + 
      '\n'  + item4.cantidad + '             ' +item4.descripcion   + '      ' + item4.precio + '       ' + item4.subtotal + 
      '\n'  + item5.cantidad + '             ' + item5.descripcion  + '      ' + item5.precio + '       ' + item5.subtotal + 
      '\n                                              Total: ' + total)

} else if (item4.cantidad > 0){
    let total = item1.subtotal + item2.subtotal + item3.subtotal + item4.subtotal

alert('Listado\nCantidad  | Descripción       | Precio    |  Subtotal' +
      '\n'  + item1.cantidad + '             ' + item1.descripcion  + '      ' + item1.precio + '       ' +  item1.subtotal + 
      '\n'  + item2.cantidad + '             ' +  item2.descripcion + '      ' + item2.precio + '       ' + item2.subtotal + 
      '\n'  + item3.cantidad + '             ' + item3.descripcion  + '      ' + item3.precio + '       ' + item3.subtotal + 
      '\n'  + item4.cantidad + '             ' +item4.descripcion   + '      ' + item4.precio + '       ' + item4.subtotal + 
      '\n                                              Total: ' + total)

} else if(item3.cantidad > 0){
    let total = item1.subtotal + item2.subtotal + item3.subtotal

alert('Listado\nCantidad  | Descripción       | Precio    |  Subtotal' +
      '\n'  + item1.cantidad + '             ' + item1.descripcion  + '      ' + item1.precio + '       ' +  item1.subtotal + 
      '\n'  + item2.cantidad + '             ' +  item2.descripcion + '      ' + item2.precio + '       ' + item2.subtotal + 
      '\n'  + item3.cantidad + '             ' + item3.descripcion  + '      ' + item3.precio + '       ' + item3.subtotal + 
      '\n                                              Total: ' + total)

} else if(item2.cantidad > 0){
    let total = item1.subtotal + item2.subtotal 

alert('Listado\nCantidad  | Descripción       | Precio    |  Subtotal' +
      '\n'  + item1.cantidad + '             ' + item1.descripcion  + '      ' + item1.precio + '       ' +  item1.subtotal + 
      '\n'  + item2.cantidad + '             ' +  item2.descripcion + '      ' + item2.precio + '       ' + item2.subtotal + 
      '\n                                              Total: ' + total)
} else if(item1.cantidad > 0){
   let total = item1.subtotal 

alert('Listado\nCantidad  | Descripción       | Precio    |  Subtotal' +
      '\n'  + item1.cantidad + '             ' + item1.descripcion  + '      ' + item1.precio + '       ' +  item1.subtotal + 
      '\n                                             Total: ' + total)
}



