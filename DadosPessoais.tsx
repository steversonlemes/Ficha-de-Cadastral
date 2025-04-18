import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import RadioGroup from './ui/RadioGroup';
import DatePicker from './ui/DatePicker';

interface DadosPessoaisProps {
  formData: {
    nomes: string;
    sobrenomes: string;
    sexo: string;
    dataNascimento: string;
    cidadeNascimento: string;
    ufNascimento: string;
    paisNascimento: string;
    nomeMae: string;
    nomePai: string;
    endereco: string;
    bairro: string;
    cidadeResidencia: string;
    ufResidencia: string;
    paisResidencia: string;
    cep: string;
    telefone: string;
    email: string;
    documento: string;
  };
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const DadosPessoais: React.FC<DadosPessoaisProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const sexoOptions = [
    { id: 'sexo-masculino', label: 'Masculino', value: 'masculino' },
    { id: 'sexo-feminino', label: 'Feminino', value: 'feminino' },
  ];

  return (
    <Card title="Dados Pessoais">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="nomes"
            label="Nomes (sem abreviações)"
            value={formData.nomes}
            onChange={(e) => onChange('nomes', e.target.value)}
            required
            error={errors.nomes}
          />
          
          <Input
            id="sobrenomes"
            label="Sobrenomes (sem abreviações)"
            value={formData.sobrenomes}
            onChange={(e) => onChange('sobrenomes', e.target.value)}
            required
            error={errors.sobrenomes}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexo<span className="text-red-500 ml-1">*</span>
            </label>
            <RadioGroup
              name="sexo"
              options={sexoOptions}
              selectedValue={formData.sexo}
              onChange={(e) => onChange('sexo', e.target.value)}
              error={errors.sexo}
            />
          </div>
          
          <DatePicker
            id="dataNascimento"
            label="Data de nascimento"
            value={formData.dataNascimento}
            onChange={(e) => onChange('dataNascimento', e.target.value)}
            required
            error={errors.dataNascimento}
          />
          
          <Input
            id="cidadeNascimento"
            label="Cidade, UF, país de nascimento"
            value={formData.cidadeNascimento}
            onChange={(e) => onChange('cidadeNascimento', e.target.value)}
            required
            error={errors.cidadeNascimento}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="nomeMae"
            label="Nome da mãe"
            value={formData.nomeMae}
            onChange={(e) => onChange('nomeMae', e.target.value)}
            required
            error={errors.nomeMae}
          />
          
          <Input
            id="nomePai"
            label="Nome do pai"
            value={formData.nomePai}
            onChange={(e) => onChange('nomePai', e.target.value)}
            error={errors.nomePai}
          />
        </div>
        
        <Input
          id="endereco"
          label="Endereço residencial completo"
          value={formData.endereco}
          onChange={(e) => onChange('endereco', e.target.value)}
          required
          error={errors.endereco}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={(e) => onChange('bairro', e.target.value)}
            required
            error={errors.bairro}
          />
          
          <Input
            id="cidadeResidencia"
            label="Cidade, UF, país de residência"
            value={formData.cidadeResidencia}
            onChange={(e) => onChange('cidadeResidencia', e.target.value)}
            required
            error={errors.cidadeResidencia}
          />
          
          <Input
            id="cep"
            label="CEP"
            value={formData.cep}
            onChange={(e) => onChange('cep', e.target.value)}
            required
            error={errors.cep}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="telefone"
            label="Telefone"
            type="tel"
            value={formData.telefone}
            onChange={(e) => onChange('telefone', e.target.value)}
            required
            error={errors.telefone}
          />
          
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
          />
          
          <Input
            id="documento"
            label="Doc. Identificação / Órgão Emissor / UF"
            value={formData.documento}
            onChange={(e) => onChange('documento', e.target.value)}
            required
            error={errors.documento}
          />
        </div>
      </div>
    </Card>
  );
};

export default DadosPessoais;
