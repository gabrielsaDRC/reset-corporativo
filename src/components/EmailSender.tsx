import React, { useState } from 'react';
import { Mail, Send, Users, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { emailService } from '../services/emailService';

export const EmailSender: React.FC = () => {
  const { participants, eventData } = useApp();
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Filtrar apenas participantes confirmados
  const confirmedParticipants = participants.filter(p => p.confirmadoEvento);

  const handleSelectAll = () => {
    if (selectedParticipants.length === confirmedParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(confirmedParticipants.map(p => p.id));
    }
  };

  const handleSelectParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSendEmails = async () => {
    if (selectedParticipants.length === 0) {
      alert('Selecione pelo menos um participante para enviar o email.');
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      const participantsToEmail = confirmedParticipants.filter(p => 
        selectedParticipants.includes(p.id)
      );

      const result = await emailService.sendBulkEmails(
        participantsToEmail.map(p => ({
          email: p.email,
          nome: p.nome
        })), 
        {
          nome: eventData.nome,
          data: eventData.data,
          local: eventData.local,
          horario: eventData.horario
        }
      );

      setSendResult(result);
      setShowResult(true);
      
      if (result.success > 0) {
        setSelectedParticipants([]);
      }
    } catch (error) {
      console.error('Erro ao enviar emails:', error);
      alert('Erro ao enviar emails. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Enviar Emails de Confirmação
          </h3>
        </div>

        {/* Configuração do EmailJS */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h4 className="font-medium text-yellow-800">Sistema EmailJS Configurado</h4>
          </div>
          <p className="text-yellow-700 text-sm mb-3">
            O sistema EmailJS está configurado e pronto para uso:
          </p>
          <ul className="text-yellow-700 text-sm space-y-1 ml-4">
            <li>• Emails enviados via EmailJS</li>
            <li>• Service ID: resetcorporativoemailjs</li>
            <li>• Template personalizado já configurado</li>
            <li>• Delay de 2 segundos entre emails</li>
          </ul>
        </div>

        {/* Template do Email */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Template do Email:</h4>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
{`Olá {{nome}},

É com grande alegria que confirmamos a sua presença no RCO – Reset Corporativo, uma imersão transformadora que vai muito além dos negócios.

O evento foi idealizado por Caroline Kherlakian, referência em reestruturação empresarial, e trará uma abordagem única para quem busca evolução nas finanças, gestão e desenvolvimento emocional. Além da Caroline, você terá acesso a conteúdos exclusivos com convidados especiais, que compartilharão vivências e estratégias práticas para impulsionar sua jornada profissional e pessoal.

🗓️ Data do evento: {{data}}
📍 Local: {{local}}
⏰ Horário: {{horario}}

Prepare-se para viver um verdadeiro reset na forma de liderar, organizar e crescer com consistência.

Em breve, enviaremos mais detalhes. Qualquer dúvida, estamos à disposição.

Nos vemos em breve!

Atenciosamente,
Equipe Reset Corporativo`}
</pre>

          </div>
        </div>

        {/* Seleção de Participantes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800">
              Participantes Confirmados ({confirmedParticipants.length})
            </h4>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {selectedParticipants.length === confirmedParticipants.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </button>
          </div>

          {confirmedParticipants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum participante confirmado encontrado.</p>
              <p className="text-sm">Confirme participantes na lista para enviar emails.</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto border rounded-lg">
              {confirmedParticipants.map((participant) => (
                <label
                  key={participant.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(participant.id)}
                    onChange={() => handleSelectParticipant(participant.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{participant.nome}</p>
                    <p className="text-sm text-gray-600">{participant.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    participant.tipoInscricao === 'gratuita'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {participant.tipoInscricao === 'gratuita' ? 'Gratuita' : 'Premium'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Botão de Envio */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedParticipants.length > 0 && (
              <span>{selectedParticipants.length} participante(s) selecionado(s)</span>
            )}
          </div>
          <button
            onClick={handleSendEmails}
            disabled={selectedParticipants.length === 0 || isSending}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Emails
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resultado do Envio */}
      {showResult && sendResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Resultado do Envio</h3>
              <button
                onClick={() => setShowResult(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    {sendResult.success} emails enviados com sucesso
                  </span>
                </div>

                {sendResult.failed > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">
                      {sendResult.failed} emails falharam
                    </span>
                  </div>
                )}

                {sendResult.errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-2">Erros:</h4>
                    <div className="max-h-32 overflow-y-auto">
                      {sendResult.errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-600 mb-1">
                          • {error}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setShowResult(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};