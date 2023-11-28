import { useState } from "react";
import "./../css/cota.css";
import { useLocation } from "react-router-dom";
import { successMessage, commonMessage } from "../../../utils/MessageHelpers";
import { generateCotaLetras } from '../../../pdf/cota/cotaComLetras';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Cota() {
  const [assinantes, setAssinantes] = useState("");
  const [cotaValues, setCotaValues] = useState({
    flcota: "",
    secretaria: "",
    cargo: "",
    volaberto: "",
    flpedido: "",
  });
  const { state } = useLocation();

  const handleCotaValues = (e) => {
    setCotaValues((prevCotaValues) => ({
      ...prevCotaValues,
      [e.target.name]: e.target.value,
    }));
  };

  const validateCota = () => {
    if (!cotaValues.flcota) return false;
    if (!cotaValues.secretaria) return false;
    if (!cotaValues.cargo) return false;
    if (!cotaValues.volaberto) return false;
    if (!cotaValues.flpedido) return false;
    if (!assinantes) return false;
    return true;
  };

  return (
    <div className="div-cota">
      <h1>Cota</h1>
      <label htmlFor="flcota">Nº folha</label>
      <input name="flcota" id="flcota" onChange={handleCotaValues} />
      {!cotaValues.flcota
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <label htmlFor="secretaria">Secretaria</label>
      <input name="secretaria" id="secretaria" onChange={handleCotaValues} />
      {!cotaValues.secretaria
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <label htmlFor="cargo">Cargo</label>
      <input name="cargo" id="cargo" onChange={handleCotaValues} />
      {!cotaValues.cargo
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <label htmlFor="volaberto">{`Volume(s) aberto`}</label>
      <input name="volaberto" id="volaberto" onChange={handleCotaValues} />
      {!cotaValues.volaberto
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <label htmlFor="flpedido">Nº folha pedido para abertura</label>
      <input name="flpedido" id="flpedido" onChange={handleCotaValues} />
      {!cotaValues.flpedido
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <label>Assinantes</label>
      <select
        value={assinantes}
        onChange={(e) => setAssinantes(e.target.value)}
      >
        <option defaultValue={assinantes}></option>
        <option>Valdirene Germano</option>
        <option>Gilmara Pereira dos Santos</option>
        <option>Jeni Moreira de Andrade Nery</option>
      </select>
      {assinantes === ""
        ? commonMessage("Preencha este campo")
        : successMessage("OK!")}
      <div>
        <button
          disabled={!validateCota()}
          onClick={() =>
            generateCotaLetras(
              cotaValues.flcota,
              state.nprocesso,
              state.anoprocesso,
              state.date,
              state.nome,
              cotaValues.secretaria,
              cotaValues.cargo,
              assinantes,
              cotaValues.volaberto,
              cotaValues.flpedido
            )
          }
        >
          Gerar pdf
        </button>
      </div>
    </div>
  );
}
