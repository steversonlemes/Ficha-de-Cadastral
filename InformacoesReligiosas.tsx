import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Checkbox from './ui/Checkbox';
import Select from './ui/Select';
import DatePicker from './ui/DatePicker';

interface InformacoesReligiosasProps {
  formData: {
    instrutor1: string;
    instrutor2: string;
    estadoCivil: string;
    dataCasamento: string;
    religiaoAnterior: string;
    comoConheceu: string;
    comoEstudou: string;
    fatorDecisivo: string;
  };
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const InformacoesReligiosas: React.FC<InformacoesReligiosasProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const estadoCivilOptions = [
    { value: 'solteiro', label: 'Solteiro' },
    { value: 'divorciado', label: 'Divorciado' },
    { value: 'viuvo', label: 'Viúvo' },
    { value: 'casado', label: 'Casado' },
    { value: 'outro', label: 'Outro' },
  ];

  const comoConheceuOptions = [
    { value: 'acampamento', label: 'Acampamento/retiro' },
    { value: 'adra', label: 'ADRA' },
    { value: 'amigos', label: 'Amigos/conhecidos' },
    { value: 'desbravadores', label: 'Desbravadores/Aventureiros' },
    { value: 'educacao', label: 'Educação Adventista' },
    { value: 'escolaSabatina', label: 'Escola Sabatina' },
    { value: 'evangelismoPublico', label: 'Evangelismo público' },
    { value: 'familia', label: 'Família/parentes' },
    { value: 'instituicaoSaude', label: 'Instituição de saúde' },
    { value: 'internet', label: 'Internet' },
    { value: 'livros', label: 'Livros/literatura' },
    { value: 'missaoCalebe', label: 'Missão Calebe' },
    { value: 'mutiraoNatal', label: 'Mutirão de Natal' },
    { value: 'pequenoGrupo', label: 'Pequeno Grupo' },
    { value: 'quebrandoSilencio', label: 'Quebrando o Silêncio' },
    { value: 'radio', label: 'Rádio' },
    { value: 'tv', label: 'TV' },
    { value: 'outro', label: 'Outro' },
  ];

  const comoEstudouOptions = [
    { value: 'classeASA', label: 'Classe Bíblica ASA' },
    { value: 'classeCalebe', label: 'Classe Bíblica Calebe/Jovens' },
    { value: 'classeIgreja', label: 'Classe Bíblica da igreja' },
    { value: 'classeDesbr', label: 'Classe Bíblica Desbr/Avent' },
    { value: 'classeEducacao', label: 'Classe Bíblica Educação' },
    { value: 'classeES', label: 'Classe Bíblica ES' },
    { value: 'escolaNovoTempo', label: 'Escola Bíblica Novo Tempo' },
    { value: 'escolaFerias', label: 'Escola Cristã de Férias' },
    { value: 'estudoIndividual', label: 'Estudo Bíblico individual' },
    { value: 'estudoOnline', label: 'Estudo Bíblico on-line' },
    { value: 'evangelismoPublico', label: 'Evangelismo público' },
    { value: 'sermoes', label: 'Ouvi sermões na igreja' },
    { value: 'pequenoGrupo', label: 'Pequeno Grupo' },
    { value: 'estudeiPouco', label: 'Estudei pouco a Bíblia' },
    { value: 'naoEstudei', label: 'Não estudei a Bíblia' },
    { value: 'outro', label: 'Outro' },
  ];

  const fatorDecisivoOptions = [
    { value: 'amigos', label: 'Amigos' },
    { value: 'conexaoPessoal', label: 'Conexão pessoal' },
    { value: 'desbravadores', label: 'Desbravadores/Avent' },
    { value: 'educacao', label: 'Educação Adventista' },
    { value: 'escolaSabatina', label: 'Escola Sabatina' },
    { value: 'evangelismoPublico', label: 'Evangelismo público' },
    { value: 'familia', label: 'Família/parentes' },
    { value: 'internet', label: 'Internet' },
    { value: 'missaoCalebe', label: 'Missão Calebe' },
    { value: 'pequenoGrupo', label: 'Pequeno Grupo' },
    { value: 'programaReencontro', label: 'Programa Reencontro' },
    { value: 'radio', label: 'Rádio' },
    { value: 'semanaOracao', label: 'Semana de Oração' },
    { value: 'tv', label: 'TV' },
    { value: 'outro', label: 'Outro' },
  ];

  return (
    <Card title="Informações Religiosas">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="instrutor1"
            label="Instrutor bíblico 1"
            value={formData.instrutor1}
            onChange={(e) => onChange('instrutor1', e.target.value)}
            error={errors.instrutor1}
          />
          
          <Input
            id="instrutor2"
            label="Instrutor bíblico 2"
            value={formData.instrutor2}
            onChange={(e) => onChange('instrutor2', e.target.value)}
            error={errors.instrutor2}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="estadoCivil"
            label="Estado civil"
            options={estadoCivilOptions}
            value={formData.estadoCivil}
            onChange={(e) => onChange('estadoCivil', e.target.value)}
            required
            error={errors.estadoCivil}
          />
          
          {formData.estadoCivil === 'casado' && (
            <DatePicker
              id="dataCasamento"
              label="Data casamento civil"
              value={formData.dataCasamento}
              onChange={(e) => onChange('dataCasamento', e.target.value)}
              error={errors.dataCasamento}
            />
          )}
        </div>
        
        <Input
          id="religiaoAnterior"
          label="Religião anterior"
          value={formData.religiaoAnterior}
          onChange={(e) => onChange('religiaoAnterior', e.target.value)}
          error={errors.religiaoAnterior}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              id="comoConheceu"
              label="Como você conheceu a IASD? (marque só uma opção)"
              options={comoConheceuOptions}
              value={formData.comoConheceu}
              onChange={(e) => onChange('comoConheceu', e.target.value)}
              required
              error={errors.comoConheceu}
            />
          </div>
          
          <div>
            <Select
              id="comoEstudou"
              label="Como você estudou a Bíblia? (marque só uma opção)"
              options={comoEstudouOptions}
              value={formData.comoEstudou}
              onChange={(e) => onChange('comoEstudou', e.target.value)}
              required
              error={errors.comoEstudou}
            />
          </div>
        </div>
        
        <Select
          id="fatorDecisivo"
          label="Qual foi o fator decisivo para você ser batizado/a? (marque só uma opção)"
          options={fatorDecisivoOptions}
          value={formData.fatorDecisivo}
          onChange={(e) => onChange('fatorDecisivo', e.target.value)}
          required
          error={errors.fatorDecisivo}
        />
      </div>
    </Card>
  );
};

export default InformacoesReligiosas;
