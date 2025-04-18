import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import SignatureCanvas from './ui/SignatureCanvas';

interface AssinaturaProps {
  formData: {
    nomeResponsavel: string;
    documentoResponsavel: string;
    assinaturaData: string;
  };
  onChange: (name: string, value: any) => void;
  onSaveSignature: (signatureData: string) => void;
  onClearSignature: () => void;
  errors: Record<string, string>;
}

const Assinatura: React.FC<AssinaturaProps> = ({
  formData,
  onChange,
  onSaveSignature,
  onClearSignature,
  errors,
}) => {
  return (
    <Card title="Assinatura">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 mb-4">
          Por favor, preencha os dados abaixo e adicione sua assinatura:
        </p>
        
        <Input
          id="nomeResponsavel"
          label="Nome responsável"
          value={formData.nomeResponsavel}
          onChange={(e) => onChange('nomeResponsavel', e.target.value)}
          required
          error={errors.nomeResponsavel}
        />
        
        <Input
          id="documentoResponsavel"
          label="Doc. Identificação / Órgão Emissor / UF"
          value={formData.documentoResponsavel}
          onChange={(e) => onChange('documentoResponsavel', e.target.value)}
          required
          error={errors.documentoResponsavel}
        />
        
        <SignatureCanvas
          id="assinatura"
          label="Assinatura responsável"
          onSave={onSaveSignature}
          onClear={onClearSignature}
          error={errors.assinaturaData}
        />
        
        <p className="text-sm text-gray-600 mt-2">
          Menores de 18 anos (sob autorização de responsável, se necessário)
        </p>
      </div>
    </Card>
  );
};

export default Assinatura;
