import { useState } from "react";

export default function App() {
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [pago, setPago] = useState("Nequi");
  const [ubicacion, setUbicacion] = useState("");

  const whatsappNumero = "573005453574"; // tu número

  const menu = [
    { id: 1, nombre: "Hamburguesa sencilla", precio: 12000 },
    { id: 2, nombre: "Hamburguesa especial", precio: 16000 },
    { id: 3, nombre: "Salchipapa", precio: 10000 },
    { id: 4, nombre: "Pollo asado", precio: 18000 },
    { id: 5, nombre: "Carne a la plancha", precio: 20000 },
    { id: 6, nombre: "Limonada", precio: 5000 },
    { id: 7, nombre: "Gaseosa", precio: 4000 }
  ];

  const agregar = (item) => {
    setPedido([...pedido, item]);
  };

  const total = pedido.reduce((s, i) => s + i.precio, 0);

  const obtenerUbicacion = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
      setUbicacion(link);
    });
  };

  const enviarPedido = () => {
    const lista = pedido.map(p => `- ${p.nombre}`).join("\n");
    const mensaje = `Hola, soy ${nombre}%0A%0AQuiero pedir:%0A${lista}%0A%0ATotal: $${total}%0APago: ${pago}%0AUbicación: ${ubicacion}`;
    window.open(`https://wa.me/${whatsappNumero}?text=${mensaje}`, "_blank");
  };

  return (
    <div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{background:"#fff",padding:20,borderRadius:12,width:350}}>
        <h1 style={{color:"#ff7a00",textAlign:"center"}}>🍔 EL SITIO</h1>

        <input placeholder="Tu nombre" value={nombre}
          onChange={e=>setNombre(e.target.value)} style={{width:"100%",marginBottom:8}} />

        <select value={pago} onChange={e=>setPago(e.target.value)}
          style={{width:"100%",marginBottom:8}}>
          <option>Nequi</option>
          <option>Efectivo</option>
        </select>

        <button onClick={obtenerUbicacion}
          style={{width:"100%",background:"#ff7a00",border:"none",padding:8}}>
          Compartir ubicación
        </button>

        <h3>Menú</h3>
        {menu.map(item=>(
          <div key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
            <span>{item.nombre} ${item.precio}</span>
            <button onClick={()=>agregar(item)}>+</button>
          </div>
        ))}

        <h3>Pedido</h3>
        {pedido.map((p,i)=>(<div key={i}>{p.nombre}</div>))}
        <b>Total: ${total}</b>

        <button onClick={enviarPedido}
          style={{width:"100%",marginTop:10,background:"#ff7a00",border:"none",padding:10}}>
          Enviar a WhatsApp
        </button>
      </div>
    </div>
  );
}
