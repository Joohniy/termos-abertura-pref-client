import { jsPDF } from 'jspdf';
import Logo from '../../img/brasao_osasco.png';

export const generateCotaLetras = (flcota, nprocesso, anoprocesso, date, nome, secretaria, cargo, assinantes, volaberto, flpedido) => {
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
    const stringPapelInformacaoCota = `Papel para informação, rubricado como folha nº ${flcota}`;
    const stringProcessoInformaçaoCota = `Do processo   ${nprocesso}/${anoprocesso}   de   ${date}     Servidor(a): ${nome}`;
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
    doc.text(`${secretaria}`, 30, 110)
    doc.text("Sr.(a)", 30, 125);
    doc.text(`${cargo}`, 30, 135)
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

    doc.text(`Providenciamos a abertura do volume ${volaberto}, conforme solicitado por Vossa Senhorias`, 30, 160);
    doc.text(`as folhas ${flpedido}.`, 30, 170)

    const dataAtualAbertura = new Date().toLocaleDateString();
    const stringDataAtualAbertura = `Osasco, ${dataAtualAbertura}`;
    doc.text(stringDataAtualAbertura, 85, 250);                                                                                                                        
    doc.save(`cota_${nprocesso}_${anoprocesso}`);
  };
