import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import EmailSender from './EmailSender';

interface PDFGeneratorProps {
  formData: any;
  fotosData: File[];
  assinaturaData: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  formData,
  fotosData,
  assinaturaData,
}) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Criar uma nova instância do jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Adicionar logo e título
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('FICHA DE REGISTRO DE CANDIDATO', pageWidth / 2, 15, { align: 'center' });
      
      // Adicionar subtítulo
      pdf.setFontSize(10);
      pdf.text('PREENCHA A FICHA COM LETRA DE FORMA E NÃO DEIXE CAMPOS SEM RESPOSTA', pageWidth / 2, 20, { align: 'center' });
      
      // Seção de Identificação
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 150);
      pdf.text('IDENTIFICAÇÃO', 10, 30);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      
      let yPos = 35;
      
      if (formData.batismo) {
        pdf.text('☑ Batismo', 10, yPos);
      } else {
        pdf.text('☐ Batismo', 10, yPos);
      }
      
      if (formData.votoEspecial) {
        pdf.text('☑ Voto especial', 50, yPos);
      } else {
        pdf.text('☐ Voto especial', 50, yPos);
      }
      
      yPos += 5;
      
      if (formData.rebatismo) {
        pdf.text('☑ Rebatismo', 10, yPos);
        pdf.text(`Data da remoção: ${formData.dataRemocao || 'N/A'}`, 50, yPos);
      } else {
        pdf.text('☐ Rebatismo', 10, yPos);
      }
      
      yPos += 5;
      
      if (formData.profissaoFe) {
        pdf.text('☑ Profissão de fé', 10, yPos);
        pdf.text(`Motivo: ${formData.motivoProfissaoFe || 'N/A'}`, 50, yPos);
      } else {
        pdf.text('☐ Profissão de fé', 10, yPos);
      }
      
      yPos += 5;
      
      if (formData.igrejaAnterior) {
        pdf.text(`Igreja/grupo anterior: ${formData.igrejaAnterior}`, 10, yPos);
      }
      
      // Dados Pessoais
      yPos += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 150);
      pdf.text('DADOS PESSOAIS', 10, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      
      yPos += 5;
      pdf.text(`Nome: ${formData.nomes || ''} ${formData.sobrenomes || ''}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Sexo: ${formData.sexo === 'masculino' ? 'Masculino' : 'Feminino'}`, 10, yPos);
      pdf.text(`Data de nascimento: ${formData.dataNascimento || 'N/A'}`, 80, yPos);
      
      yPos += 5;
      pdf.text(`Local de nascimento: ${formData.cidadeNascimento || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Nome da mãe: ${formData.nomeMae || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Nome do pai: ${formData.nomePai || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Endereço: ${formData.endereco || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Bairro: ${formData.bairro || 'N/A'}`, 10, yPos);
      pdf.text(`CEP: ${formData.cep || 'N/A'}`, 80, yPos);
      
      yPos += 5;
      pdf.text(`Cidade/UF: ${formData.cidadeResidencia || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Telefone: ${formData.telefone || 'N/A'}`, 10, yPos);
      pdf.text(`E-mail: ${formData.email || 'N/A'}`, 80, yPos);
      
      yPos += 5;
      pdf.text(`Documento: ${formData.documento || 'N/A'}`, 10, yPos);
      
      // Informações Religiosas
      yPos += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 150);
      pdf.text('INFORMAÇÕES RELIGIOSAS', 10, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      
      yPos += 5;
      pdf.text(`Instrutor bíblico 1: ${formData.instrutor1 || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Instrutor bíblico 2: ${formData.instrutor2 || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Estado civil: ${formData.estadoCivil || 'N/A'}`, 10, yPos);
      
      if (formData.estadoCivil === 'casado') {
        pdf.text(`Data casamento: ${formData.dataCasamento || 'N/A'}`, 80, yPos);
      }
      
      yPos += 5;
      pdf.text(`Religião anterior: ${formData.religiaoAnterior || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Como conheceu a IASD: ${formData.comoConheceu || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Como estudou a Bíblia: ${formData.comoEstudou || 'N/A'}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Fator decisivo para batismo: ${formData.fatorDecisivo || 'N/A'}`, 10, yPos);
      
      // Declaração de Fé
      yPos += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 150);
      pdf.text('DECLARAÇÃO DE FÉ', 10, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(8);
      
      yPos += 5;
      pdf.text(`1. Aceita a Bíblia toda como a inspirada Palavra de Deus? ${formData.pergunta1 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`2. Aceita o ensino bíblico da Trindade? ${formData.pergunta2 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`3. Aceita a morte de Jesus Cristo como o sacrifício que perdoa? ${formData.pergunta3 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`4. Aceita Jesus Cristo como o seu único Salvador pessoal? ${formData.pergunta4 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`5. Decide deixar os hábitos prejudiciais à saúde? ${formData.pergunta5 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`6. Aceita pôr em prática todas as crenças e princípios bíblicos? ${formData.pergunta6 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`7. Aceita devolver fiel e voluntariamente o dízimo e a oferta? ${formData.pergunta7 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`8. Decide obedecer a todos os mandamentos de Deus? ${formData.pergunta8 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`9. Crê e aceita que a Igreja Adventista do Sétimo Dia é a igreja remanescente? ${formData.pergunta9 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`10. Aceita o ensinamento bíblico dos dons espirituais? ${formData.pergunta10 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`11. Aceita o ensinamento bíblico do batismo por imersão? ${formData.pergunta11 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`12. Aceita que Jesus Cristo é o seu intercessor no Santuário Celestial? ${formData.pergunta12 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      yPos += 4;
      pdf.text(`13. Aceita preparar-se como Cristo o fez? ${formData.pergunta13 ? '☑ Sim' : '☐ Não'}`, 10, yPos);
      
      // Declaração final
      yPos += 8;
      pdf.setFontSize(7);
      pdf.text('CREIO E ACEITO AS CRENÇAS FUNDAMENTAIS, NORMAS E PRINCÍPIOS DA IGREJA ADVENTISTA DO SÉTIMO DIA, INCLUSIVE A DISCIPLINA ECLESIÁSTICA,', 10, yPos);
      yPos += 3;
      pdf.text('EXPRESSOS NO "MANUAL DA IGREJA", E DESEJO SER MEMBRO DESTA CONGREGAÇÃO LOCAL DA IGREJA ADVENTISTA MUNDIAL.', 10, yPos);
      
      yPos += 5;
      pdf.text('COM A MINHA ASSINATURA DOU CONSENTIMENTO EXPRESSO PARA QUE A IGREJA ADVENTISTA DO SÉTIMO DIA TRATE MEUS DADOS PESSOAIS DE ACORDO COM A LEI,', 10, yPos);
      yPos += 3;
      pdf.text('ESPECIFICAMENTE NO CUMPRIMENTO DE SUAS FINALIDADES INSTITUCIONAIS. A POLÍTICA DE PRIVACIDADE ESTÁ PUBLICADA NO SITE: https://me.app/policy', 10, yPos);
      
      // Assinatura
      yPos += 10;
      pdf.setFontSize(10);
      pdf.text(`Nome responsável: ${formData.nomeResponsavel || ''}`, 10, yPos);
      
      yPos += 5;
      pdf.text(`Doc. Identificação: ${formData.documentoResponsavel || ''}`, 10, yPos);
      
      yPos += 5;
      if (assinaturaData) {
        pdf.addImage(assinaturaData, 'PNG', 10, yPos, 50, 20);
      }
      
      yPos += 25;
      pdf.text('Menores de 18 anos (sob autorização de responsável, se necessário)', 10, yPos);
      
      // Adicionar segunda página para as fotos
      if (fotosData && fotosData.length > 0) {
        pdf.addPage();
        
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text('FOTOS', pageWidth / 2, 15, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.text(`Nome: ${formData.nomes || ''} ${formData.sobrenomes || ''}`, 10, 25);
        
        // Organizar as fotos em grade
        const fotosPerRow = 2;
        const fotoWidth = 80;
        const fotoHeight = 80;
        const marginX = 10;
        const marginY = 35;
        const paddingX = (pageWidth - (fotosPerRow * fotoWidth)) / (fotosPerRow + 1);
        
        for (let i = 0; i < fotosData.length && i < 5; i++) {
          const row = Math.floor(i / fotosPerRow);
          const col = i % fotosPerRow;
          
          const x = marginX + paddingX + col * (fotoWidth + paddingX);
          const y = marginY + row * (fotoHeight + 20);
          
          // Converter File para URL
          const url = URL.createObjectURL(fotosData[i]);
          
          // Criar uma imagem temporária para obter os dados
          const img = new Image();
          img.src = url;
          
          // Esperar a imagem carregar
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          
          // Adicionar a imagem ao PDF
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/jpeg');
            pdf.addImage(imgData, 'JPEG', x, y, fotoWidth, fotoHeight);
            pdf.text(`Foto ${i + 1}`, x + fotoWidth / 2, y + fotoHeight + 5, { align: 'center' });
          }
        }
      }
      
      // Obter o blob do PDF
      const pdfOutput = pdf.output('blob');
      setPdfBlob(pdfOutput);
      
      // Também salvar o PDF
      pdf.save('ficha_cadastro_membro.pdf');
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isGenerating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isGenerating ? 'Gerando PDF...' : 'Gerar PDF'}
      </button>
      
      {pdfBlob && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-green-600 font-medium">PDF gerado com sucesso!</p>
          <p className="text-sm text-gray-600 mt-1">
            O PDF foi salvo automaticamente. Você também pode enviá-lo por e-mail:
          </p>
          
          <EmailSender formData={formData} pdfBlob={pdfBlob} />
        </div>
      )}
    </div>
  );
};

export default PDFGenerator;
