import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const Reuniones = () => {
  const [nuevaReunion, setNuevaReunion] = useState({
    titulo: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const respuesta = await axios.get("http://localhost:5000/api/reuniones");
      const eventosFormateados = respuesta.data.map((evento) => ({
        title: evento.titulo,
        start: new Date(evento.fecha_inicio),
        end: new Date(evento.fecha_fin),
      }));
      setEventos(eventosFormateados);
    } catch (error) {
      console.error("Error al obtener reuniones:", error);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaReunion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reuniones", nuevaReunion);
      setNuevaReunion({ titulo: "", fecha_inicio: "", fecha_fin: "" });
      obtenerEventos();
    } catch (error) {
      console.error("Error al guardar reunión:", error);
    }
  };

  return (
    <div className="contenedor">
      <h2>Programar Reunión</h2>

      <form
        onSubmit={manejarSubmit}
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          name="titulo"
          value={nuevaReunion.titulo}
          onChange={manejarCambio}
          placeholder="Título"
          required
        />
        <input
          type="datetime-local"
          name="fecha_inicio"
          value={nuevaReunion.fecha_inicio}
          onChange={manejarCambio}
          required
        />
        <input
          type="datetime-local"
          name="fecha_fin"
          value={nuevaReunion.fecha_fin}
          onChange={manejarCambio}
          required
        />
        <button type="submit">Guardar</button>
      </form>

      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={{
          next: "Sig",
          previous: "Ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />
    </div>
  );
};

export default Reuniones;
