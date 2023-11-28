import { useState, useEffect } from "react";
import "./../../assets/css/abertura.css";
import { useNavigate } from "react-router-dom";
import validateRoman from "../../../utils/roman";
import { errorMessage } from "../../../utils/MessageHelpers";
import { generatePDFSemLetras } from "../../../pdf/abertura/generateSemLetras";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AberturaSemLetras() {
  const [formattedDate, setformattedDate] = useState("");
  const [bothValues, setBothValues] = useState({
    nfolha: "",
    nprocesso: "",
    date: formattedDate,
    anoprocesso: "",
    nome: "",
  });
  const [valuesEncerramento, setValuesEncerramento] = useState({
    flencerramento: "",
    volencerrado: "",
    primeirafl: "",
    ultimafl: "",
    proxvolume: "",
  });
  const [valuesAbertura, setValuesAbertura] = useState({
    volaberto: valuesEncerramento.proxvolume,
    flabertura: "",
    primeirafolha: Number(bothValues.nfolha) + 1,
  });

  const [hideDivAbertura, setHideDivAbertura] = useState(true);
  const [hideDivEncerramento, setHideDivEncerramento] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [color, setColor] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate();

  const formatDate = (input) => {
    let newValue = input.replace(/\D/g, "");
    let formattedValue = "";
    for (let i = 0; i < newValue.length; i++) {
      if (i === 2 || i === 4) {
        formattedValue += "/";
      }
      formattedValue += newValue[i];
    }
    setformattedDate(formattedValue);
  };

  useEffect(() => {
    setBothValues((prevValues) => ({
      ...prevValues,
      date: formattedDate,
    }));
  }, [formattedDate]);

  const handleFormattedDate = (e) => {
    const inputValue = e.target.value;
    formatDate(inputValue);
    handleValues(e);
  };
  const handleValues = (e) => {
    setBothValues((prevBothValues) => ({
      ...prevBothValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAbertura = (e) => {
    setValuesAbertura((prevValuesAbertura) => ({
      ...prevValuesAbertura,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEncerramento = (e) => {
    setValuesEncerramento((prevValuesEncerramento) => ({
      ...prevValuesEncerramento,
      [e.target.name]: e.target.value,
    }));
  };
  const createEncerramentoSchema = z.object({
    nfolha: z.string().min(1, "Preencha este campo"),
    nprocesso: z.string().min(1, "Preencha este campo"),
    anoprocesso: z.string().min(1, "Preencha este campo"),
    dataAbertura: z
      .string()
      .min(1, "Preencha este campo")
      .refine((data) => data.length === 10, { message: "Formato incorreto" }),
    nome: z.string().min(1, "Preencha este campo"),
    primeirafl: z.string().min(1, "Preencha este campo"),
    ultimafl: z.string().min(1, "Preencha este campo"),
    volencerrado: z.string().min(1, "Preencha este campo"),
    proxvolume: z.string().min(1, "Preencha este campo"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEncerramentoSchema),
  });

  const handleTermoEncerramento = () => {
    if (
      bothValues.nfolha &&
      bothValues.nprocesso &&
      bothValues.anoprocesso &&
      formattedDate &&
      bothValues.nome &&
      valuesEncerramento.primeirafl &&
      valuesEncerramento.ultimafl &&
      valuesEncerramento.volencerrado &&
      valuesEncerramento.proxvolume
    ) {
      setHideDivAbertura(false);
      setHideDivEncerramento(true);
      setDisableInput(true);
      setColor("grey");
    }
    setData({
      nfolha: bothValues.nfolha,
      nprocesso: bothValues.nprocesso,
      anoprocesso: bothValues.anoprocesso,
      formattedDate: formattedDate,
      nome: bothValues.nome,
      primeirafl: valuesEncerramento.primeirafl,
      ultimafl: valuesEncerramento.ultimafl,
      volencerrado: valuesEncerramento.volencerrado,
      proxvolume: valuesEncerramento.proxvolume,
    });
  };
  const validateDate = () => {
    if (errors.dataAbertura) {
      return <p className="FieldError">{errors.dataAbertura.message}</p>;
    } else {
      return null;
    }
  };
  const validateRomanInputVolEncerrado = () => {
    const volencerradoValidate = validateRoman(valuesEncerramento.volencerrado);
    if (errors.volencerrado) {
      return <p className="FieldError">{errors.volencerrado.message}</p>;
    } else if (!volencerradoValidate) {
      return errorMessage("O campo só aceita algarismo romano");
    }
  };
  const validateRomanInputProxVol = () => {
    const proxvolValidate = validateRoman(valuesEncerramento.proxvolume);
    if (errors.proxvolume) {
      return <p className="FieldError">{errors.proxvolume.message}</p>;
    } else if (!proxvolValidate) {
      return errorMessage("O campo só aceita algarismo romano");
    }
  };

  const handleVoltar = () => {
    setHideDivAbertura(true);
    setHideDivEncerramento(false);
  };

  const navigateToCota = () => {
    navigate(
      {
        pathname: "/cota/semletras",
      },
      {
        state: bothValues,
      }
    );
  };
  const encerramento = (
    <div hidden={hideDivEncerramento} className="div-encerramento">
      <h2>Termo de Encerramento</h2>
      <form onSubmit={handleSubmit(handleTermoEncerramento)}>
        <label htmlFor="nfolha">Nº da folha:</label>
        <input 
        type="text"
        id="nfolha" 
        {...register("nfolha")} 
        onChange={handleValues} 
        />
        {errors.nfolha && <p className="FieldError">{errors.nfolha.message}</p>}
        <div className="input-container">
          <label htmlFor="nprocesso">Nº processo:</label>
          <input
            id="nprocesso"
            {...register("nprocesso")}
            onChange={handleValues}
          />
          {errors.nprocesso && (
            <p className="FieldError">{errors.nprocesso.message}</p>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="anoprocesso">Ano processo:</label>
          <input
            id="anoprocesso"
            {...register("anoprocesso")}
            onChange={handleValues}
          />
          {errors.anoprocesso && (
            <p className="FieldError">{errors.anoprocesso.message}</p>
          )}
        </div>
        <div className="input-container-date">
          <label htmlFor="teste">Data de abertura:</label>
          <input
            id="data"
            className="input-date"
            type="text"
            value={formattedDate}
            {...register("dataAbertura")}
            onChange={handleFormattedDate}
          />
          {validateDate()}
        </div>
        <div className="input-container-nome">
          <label htmlFor="nome">Nome:</label>
          <input 
          id="nome" 
          {...register("nome")} 
          onChange={handleValues} />
          {errors.nome && <p className="FieldError">{errors.nome.message}</p>}
        </div>
        <div className="input-container-folha">
          <label htmlFor="primeirafl">Nº primeira folha:</label>
          <input
            id="primeirafl"
            {...register("primeirafl")}
            onChange={handleEncerramento}
          />
          {errors.primeirafl && (
            <p className="FieldError">{errors.primeirafl.message}</p>
          )}
        </div>
        <div className="input-container-folha">
          <label htmlFor="ultimafl">Nº última folha:</label>
          <input
            id="ultimafl"
            {...register("ultimafl")}
            onChange={handleEncerramento}
          />
          {errors.ultimafl && (
            <p className="FieldError">{errors.ultimafl.message}</p>
          )}
        </div>
        <div className="input-container-vol">
          <label htmlFor="volencerrado">Volume encerrado:</label>
          <input
            className="input-volencerrado"
            id="volencerrado"
            {...register("volencerrado")}
            onChange={handleEncerramento}
          />
          {validateRomanInputVolEncerrado()}
        </div>
        <div className="input-container-vol">
          <label htmlFor="proxvolume">Volume que vai ser aberto:</label>
          <input
            id="proxvolume"
            {...register("proxvolume")}
            onChange={handleEncerramento}
          />
          {validateRomanInputProxVol()}
        </div>
        <div>
          <button >
            Gerar termo de abertura
          </button>
        </div>
      </form>
    </div>
  );
  const abertura = (
    <div hidden={hideDivAbertura} className="div-abertura">
      <h2>Termo de abertura</h2>
      <label htmlFor="nfolha">Nº da folha:</label>
      <input
        name="nfolha"
        disabled={disableInput}
        style={{ color: color }}
        value={Number(bothValues.nfolha) + 1}
        id="nfolha"
        onChange={handleValues}
      />
      <div className="input-container">
        <label htmlFor="nprocesso">Nº processo:</label>
        <input
          disabled={disableInput}
          style={{ color: color }}
          value={bothValues.nprocesso}
          name="nprocesso"
          id="nprocesso"
          onChange={handleValues}
        />
      </div>
      <div className="input-container">
        <label htmlFor="anoprocesso">Ano processo:</label>
        <input
          disabled={disableInput}
          style={{ color: color }}
          value={bothValues.anoprocesso}
          name="anoprocesso"
          id="anoprocesso"
          onChange={handleValues}
        />
      </div>
      <div className="input-container-date">
        <label htmlFor="teste">Data de abertura:</label>
        <input
          disabled={disableInput}
          style={{ color: color }}
          className="input-date"
          name="dataAbertura"
          type="text"
          onChange={handleFormattedDate}
          value={formattedDate}
        />
      </div>
      <div className="input-container-nome">
        <label htmlFor="nome">Nome:</label>
        <input
          disabled={disableInput}
          style={{ color: color }}
          name="nome"
          id="nome"
          onChange={handleValues}
          value={bothValues.nome}
        />
      </div>
      <div className="input-container-folha">
        <label htmlFor="primeirafolha">Nº folha inicial:</label>
        <input
          name="primeirafolha"
          id="primeirafolha"
          onChange={handleAbertura}
          value={Number(bothValues.nfolha) + 1}
          disabled={disableInput}
          style={{ color: color }}
        />
      </div>
      <div className="input-container-vol">
        <label htmlFor="volaberto">Nº do volume aberto:</label>
        <input
          name="volaberto"
          id="volaberto"
          onChange={handleAbertura}
          value={valuesEncerramento.proxvolume}
          disabled={disableInput}
          style={{ color: color }}
        />
      </div>
      <div>
        <button
          onClick={() =>
            generatePDFSemLetras(
              bothValues.nfolha,
              bothValues.nprocesso,
              bothValues.anoprocesso,
              formattedDate,
              bothValues.nome,
              valuesEncerramento.volencerrado,
              valuesEncerramento.primeirafl,
              valuesEncerramento.ultimafl,
              valuesEncerramento.proxvolume,
              valuesAbertura.volaberto
            )
          }
        >
          Gerar pdf
        </button>
        <button onClick={() => navigateToCota()}>Gerar Cota</button>
        <button onClick={() => handleVoltar()}>Voltar</button>
      </div>
    </div>
  );
  return (
    <div className="div-abertura-encerramento">
      <div className="content">
        {encerramento}
        {abertura}
      </div>
    </div>
  );
}
