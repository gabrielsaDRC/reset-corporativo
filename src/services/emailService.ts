import emailjs from '@emailjs/browser';

// Configurações do EmailJS
const EMAILJS_CONFIG = {
  publicKey: 'I8ZqtjVm1OdOJBtTz',
  serviceId: 'resetcorporativoemailjs',
  templateId: 'template_d38dnlm'
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export interface EmailData {
  to_email: string;
  to_name: string;
  event_data: {
    nome: string;
    data: string;
    local: string;
    horario: string;
  };
}

export const emailService = {
  // Enviar email individual usando EmailJS
  async sendConfirmationEmail(emailData: EmailData): Promise<boolean> {
    try {
      console.log('Enviando email para:', emailData.to_email);
      
      // Parâmetros para o template do EmailJS
      const templateParams = {
        nome: emailData.to_name,
        email: emailData.to_email,
        data: emailData.event_data.data,
        local: emailData.event_data.local,
        horario: emailData.event_data.horario
      };

      console.log('Parâmetros do template:', templateParams);

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('Email enviado com sucesso:', response);
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return false;
    }
  },

  // Enviar emails em lote
  async sendBulkEmails(participants: Array<{
    email: string;
    nome: string;
  }>, eventData: {
    nome: string;
    data: string;
    local: string;
    horario: string;
  }): Promise<{
    success: number;
    failed: number;
    errors: string[];
  }> {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const participant of participants) {
      try {
        const emailData: EmailData = {
          to_email: participant.email,
          to_name: participant.nome,
          event_data: eventData
        };

        const sent = await this.sendConfirmationEmail(emailData);
        
        if (sent) {
          success++;
          console.log(`Email enviado para ${participant.nome}`);
        } else {
          failed++;
          errors.push(`Falha ao enviar para ${participant.nome} (${participant.email})`);
        }

        // Delay entre emails para evitar sobrecarga (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        failed++;
        errors.push(`Erro para ${participant.nome}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    }

    return { success, failed, errors };
  }
};