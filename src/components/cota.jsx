import { useState } from "react";
import { jsPDF } from "jspdf";
import "./cota.css";
import Logo from "../img/brasao_osasco.png";
import { useLocation } from "react-router-dom";

export default function Cota() {
  const [assinantes, setAssinantes] = useState("");
  const [cotaValues, setCotaValues] = useState({
    flcota: "",
    secretaria: "",
    cargo: "",
    volaberto: "",
    flpedido: "",
  });
  console.log(cotaValues)
  const { state } = useLocation();

  const handleCotaValues = (e) => {
    setCotaValues((prevCotaValues) => ({
        ...prevCotaValues,
        [e.target.name]: e.target.value,
    }))
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
    const stringPapelInformacaoCota = `Papel para informação, rubricado como folha nº ${cotaValues.flcota}`;
    const stringProcessoInformaçaoCota = `Do processo   ${state.nprocesso}/${state.anoprocesso}   de   ${state.dia}/${state.mes}/${state.ano}     Servidor(a): ${state.nome}`;
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
    doc.text(stringDataAtualAbertura, 80, 250);                                                                                                                        
    doc.save("Teste");
  };
  return (
    <div className="div-cota">
      <h1>Cota</h1>
      <label htmlFor="flcota">Nº folha</label>
      <input name="flcota" id="flcota" onChange={handleCotaValues} />
      <label htmlFor="secretaria" >Secretaria</label>
      <input name="secretaria" id="secretaria" onChange={handleCotaValues}/>
      <label htmlFor="cargo" >Cargo</label>
      <input name="cargo" id="cargo" onChange={handleCotaValues}/>
      <label htmlFor="volaberto" >{`Volume(s) aberto`}</label>
      <input name="volaberto" id="volaberto" onChange={handleCotaValues}/>
      <label htmlFor="flpedido" >Nº folha pedido para abertura</label>
      <input name="flpedido" id="flpedido" onChange={handleCotaValues}/>
      <label>Assinantes</label>
      <select
        value={assinantes}
        onChange={(e) => setAssinantes(e.target.value)}
      >
        <option selected></option>
        <option>Valdirene Germano</option>
        <option>Gilmara Pereira dos Santos</option>
        <option>Jeni Moreira de Andrade Nery</option>
      </select>
      <div>
        <button onClick={() => generateCota()}>Gerar pdf</button>
      </div>
    </div>
  );
}
