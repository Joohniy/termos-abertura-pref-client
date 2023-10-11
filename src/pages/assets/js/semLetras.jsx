import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./../../assets/css/abertura.css";
import Logo from "./../../../img/brasao_osasco.png";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

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

  const navigate = useNavigate();
  const formatDate = (input) => {
    let newValue = input.replace(/\D/g, "");

    if (newValue.length >= 2) {
      newValue = newValue.slice(0, 2) + "/" + newValue.slice(2);
    }
    if (newValue.length >= 5) {
      newValue = newValue.slice(0, 5) + "/" + newValue.slice(5);
    }
    setformattedDate(newValue);
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
  const handleDeleteDate = () => {
    setformattedDate("");
    setBothValues((prevBothValues) => ({
      ...prevBothValues,
      date: "",
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

  const handleTermoEncerramento = () => {
    setHideDivAbertura(false);
    setHideDivEncerramento(true);
    setDisableInput(true);
    setColor("grey");
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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(Logo, 10, 10, 30, 30);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    const stringPrefeitura = `PREFEITURA DO MUNICÍPIO DE OSASCO`;
    const stringSecretaria = `SECRETARIA DE ADMINISTRAÇÃO`;
    doc.text(stringPrefeitura, 57, 23);
    doc.text(stringSecretaria, 67, 33);
    doc.setFontSize(13);
    doc.setFont("Arial");
    const stringPapelInformacao = `Papel para informação, rubricado como folha nº ${Number(
      bothValues.nfolha
    )}`;
    const stringProcessoInformaçao = `Do processo   ${bothValues.nprocesso}/${bothValues.anoprocesso}   de   ${formattedDate}     Servidor(a): ${bothValues.nome}`;
    doc.text(
      stringPapelInformacao,
      doc.internal.pageSize.getWidth() / 1.6,
      60,
      { align: "center" }
    );
    doc.text(
      stringProcessoInformaçao,
      doc.internal.pageSize.getWidth() / 1.8,
      70,
      { align: "center" }
    );
    doc.setFontSize(16.5);
    doc.setFont("Helvetica", "bold");
    const stringTitleEncerramento = `Termo de Encerramento de Volume`;
    doc.text(
      stringTitleEncerramento,
      doc.internal.pageSize.getWidth() / 2,
      110,
      { align: "center" }
    );
    doc.setFontSize(12);
    doc.setFont("Arial");
    const stringFirstLine = `Fica encerrado este volume de nº ${valuesEncerramento.volencerrado} referente ao processo nº ${bothValues.nprocesso}/${bothValues.anoprocesso}.`;
    const stringSecondLine = `Que tem folhas ${valuesEncerramento.primeirafl} a ${valuesEncerramento.ultimafl}, como prosseguimento do feito providenciamos a`;
    const stringThirdLine = `abertura do volume ${valuesEncerramento.proxvolume} não sendo permitida a separação dos mesmos`;
    doc.text(stringFirstLine, doc.internal.pageSize.getWidth() / 2, 145, {
      align: "center",
    });
    doc.text(stringSecondLine, doc.internal.pageSize.getWidth() / 2, 155, {
      align: "center",
    });
    doc.text(stringThirdLine, doc.internal.pageSize.getWidth() / 2, 165, {
      align: "center",
    });
    doc.setFontSize(16.5);
    const dataAtual = new Date().toLocaleDateString();
    const stringDataAtual = `Osasco, ${dataAtual}`;
    doc.text(stringDataAtual, 80, 250);
    //termino codigo para gerar pdf encerramento
    doc.addPage();
    //comeco codigo para gerar pdf abertura
    doc.addImage(Logo, 10, 10, 30, 30);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    const stringPrefeituraAbertura = `PREFEITURA DO MUNICÍPIO DE OSASCO`;
    const stringSecretariaAbertura = `SECRETARIA DE ADMINISTRAÇÃO`;
    doc.text(stringPrefeituraAbertura, 57, 23);
    doc.text(stringSecretariaAbertura, 67, 33);
    doc.setFontSize(13);
    doc.setFont("Arial");
    const stringPapelInformacaoAbertura = `Papel para informação, rubricado como folha nº ${
      Number(bothValues.nfolha) + 1
    }`;
    const stringProcessoInformaçaoAbertura = `Do processo   ${bothValues.nprocesso}/${bothValues.anoprocesso}   de   ${formattedDate}     Servidor(a): ${bothValues.nome}`;
    doc.text(
      stringPapelInformacaoAbertura,
      doc.internal.pageSize.getWidth() / 1.6,
      60,
      { align: "center" }
    );
    doc.text(
      stringProcessoInformaçaoAbertura,
      doc.internal.pageSize.getWidth() / 1.8,
      70,
      { align: "center" }
    );
    doc.setFontSize(16.5);
    doc.setFont("Helvetica", "bold");
    const stringTitleAbertura = `Termo de Abertura de Volume`;
    doc.text(stringTitleAbertura, doc.internal.pageSize.getWidth() / 2, 110, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.setFont("Arial");
    const stringFirstLineAbertura = `Nesta data, na divisão de Gestão de Processos e Arquivos, procedemos a abertura`;
    const stringSecondLineAberturaAberturaAbertura = `do volume ${
      valuesEncerramento.proxvolume
    } do processo ${bothValues.nprocesso}/${
      bothValues.anoprocesso
    } que se inicia com a folha de nº ${
      Number(bothValues.nfolha) + 1
    } que leva o`;
    const stringThirdLineAberturaAbertura = `mesmo número do processo e as mesmas especificações, não sendo permitida sua separação.`;
    doc.text(
      stringFirstLineAbertura,
      doc.internal.pageSize.getWidth() / 2,
      145,
      { align: "center" }
    );
    doc.text(
      stringSecondLineAberturaAberturaAbertura,
      doc.internal.pageSize.getWidth() / 2,
      155,
      { align: "center" }
    );
    doc.text(
      stringThirdLineAberturaAbertura,
      doc.internal.pageSize.getWidth() / 2,
      165,
      { align: "center" }
    );
    doc.setFontSize(14);
    const dataAtualAbertura = new Date().toLocaleDateString();
    const stringDataAtualAbertura = `Osasco, ${dataAtualAbertura}`;
    doc.text(stringDataAtualAbertura, 80, 250);
    doc.save(
      `abertura_${valuesAbertura.volaberto}_encerramento_${valuesEncerramento.volencerrado}_${bothValues.nprocesso}/${bothValues.anoprocesso}`
    );
  };

  const encerramento = (
    <div hidden={hideDivEncerramento} className="div-encerramento">
      <h2>Termo de Encerramento</h2>
      <label htmlFor="nfolha">Nº da folha:</label>
      <input name="nfolha" id="nfolha" onChange={handleValues} />

      <div className="input-container">
      <label htmlFor="nprocesso">Nº processo:</label>
      <input name="nprocesso" id="nprocesso" onChange={handleValues} />
      </div>
      <div className="input-container">
      <label htmlFor="anoprocesso">Ano processo:</label>
      <input name="anoprocesso" id="anoprocesso" onChange={handleValues} />
      </div>
      <div className="input-container-date">
      <label htmlFor="teste">Data de abertura:</label>
      <input  className="input-date" name="dataAbertura" type="text" onChange={handleFormattedDate} value={formattedDate} />
      <TiDelete className="ti-delete" onClick={() => handleDeleteDate()} />
      </div>
      <div className="input-container-nome" >
      <label htmlFor="nome">Nome:</label>
      <input name="nome" id="nome" onChange={handleValues} />
      </div>
      <div className="input-container-folha">
      <label htmlFor="primeirafl">Nº primeira folha:</label>
      <input name="primeirafl" id="primeirafl" onChange={handleEncerramento} />
      </div>
      <div className="input-container-folha">
      <label htmlFor="ultimafl">Nº última folha:</label>
      <input name="ultimafl" id="ultimafl" onChange={handleEncerramento} />
      </div>
      <div className="input-container-vol">
      <label htmlFor="volencerrado">Volume encerrado:</label>
      <input className="input-volencerrado" name="volencerrado" id="volencerrado" onChange={handleEncerramento} />
      </div>
      <div className="input-container-vol" >
      <label htmlFor="proxvolume">Volume que vai ser aberto:</label>
      <input name="proxvolume" id="proxvolume" onChange={handleEncerramento} />
      </div>
      <div>
        <button disabled={!bothValues.nfolha ? true : false} onClick={() => handleTermoEncerramento()}>Gerar termo de abertura</button>
      </div>
    </div>
  );
  const abertura = (
    <div hidden={hideDivAbertura} className="div-abertura">
      <h2>Termo de abertura</h2>
      <label htmlFor="nfolha">Nº da folha:</label>
      <input disabled={disableInput} style={{color: color}} value={bothValues.nfolha} name="nfolha" id="nfolha" onChange={handleValues} />
      <div className="input-container">
      <label htmlFor="nprocesso">Nº processo:</label>
      <input disabled={disableInput} style={{color: color}} value={bothValues.nprocesso} name="nprocesso" id="nprocesso" onChange={handleValues} />
      </div> 
      <div className="input-container">
      <label htmlFor="anoprocesso">Ano processo:</label>
      <input disabled={disableInput} style={{color: color}} value={bothValues.anoprocesso} name="anoprocesso" id="anoprocesso" onChange={handleValues} />
      </div>
      <div className="input-container-date">
      <label htmlFor="teste">Data de abertura:</label>
      <input disabled={disableInput} className="input-date" name="dataAbertura" type="text" onChange={handleFormattedDate} value={formattedDate} />
      </div>
      <div className="input-container-nome" >
      <label htmlFor="nome">Nome:</label>
      <input disabled={disableInput} style={{color:color}} name="nome" id="nome" onChange={handleValues} value={bothValues.nome} />
      </div>
      <div className="input-container-folha">
      <label htmlFor="primeirafolha">Nº folha inicial:</label>
      <input name="primeirafolha" id="primeirafolha" onChange={handleAbertura} value={Number(bothValues.nfolha) + 1} disabled={disableInput} style={{color: color}} />
      </div>
      <div className="input-container-vol">
      <label htmlFor="volaberto">Nº do volume aberto:</label>
      <input name="volaberto" id="volaberto" onChange={handleAbertura} value={valuesEncerramento.proxvolume} disabled={disableInput} style={{color: color}} />
      </div>
      <div>
        <button onClick={() => generatePDF()}>Gerar pdf</button>
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
