import React, { useState } from 'react';
import FormLayout from './components/FormLayout';
import Identificacao from './components/Identificacao';
import DadosPessoais from './components/DadosPessoais';
import InformacoesReligiosas from './components/InformacoesReligiosas';
import DeclaracaoFe from './components/DeclaracaoFe';
import Assinatura from './components/Assinatura';
import Fotos from './components/Fotos';
import PDFGenerator from './components/PDFGenerator';
import Card from './components/ui/Card';

function App() {
  // Estado para controlar a etapa atual do formulário
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    // Identificação
    batismo: false,
    votoEspecial: false,
    rebatismo: false,
    profissaoFe: false,
    dataRemocao: '',
    motivoProfissaoFe: '',
    igrejaAnterior: '',
    
    // Dados Pessoais
    nomes: '',
    sobrenomes: '',
    sexo: '',
    dataNascimento: '',
    cidadeNascimento: '',
    ufNascimento: '',
    paisNascimento: '',
    nomeMae: '',
    nomePai: '',
    endereco: '',
    bairro: '',
    cidadeResidencia: '',
    ufResidencia: '',
    paisResidencia: '',
    cep: '',
    telefone: '',
    email: '',
    documento: '',
    
    // Informações Religiosas
    instrutor1: '',
    instrutor2: '',
    estadoCivil: '',
    dataCasamento: '',
    religiaoAnterior: '',
    comoConheceu: '',
    comoEstudou: '',
    fatorDecisivo: '',
    
    // Declaração de Fé
    pergunta1: false,
    pergunta2: false,
    pergunta3: false,
    pergunta4: false,
    pergunta5: false,
    pergunta6: false,
    pergunta7: false,
    pergunta8: false,
    pergunta9: false,
    pergunta10: false,
    pergunta11: false,
    pergunta12: false,
    pergunta13: false,
    aceitaTermos: false,
    
    // Assinatura
    nomeResponsavel: '',
    documentoResponsavel: '',
  });
  
  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado para armazenar a assinatura
  const [assinaturaData, setAssinaturaData] = useState('');
  
  // Estado para armazenar as fotos
  const [fotos, setFotos] = useState<File[]>([]);
  
  // Estado para controlar se o formulário foi enviado
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Função para atualizar os dados do formulário
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpar erro do campo quando ele for alterado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Função para salvar a assinatura
  const handleSaveSignature = (signatureData: string) => {
    setAssinaturaData(signatureData);
    
    // Limpar erro da assinatura
    if (errors.assinaturaData) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.assinaturaData;
        return newErrors;
      });
    }
  };
  
  // Função para limpar a assinatura
  const handleClearSignature = () => {
    setAssinaturaData('');
  };
  
  // Função para validar a etapa atual
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Identificação
        // Não há campos obrigatórios na identificação
        break;
        
      case 2: // Dados Pessoais
        if (!formData.nomes) newErrors.nomes = 'Nome é obrigatório';
        if (!formData.sobrenomes) newErrors.sobrenomes = 'Sobrenome é obrigatório';
        if (!formData.sexo) newErrors.sexo = 'Sexo é obrigatório';
        if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        if (!formData.nomeMae) newErrors.nomeMae = 'Nome da mãe é obrigatório';
        if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
        if (!formData.bairro) newErrors.bairro = 'Bairro é obrigatório';
        if (!formData.cidadeResidencia) newErrors.cidadeResidencia = 'Cidade é obrigatória';
        if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
        break;
        
      case 3: // Informações Religiosas
        if (!formData.estadoCivil) newErrors.estadoCivil = 'Estado civil é obrigatório';
        if (!formData.comoConheceu) newErrors.comoConheceu = 'Como conheceu a IASD é obrigatório';
        if (!formData.comoEstudou) newErrors.comoEstudou = 'Como estudou a Bíblia é obrigatório';
        if (!formData.fatorDecisivo) newErrors.fatorDecisivo = 'Fator decisivo é obrigatório';
        break;
        
      case 4: // Declaração de Fé
        if (!formData.aceitaTermos) newErrors.aceitaTermos = 'Você precisa aceitar os termos para continuar';
        break;
        
      case 5: // Assinatura
        if (!formData.nomeResponsavel) newErrors.nomeResponsavel = 'Nome do responsável é obrigatório';
        if (!formData.documentoResponsavel) newErrors.documentoResponsavel = 'Documento é obrigatório';
        if (!assinaturaData) newErrors.assinaturaData = 'Assinatura é obrigatória';
        break;
        
      case 6: // Fotos
        // Não há campos obrigatórios nas fotos
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Função para avançar para a próxima etapa
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };
  
  // Função para voltar para a etapa anterior
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  // Função para enviar o formulário
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
    }
  };
  
  // Função para iniciar um novo cadastro
  const handleNewForm = () => {
    setFormData({
      batismo: false,
      votoEspecial: false,
      rebatismo: false,
      profissaoFe: false,
      dataRemocao: '',
      motivoProfissaoFe: '',
      igrejaAnterior: '',
      nomes: '',
      sobrenomes: '',
      sexo: '',
      dataNascimento: '',
      cidadeNascimento: '',
      ufNascimento: '',
      paisNascimento: '',
      nomeMae: '',
      nomePai: '',
      endereco: '',
      bairro: '',
      cidadeResidencia: '',
      ufResidencia: '',
      paisResidencia: '',
      cep: '',
      telefone: '',
      email: '',
      documento: '',
      instrutor1: '',
      instrutor2: '',
      estadoCivil: '',
      dataCasamento: '',
      religiaoAnterior: '',
      comoConheceu: '',
      comoEstudou: '',
      fatorDecisivo: '',
      pergunta1: false,
      pergunta2: false,
      pergunta3: false,
      pergunta4: false,
      pergunta5: false,
      pergunta6: false,
      pergunta7: false,
      pergunta8: false,
      pergunta9: false,
      pergunta10: false,
      pergunta11: false,
      pergunta12: false,
      pergunta13: false,
      aceitaTermos: false,
      nomeResponsavel: '',
      documentoResponsavel: '',
    });
    setAssinaturaData('');
    setFotos([]);
    setIsSubmitted(false);
    setCurrentStep(1);
    setErrors({});
  };
  
  // Renderizar o conteúdo da etapa atual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Identificacao
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DadosPessoais
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <InformacoesReligiosas
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <DeclaracaoFe
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <Assinatura
            formData={formData}
            onChange={handleChange}
            onSaveSignature={handleSaveSignature}
            onClearSignature={handleClearSignature}
            errors={errors}
          />
        );
      case 6:
        return (
          <Fotos
            formData={{ fotos }}
            onChange={(name, value) => setFotos(value)}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {!isSubmitted ? (
        <FormLayout
          title="Ficha de Cadastro de Membro - Igreja Adventista do Sétimo Dia"
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === totalSteps}
        >
          {renderStepContent()}
        </FormLayout>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          <Card className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Concluído</h1>
              <p className="text-gray-600">
                Todos os dados foram preenchidos com sucesso. Você pode gerar o PDF ou iniciar um novo cadastro.
              </p>
            </div>
            
            <PDFGenerator
              formData={formData}
              fotosData={fotos}
              assinaturaData={assinaturaData}
            />
            
            <div className="mt-6">
              <button
                onClick={handleNewForm}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Iniciar Novo Cadastro
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
