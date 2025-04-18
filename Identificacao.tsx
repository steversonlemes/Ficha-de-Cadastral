import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Checkbox from './ui/Checkbox';
import DatePicker from './ui/DatePicker';

interface IdentificacaoProps {
  formData: {
    batismo: boolean;
    votoEspecial: boolean;
    rebatismo: boolean;
    profissaoFe: boolean;
    dataRemocao: string;
    motivoProfissaoFe: string;
    igrejaAnterior: string;
  };
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const Identificacao: React.FC<IdentificacaoProps> = ({
  formData,
  onChange,
  errors,
}) => {
  return (
    <Card title="Identificação">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            id="batismo"
            label="Batismo"
            checked={formData.batismo}
            onChange={(e) => onChange('batismo', e.target.checked)}
          />
          
          <Checkbox
            id="votoEspecial"
            label="Voto especial - Anexar a ficha de 'Pedido de Batismo por Voto Especial' aprovado pela Comissão Diretiva do Campo local"
            checked={formData.votoEspecial}
            onChange={(e) => onChange('votoEspecial', e.target.checked)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            id="rebatismo"
            label="Rebatismo - Foi consultado o igreja/grupo ou o pastor onde o/a candidato/a foi removido/a?"
            checked={formData.rebatismo}
            onChange={(e) => onChange('rebatismo', e.target.checked)}
          />
          
          {formData.rebatismo && (
            <DatePicker
              id="dataRemocao"
              label="Data da remoção"
              value={formData.dataRemocao}
              onChange={(e) => onChange('dataRemocao', e.target.value)}
              error={errors.dataRemocao}
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            id="profissaoFe"
            label="Profissão de fé"
            checked={formData.profissaoFe}
            onChange={(e) => onChange('profissaoFe', e.target.checked)}
          />
          
          {formData.profissaoFe && (
            <Input
              id="motivoProfissaoFe"
              label="Motivo"
              value={formData.motivoProfissaoFe}
              onChange={(e) => onChange('motivoProfissaoFe', e.target.value)}
              error={errors.motivoProfissaoFe}
            />
          )}
        </div>
        
        {(formData.rebatismo || formData.profissaoFe) && (
          <Input
            id="igrejaAnterior"
            label="Igreja/grupo e localidade onde foi membro"
            value={formData.igrejaAnterior}
            onChange={(e) => onChange('igrejaAnterior', e.target.value)}
            error={errors.igrejaAnterior}
          />
        )}
      </div>
    </Card>
  );
};

export default Identificacao;
