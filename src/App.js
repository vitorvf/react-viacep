import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const inputBusca = useRef();
  const [error, SetError] = useState(false);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    async function fetchCep() {
      setLoading(true);
      const response = await fetch(
        `https://viacep.com.br/ws/${inputBusca.current.value}/json/`
      );
      if (response.status === 404 || response.statusText === "Not Found") {
        SetError(true);
      } else {
        SetError(false);
      }
      const json = await response.json();
      setData(json);
      setLoading(false);
    }

    fetchCep();
  };

  return (
    <div className="container flex-center">
      <h2>Buscar o Cep</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Digite um CEP"
          required
          ref={inputBusca}
          minLength="8"
        />
      </form>

      {/* Exibe se estiver carregando */}
      {loading && !error && <p>Loading....</p>}
      {/* Exibe se não estiver carregando, se não retornar erro, se tiver algum dado */}
      {!loading && !data.erro && data && (
        <>
          <div
            className=""
            id="card_informacoes"
            // style={{ marginRight: "30px" }}
          >
            <h1>Informaçoes:</h1>
            <p className="mt-4">
              <strong>Bairro:</strong>
              <strong> {data.bairro} </strong>
            </p>
            <p className="mt-2">
              <strong>Cep:</strong>
              <strong>
                <span> {data.cep}</span>
              </strong>
            </p>
            <p className="mt-2">
              <strong>Complemento:</strong>
              <strong>
                <span> {data.logradouro}</span>
              </strong>
            </p>
            <p className="mt-2">
              <strong> Localidade:</strong>
              <strong>
                <span> {data.localidade}</span>
              </strong>
            </p>
          </div>

          {/* <div>
          40252-440
          */}
        </>
      )}
      {/* Exibe se retornar o erro */}
      {error && <p>Digite um cep valido!</p>}
    </div>
  );
};

export default App;
