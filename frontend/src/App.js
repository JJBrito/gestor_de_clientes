import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [rota, setRota] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_CLIENTES_API_URL);
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getRota = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_CALCULAR_ROTA_API_URL);
      console.log('Resposta da API de rota:', res.data); // Adicionando este console.log
      setRota(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getRota();
  }, [setUsers, setRota]);

  useEffect(() => {
    if (rota) {
      console.log('rota:', rota);
      console.log('rota.legs:', rota.legs);
      console.log('Array.isArray(rota.legs):', Array.isArray(rota.legs));
      console.log('rota.legs.length:', rota.legs ? rota.legs.length : 'undefined');

      if (Array.isArray(rota.legs) && rota.legs.length > 0) {
        console.log('Dados da rota:', rota);
        console.log('Coordenadas da rota:', rota.legs[0].steps.map(step => [step.start_location.lat, step.start_location.lng]));
      } else {
        console.log('Nenhuma rota encontrada ou dados inválidos.');
      }
    }
  }, [rota]);

  const renderPolyline = () => {
    if (rota && Array.isArray(rota.legs) && rota.legs.length > 0 && users.length > 0) {
      const polylinePositions = [
        [users[0].coordenada_y, users[0].coordenada_x], // Ponto de partida (Empresa Contratada)
        ...rota.legs[0].steps.map(step => [step.start_location.lat, step.start_location.lng]),
        ...users.slice(1).map(user => [user.coordenada_y, user.coordenada_x]), // Coordenadas dos clientes
        [users[0].coordenada_y, users[0].coordenada_x], // Ponto final (Empresa Contratada)
      ];
  
      return (
        <Polyline
          positions={polylinePositions}
          color= "#40A2E3"
          weight={5} // Define a espessura da linha
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Container>
        <Title>PLATAFORMA DE GERENCIAMENTO DE CLIENTES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        
        {/* Mapa */}
        <MapContainer
          center={[0, 0]}
          zoom={3}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marcador Empresa Contrada */}
          <Marker
            position={[-23.651904, -46.549422]}
          >
            <Popup>Empresa Contrada</Popup>
          </Marker>

          {/* Marcadores dos clientes*/}
          {users.map((user, index) => (
            <Marker
              key={index}
              position={[user.coordenada_y, user.coordenada_x]}
            >
              <Popup>{user.nome}</Popup>
            </Marker>
          ))}

          {renderPolyline()}
          
        </MapContainer>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
