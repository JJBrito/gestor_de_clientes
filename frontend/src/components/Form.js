import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.telefone;
      user.data_cadastro.value = onEdit.data_cadastro;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_cadastro.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    

    try {
      if (onEdit) {
        // Atualizar um cliente existente
        const response = await axios.put(
          `http://localhost:3000/clientes/${onEdit.id}`,
          {
            nome: user.nome.value,
            email: user.email.value,
            telefone: user.fone.value,
            data_cadastro: user.data_cadastro.value,
          }
        );

        // Exemplo: exibir mensagem de sucesso do backend
        toast.success(response.data);
      } else {
        // Adicionar um novo cliente
        const response = await axios.post("http://localhost:3000/clientes", {
          nome: user.nome.value,
          email: user.email.value,
          telefone: user.fone.value,
          data_cadastro: user.data_cadastro.value,
        });

        // Exemplo: exibir mensagem de sucesso do backend
        toast.success(response.data);
      }

      // Limpar os campos e atualizar a lista de usuários
      user.nome.value = "";
      user.email.value = "";
      user.fone.value = "";
      user.data_cadastro.value = "";

      setOnEdit(null);
      getUsers();
    } catch (error) {
      // Tratamento de erros específicos
      if (error.response) {
        // O servidor respondeu com um status de erro (4xx ou 5xx)
        toast.error(
          `Erro ${error.response.status}: ${error.response.data.message}`
        );
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        toast.error("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        // Ocorreu um erro durante a configuração da requisição
        toast.error(`Erro ao configurar a requisição: ${error.message}`);
      }
    }
  };


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Cadastro</Label>
        <Input name="data_cadastro" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
