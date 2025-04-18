import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import Tabs from './ui/Tabs';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">{title}</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Etapa {currentStep} de {totalSteps}
          </p>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={currentStep === 1}
          >
            Anterior
          </Button>
          
          {isLastStep ? (
            <Button 
              type="submit"
              onClick={onSubmit}
            >
              Finalizar
            </Button>
          ) : (
            <Button 
              onClick={onNext}
            >
              Próximo
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FormLayout;
