import { useState } from "react";
import { jsPDF } from "jspdf";
import "./abertura.css";
import Logo from "../img/brasao_osasco.png";
import { useLocation, useNavigate } from "react-router-dom";


export default function AberturaSemLetras() {
    const [bothValues, setBothValues] = useState({
      nfolha: "",
      nprocesso: "",
      anoprocesso: "",
      dia: "",
      mes: "",
      ano: "",
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

      console.log(valuesAbertura)
      const [hideDivAbertura, setHideDivAbertura] = useState(true);
      const [hideDivEncerramento, setHideDivEncerramento] = useState(false);
      const [disableInput, setDisableInput] = useState(false);
      const [color, setColor] = useState('');
    
      const navigate = useNavigate();
      const { state } = useLocation();
      
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
          [e.target.name]: e.target.value
        }));
      };
    
      const handleTermoEncerramento = () => {
        setHideDivAbertura(false);
        setHideDivEncerramento(true);
        setDisableInput(true);
        setColor('grey');
      };
    
      const handleVoltar = () => {
        setHideDivAbertura(true);
        setHideDivEncerramento(false);
      };
    
      const navigateToCota = () => {
        navigate({
          pathname: '/cota/semletras', 
        }, {
          state: bothValues
        });
      }
    
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
        const stringPapelInformacao = `Papel para informação, rubricado como folha nº ${Number(bothValues.nfolha)}`;
        const stringProcessoInformaçao = `Do processo   ${bothValues.nprocesso}/${bothValues.anoprocesso}   de   ${bothValues.dia}/${bothValues.mes}/${bothValues.ano}     Servidor(a): ${bothValues.nome}`;
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
        const stringPapelInformacaoAbertura = `Papel para informação, rubricado como folha nº ${Number(bothValues.nfolha) + 1}`;
        const stringProcessoInformaçaoAbertura = `Do processo   ${bothValues.nprocesso}/${bothValues.anoprocesso}   de   ${bothValues.dia}/${bothValues.mes}/${bothValues.ano}     Servidor(a): ${bothValues.nome}`;
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
        const stringSecondLineAberturaAberturaAbertura = `do volume ${valuesEncerramento.proxvolume} do processo ${bothValues.nprocesso}/${bothValues.anoprocesso} que se inicia com a folha de nº ${Number(bothValues.nfolha) + 1} que leva o`;
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
        doc.setFontSize(16.5);
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
          <label htmlFor="nfolha">Nº da folha</label>
          <input name="nfolha" id="nfolha" onChange={handleValues} />
          <div className="input-container-n2">
          <label htmlFor="nprocesso">Nº processo</label>
          <input name="nprocesso" id="nprocesso" onChange={handleValues} />
          </div>
          <div className="input-container-n2">
          <label htmlFor="anoprocesso">Ano processo</label>
          <input name="anoprocesso" id="anoprocesso" onChange={handleValues} />
          </div>
          <div className="input-container" >
          <label htmlFor="dia-abertura">Dia</label>
          <input name="dia" id="dia-abertura" onChange={handleValues} />
          </div>
          <div className="input-container" >
          <label htmlFor="mes-abertura">Mes</label>
          <input name="mes" id="mes-abertura" onChange={handleValues} />
          </div>
          <div className="input-container" >
          <label htmlFor="ano-abertura">Ano</label>
          <input name="ano" id="ano-abertura" onChange={handleValues} />
          </div>
          <label htmlFor="nome">Nome</label>
          <input name="nome" id="nome" onChange={handleValues} />
          <label htmlFor="volencerrado">Nº do volume encerrado</label>
          <input name="volencerrado" id="volencerrado" onChange={handleEncerramento} />
          <label htmlFor="primeirafl">Nº primeira folha</label>
          <input name="primeirafl" id="primeirafl" onChange={handleEncerramento} />
          <label htmlFor="ultimafl">Nº última folha</label>
          <input name="ultimafl" id="ultimafl" onChange={handleEncerramento} />
          <label htmlFor="proxvolume">Volume que vai ser aberto</label>
          <input name="proxvolume" id="proxvolume" onChange={handleEncerramento} />
          <div>
            <button onClick={() => handleTermoEncerramento()}>Gerar termo de abertura</button>
          </div>
        </div>
      );
      const abertura = (
        <div hidden={hideDivAbertura} className="div-abertura">
          <h2>Termo de abertura</h2>
          <label htmlFor="nfolha">Nº da folha</label>
          <input disabled={disableInput} style={{color: color}} value={Number(bothValues.nfolha) + 1} name="nfolha" id="nfolha" onChange={handleValues} />
          <div className="input-container-n2">
          <label htmlFor="nprocesso">Nº processo</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.nprocesso} name="nprocesso" id="nprocesso" onChange={handleValues} />
          </div>
          <div className="input-container-n2">
          <label htmlFor="anoprocesso">Ano processo</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.anoprocesso} name="anoprocesso" id="anoprocesso" onChange={handleValues} />
          </div>
          
          <div className="input-container" >
          <label htmlFor="dia-abertura">Dia</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.dia} name="dia" id="dia-abertura" onChange={handleValues} />
          </div>
          <div className="input-container" >
          <label htmlFor="mes-abertura">Mes</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.mes} name="mes" id="mes-abertura" onChange={handleValues} />
          </div>
          <div className="input-container" >
          <label htmlFor="ano-abertura">Ano</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.ano} name="ano" id="ano-abertura" onChange={handleValues} />
          </div>   
          
          <label htmlFor="nome">Nome</label>
          <input disabled={disableInput} style={{color: color}} value={bothValues.nome} name="nome" id="nome" onChange={handleValues} />
          <label htmlFor="volaberto">Nº do volume aberto</label>
          <input name="volaberto" id="volaberto" onChange={handleAbertura} value={valuesEncerramento.proxvolume} disabled={disableInput} style={{color: color}} />
          <label htmlFor="primeirafolha">Nº folha inicial</label>
          <input name="primeirafolha" id="primeirafolha" onChange={handleAbertura} value={Number(bothValues.nfolha) + 1} disabled={disableInput} style={{color: color}} />
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