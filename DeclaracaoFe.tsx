import React from 'react';
import Card from './ui/Card';
import Checkbox from './ui/Checkbox';

interface DeclaracaoFeProps {
  formData: {
    pergunta1: boolean;
    pergunta2: boolean;
    pergunta3: boolean;
    pergunta4: boolean;
    pergunta5: boolean;
    pergunta6: boolean;
    pergunta7: boolean;
    pergunta8: boolean;
    pergunta9: boolean;
    pergunta10: boolean;
    pergunta11: boolean;
    pergunta12: boolean;
    pergunta13: boolean;
    aceitaTermos: boolean;
  };
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const DeclaracaoFe: React.FC<DeclaracaoFeProps> = ({
  formData,
  onChange,
  errors,
}) => {
  return (
    <Card title="Declaração de Fé">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 mb-4">
          Por favor, leia atentamente cada declaração e marque "Sim" se você concorda:
        </p>
        
        <div className="space-y-3">
          <Checkbox
            id="pergunta1"
            label="1. Aceita a Bíblia toda como a inspirada Palavra de Deus?"
            checked={formData.pergunta1}
            onChange={(e) => onChange('pergunta1', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta2"
            label="2. Aceita o ensino bíblico da Trindade de que Deus é uma unidade de três pessoas coeternas: Pai, Filho e Espírito Santo?"
            checked={formData.pergunta2}
            onChange={(e) => onChange('pergunta2', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta3"
            label="3. Aceita a morte de Jesus Cristo como o sacrifício que perdoa e apaga os pecados, e acredita que é salvo pela graça, mediante a fé?"
            checked={formData.pergunta3}
            onChange={(e) => onChange('pergunta3', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta4"
            label="4. Aceita Jesus Cristo como o seu único Salvador pessoal e o Senhor de sua vida?"
            checked={formData.pergunta4}
            onChange={(e) => onChange('pergunta4', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta5"
            label="5. Decide deixar os hábitos prejudiciais à saúde e ao corpo e à mente, evitando o consumo de alimentos impróprios e a ingestão e comercialização de bebidas alcoólicas, tabaco, café, drogas ilícitas, e outras substâncias que prejudicam o templo do Espírito Santo?"
            checked={formData.pergunta5}
            onChange={(e) => onChange('pergunta5', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta6"
            label="6. Aceita pôr em prática todas as crenças e princípios bíblicos fundamentais, incluindo a modéstia cristã no vestir-se, no uso de adornos e na aparência pessoal, abstendo-se de frequentar lugares impróprios, assim como ensina a Igreja Adventista do Sétimo Dia?"
            checked={formData.pergunta6}
            onChange={(e) => onChange('pergunta6', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta7"
            label="7. Aceita devolver fiel e voluntariamente o dízimo e a oferta, de acordo com o ensinamento bíblico?"
            checked={formData.pergunta7}
            onChange={(e) => onChange('pergunta7', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta8"
            label="8. Decide obedecer a todos os mandamentos de Deus, incluindo o do sábado?"
            checked={formData.pergunta8}
            onChange={(e) => onChange('pergunta8', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta9"
            label="9. Crê e aceita que a Igreja Adventista do Sétimo Dia é a igreja remanescente dos últimos dias de acordo com a profecia bíblica, e deseja ser aceito como membro da congregação local da Igreja Adventista mundial?"
            checked={formData.pergunta9}
            onChange={(e) => onChange('pergunta9', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta10"
            label="10. Aceita o ensinamento bíblico dos dons espirituais e crê que o dom de profecia manifesto no ministério de Ellen G. White é uma característica distintiva da Igreja remanescente?"
            checked={formData.pergunta10}
            onChange={(e) => onChange('pergunta10', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta11"
            label="11. Aceita o ensinamento bíblico do batismo por imersão e voluntariamente decide ser batizado/a?"
            checked={formData.pergunta11}
            onChange={(e) => onChange('pergunta11', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta12"
            label="12. Aceita que Jesus Cristo é o seu intercessor no Santuário Celestial e que Ele lhe concede Sua graça e Seu poder para viver uma vida centrada Nele?"
            checked={formData.pergunta12}
            onChange={(e) => onChange('pergunta12', e.target.checked)}
            className="font-medium"
          />
          
          <Checkbox
            id="pergunta13"
            label="13. Aceita preparar-se como Cristo o fez e ajudar a discipular pessoas para a breve volta do nosso Senhor Jesus Cristo, participando ativamente da pregação do evangelho?"
            checked={formData.pergunta13}
            onChange={(e) => onChange('pergunta13', e.target.checked)}
            className="font-medium"
          />
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <Checkbox
            id="aceitaTermos"
            label="CREIO E ACEITO AS CRENÇAS FUNDAMENTAIS, NORMAS E PRINCÍPIOS DA IGREJA ADVENTISTA DO SÉTIMO DIA, INCLUSIVE A DISCIPLINA ECLESIÁSTICA, EXPRESSOS NO 'MANUAL DA IGREJA', E DESEJO SER MEMBRO DESTA CONGREGAÇÃO LOCAL DA IGREJA ADVENTISTA MUNDIAL."
            checked={formData.aceitaTermos}
            onChange={(e) => onChange('aceitaTermos', e.target.checked)}
            className="font-medium"
          />
          
          {errors.aceitaTermos && (
            <p className="mt-1 text-sm text-red-600">{errors.aceitaTermos}</p>
          )}
          
          <p className="mt-4 text-sm text-gray-600">
            COM A MINHA ASSINATURA DOU CONSENTIMENTO EXPRESSO PARA QUE A IGREJA ADVENTISTA DO SÉTIMO DIA TRATE MEUS DADOS PESSOAIS DE ACORDO COM A LEI, ESPECIFICAMENTE NO CUMPRIMENTO DE SUAS FINALIDADES INSTITUCIONAIS. A POLÍTICA DE PRIVACIDADE ESTÁ PUBLICADA NO SITE: https://me.app/policy
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DeclaracaoFe;
