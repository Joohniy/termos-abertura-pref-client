import { jsPDF } from 'jspdf';
import Logo from './../../img/brasao_osasco.png';

export const generatePDFSemLetras = (nfolha, nprocesso, anoprocesso, formattedDate, nome, volencerrado, primeirafl, ultimafl, proxvolume, volaberto) => {
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
    const stringPapelInformacao = `Papel para informação, rubricado como folha nº ${Number(nfolha) + 2}`;
    const stringProcessoInformaçao = `Do processo   ${nprocesso}/${anoprocesso}   de   ${formattedDate}     Servidor(a): ${nome}`;
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
    const stringFirstLine = `Fica encerrado este volume de nº ${volencerrado} referente ao processo nº ${nprocesso}/${anoprocesso}.`;
    const stringSecondLine = `Que tem folhas ${primeirafl} a ${ultimafl}, como prosseguimento do feito providenciamos a`;
    const stringThirdLine = `abertura do volume ${proxvolume} não sendo permitida a separação dos mesmos`;
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
      Number(nfolha) + 1
    }`;
    const stringProcessoInformaçaoAbertura = `Do processo   ${nprocesso}/${anoprocesso}   de   ${formattedDate}     Servidor(a): ${nome}`;
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
      proxvolume
    } do processo ${nprocesso}/${
      anoprocesso
    } que se inicia com a folha de nº ${
      Number(nfolha) + 1
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
      `abertura_${volaberto}_encerramento_${volencerrado}_${nprocesso}/${anoprocesso}`
    );
  };
