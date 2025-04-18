import React from 'react';
import Card from './ui/Card';
import PhotoUploader from './ui/PhotoUploader';

interface FotosProps {
  formData: {
    fotos: File[];
  };
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

const Fotos: React.FC<FotosProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const handlePhotosChange = (photos: File[]) => {
    onChange('fotos', photos);
  };

  return (
    <Card title="Fotos">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 mb-4">
          Por favor, adicione até 5 fotos. Você pode tirar fotos com a câmera do dispositivo ou fazer upload de arquivos existentes.
        </p>
        
        <PhotoUploader
          id="fotos"
          label="Fotos (máximo 5)"
          maxPhotos={5}
          onPhotosChange={handlePhotosChange}
          error={errors.fotos}
        />
        
        {formData.fotos && formData.fotos.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Fotos selecionadas:</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from(formData.fotos).map((foto, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(foto)}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => {
                      const newFotos = [...formData.fotos];
                      newFotos.splice(index, 1);
                      onChange('fotos', newFotos);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Fotos;
