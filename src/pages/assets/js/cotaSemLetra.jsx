import { useState } from "react";
import { jsPDF } from "jspdf";
import "./../css/cota.css";
import Logo from "./../../../img/brasao_osasco.png";
import { useLocation } from "react-router-dom";
import { commonMessage, successMessage } from "../../../utils/MessageHelpers";
import { generateCotaSemLetra } from './../../../pdf/cota/cotaSemLetras';
 

export default function CotaSemLetras() {
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
    }))
  }

  const validateCota = () => {
    if(!cotaValues.secretaria) return false;
    if(!cotaValues.cargo) return false;
    if(!cotaValues.volaberto) return false;
    if(!cotaValues.flpedido) return false;
    if(!assinantes) return false;
    return true;
  }

  const generateCota = () => {
    const doc = new jsPDF();
    doc.addImage(Logo, 10, 10, 30, 30);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    const stringPrefeituraCota = `PREFEITURA DO MUNICÍPIO DE OSASCO`;
    const stringSecretariaCota = `SECRETARIA DE ADMINISTRAÇÃO`;
    doc.text(stringPrefeituraCota, 57, 23);
    doc.text(stringSecretariaCota, 67, 33);
    doc.setFontSize(13);
    doc.setFont("Arial");
    const stringPapelInformacaoCota = `Papel para informação, rubricado como folha nº ${Number(state.nfolha) + 2}`;
    const stringProcessoInformaçaoCota = `Do processo   ${state.nprocesso}/${state.anoprocesso}   de   ${state.date}     Servidor(a): ${state.nome}`;
    doc.text(
      stringPapelInformacaoCota,
      doc.internal.pageSize.getWidth() / 1.6,
      60,
      { align: "center" }
    );
    doc.text(
      stringProcessoInformaçaoCota,
      doc.internal.pageSize.getWidth() / 1.8,
      70,
      { align: "center" }
    );
    doc.text("A", 30, 100);
    doc.text(`${cotaValues.secretaria}`, 30, 110)
    doc.text("Sr.(a)", 30, 125);
    doc.text(`${cotaValues.cargo}`, 30, 135)
    doc.setFontSize(11);
    doc.setFont("Helvetica");
    doc.text(`${assinantes}`, doc.internal.pageSize.getWidth() / 2, 195, {
      align: "center",
    });
    if (assinantes !== "Jeni Moreira de Andrade Nery") {
      doc.setFont("arial")
      doc.text(
        "Supervisora de Protocolo Geral e Arquivo Municipal",
        doc.internal.pageSize.getWidth() / 2,
        200,
        { align: "center" }
      );
      doc.text("Gerencia de Protolo e Arquivo Municipal", doc.internal.pageSize.getWidth() / 2,
      205,
      { align: "center" });
    } else {
      doc.setFont("arial")
      doc.text("Gerente de Protocolo Geral e Arquivo Municipal", doc.internal.pageSize.getWidth() / 2,
      200,
      { align: "center" });
      doc.text("Gerencia de Protolo e Arquivo Municipal", doc.internal.pageSize.getWidth() / 2,
      205,
      { align: "center" });
    }

    doc.text(`Providenciamos a abertura do volume ${cotaValues.volaberto}, conforme solicitado por Vossa Senhorias`, 30, 160);
    doc.text(`as folhas ${cotaValues.flpedido}.`, 30, 170)

    const dataAtualAbertura = new Date().toLocaleDateString();
    const stringDataAtualAbertura = `Osasco, ${dataAtualAbertura}`;
    doc.text(stringDataAtualAbertura, 85, 250);                                                                                                                        
    doc.save(`cota_${state.nprocesso}_${state.anoprocesso}`);
  };
  return (
    <div className="div-cota">
      <h1>Cota</h1>
      <label htmlFor="flcota">Nº folha</label>
      <input 
      name="flcota" 
      id="flcota" 
      onChange={handleCotaValues} 
      defaultValue={Number(state.nfolha) + 2} 
      disabled={true} 
      style={{color: "gray"}} 
      />
      <label htmlFor="secretaria" >Secretaria</label>
      <input name="secretaria" id="secretaria" onChange={handleCotaValues}/>
      {!cotaValues.secretaria ? commonMessage("Preencha este campo") : successMessage("OK!")}
      <label htmlFor="cargo" >Cargo</label>
      <input name="cargo" id="cargo" onChange={handleCotaValues}/>
      {!cotaValues.cargo ? commonMessage("Preencha este campo") : successMessage("OK!")}
      <label htmlFor="volaberto" >{`Volume(s) aberto`}</label>
      <input name="volaberto" id="volaberto" onChange={handleCotaValues}/>
      {!cotaValues.volaberto ? commonMessage("Preencha este campo") : successMessage("OK!")}
      <label htmlFor="flpedido" >Nº folha pedido para abertura</label>
      <input name="flpedido" id="flpedido" onChange={handleCotaValues}/>
      {!cotaValues.flpedido ? commonMessage("Preencha este campo") : successMessage("OK!")}
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
      {assinantes === '' ? commonMessage("Preencha este campo") : successMessage("OK!")}
      <div>
        <button disabled={!validateCota()} onClick={() => generateCotaSemLetra(
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
        )}>Gerar pdf</button>
      </div>
    </div>
  );
}
