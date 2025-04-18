import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface EmailSenderProps {
  formData: any;
  pdfBlob?: Blob;
}

const EmailSender: React.FC<EmailSenderProps> = ({
  formData,
  pdfBlob,
}) => {
  const [email, setEmail] = useState(formData.email || '');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = async () => {
    if (!email) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!pdfBlob) {
      setError('Por favor, gere o PDF antes de enviar por e-mail.');
      return;
    }

    setSending(true);
    setError('');
    
    try {
      // Simulação de envio de e-mail
      // Em um ambiente real, você usaria um serviço como EmailJS ou uma API de backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setSending(false);
    } catch (err) {
      setError('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.');
      setSending(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Enviar PDF por E-mail</h3>
      
      <div className="flex items-start space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o endereço de e-mail"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <button
          onClick={sendEmail}
          disabled={sending || !pdfBlob}
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            sending || !pdfBlob
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {success && (
        <p className="mt-2 text-sm text-green-600">
          E-mail enviado com sucesso para {email}!
        </p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        O PDF será enviado como anexo para o endereço de e-mail informado.
      </p>
    </div>
  );
};

export default EmailSender;
