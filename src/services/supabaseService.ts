import { supabase } from '../lib/supabase';
import { Participant, EventData } from '../types';
import bcrypt from 'bcryptjs';

// Serviços para Participantes
export const participantService = {
  // Função de teste para verificar conexão
  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('count')
        .limit(1);
      
      console.log('Teste de conexão Supabase:', { data, error });
      return !error;
    } catch (error) {
      console.error('Erro no teste de conexão:', error);
      return false;
    }
  },

  async getAll(): Promise<Participant[]> {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar participantes:', error);
      throw error;
    }

    return data.map(participant => ({
      id: participant.id,
      nome: participant.nome,
      cpf: participant.cpf,
      email: participant.email,
      telefone: participant.telefone,
      dataNascimento: participant.data_nascimento || '',
      genero: participant.genero || '',
      cidade: participant.cidade,
      estado: participant.estado,
      tipoInscricao: participant.tipo_inscricao,
      statusPagamento: participant.status_pagamento,
      dataInscricao: participant.data_inscricao,
      confirmadoEvento: participant.confirmado_evento
    }));
  },

  async create(participant: Omit<Participant, 'id' | 'dataInscricao'>): Promise<Participant> {
    const { data, error } = await supabase
      .from('participants')
      .insert({
        nome: participant.nome,
        cpf: participant.cpf,
        email: participant.email,
        telefone: participant.telefone,
        data_nascimento: participant.dataNascimento || null,
        genero: participant.genero || null,
        cidade: participant.cidade,
        estado: participant.estado,
        tipo_inscricao: participant.tipoInscricao,
        status_pagamento: participant.statusPagamento,
        confirmado_evento: participant.confirmadoEvento
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar participante:', error);
      throw error;
    }

    return {
      id: data.id,
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      telefone: data.telefone,
      dataNascimento: data.data_nascimento || '',
      genero: data.genero || '',
      cidade: data.cidade,
      estado: data.estado,
      tipoInscricao: data.tipo_inscricao,
      statusPagamento: data.status_pagamento,
      dataInscricao: data.data_inscricao,
      confirmadoEvento: data.confirmado_evento
    };
  },

  async update(id: string, updates: Partial<Participant>): Promise<void> {
    console.log('Atualizando participante no Supabase:', { id, updates });
    
    const updateData: any = {};
    
    if (updates.nome !== undefined) updateData.nome = updates.nome;
    if (updates.cpf !== undefined) updateData.cpf = updates.cpf;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.telefone !== undefined) updateData.telefone = updates.telefone;
    if (updates.dataNascimento !== undefined) updateData.data_nascimento = updates.dataNascimento || null;
    if (updates.genero !== undefined) updateData.genero = updates.genero || null;
    if (updates.cidade !== undefined) updateData.cidade = updates.cidade;
    if (updates.estado !== undefined) updateData.estado = updates.estado;
    if (updates.tipoInscricao !== undefined) updateData.tipo_inscricao = updates.tipoInscricao;
    if (updates.statusPagamento !== undefined) updateData.status_pagamento = updates.statusPagamento;
    if (updates.confirmadoEvento !== undefined) updateData.confirmado_evento = updates.confirmadoEvento;

    console.log('Dados para atualização:', updateData);

    const { error } = await supabase
      .from('participants')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar participante:', error);
      throw error;
    } else {
      console.log('Participante atualizado com sucesso no Supabase');
    }
  },

  async delete(id: string): Promise<void> {
    console.log('Deletando participante do Supabase:', id);
    
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar participante:', error);
      throw error;
    } else {
      console.log('Participante deletado com sucesso do Supabase');
    }
  }
};

// Serviços para Configurações do Evento
export const eventService = {
  async get(): Promise<EventData> {
    console.log('Buscando configurações do evento no Supabase...');
    
    const { data, error } = await supabase
      .from('event_settings')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Erro ao buscar configurações do evento:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('Dados vazios, criando configuração padrão...');
      return await this.createDefault();
    }

    console.log('Configurações carregadas do banco:', data[0]);
    
    const eventSettings = data[0];
    return {
      id: eventSettings.id,
      nome: eventSettings.nome,
      data: eventSettings.data,
      local: eventSettings.local,
      horario: eventSettings.horario,
      descricao: eventSettings.descricao,
      descricaoParticipantes: eventSettings.descricao_participantes || "500+ Participantes",
      programacao: eventSettings.programacao || [],
      imagemUrl: eventSettings.imagem_url,
      contato: {
        email: eventSettings.contato_email || "contato@evento.com",
        telefone: eventSettings.contato_telefone || "(11) 9999-9999",
        endereco: eventSettings.contato_endereco || "Centro de Convenções Tech Hub"
      },
      redesSociais: {
        linkedin: eventSettings.linkedin_url || "",
        instagram: eventSettings.instagram_url || "",
        twitter: eventSettings.twitter_url || "",
        facebook: eventSettings.facebook_url || "",
        youtube: eventSettings.youtube_url || ""
      },
      inscricaoGratuita: {
        titulo: eventSettings.inscricao_gratuita_titulo,
        descricao: eventSettings.inscricao_gratuita_descricao,
        beneficios: eventSettings.inscricao_gratuita_beneficios || [],
        disponivel: eventSettings.inscricao_gratuita_disponivel
      },
      inscricaoPaga: {
        titulo: eventSettings.inscricao_paga_titulo,
        descricao: eventSettings.inscricao_paga_descricao,
        beneficios: eventSettings.inscricao_paga_beneficios || [],
        preco: parseFloat(eventSettings.inscricao_paga_preco),
        disponivel: eventSettings.inscricao_paga_disponivel
      },
      cores: {
        primaria: eventSettings.cor_primaria || 'purple',
        secundaria: eventSettings.cor_secundaria || 'blue',
        gratuita: eventSettings.cor_gratuita || 'purple',
        premium: eventSettings.cor_premium || 'orange',
        sucesso: eventSettings.cor_sucesso || 'green',
        erro: eventSettings.cor_erro || 'red',
        aviso: eventSettings.cor_aviso || 'yellow'
      }
    };
  },

  async createDefault(): Promise<EventData> {
    console.log('Criando configuração padrão do evento...');
    
    const defaultData = {
      nome: "Evento X - Transformação Digital 2025",
      data: "15 de Março de 2025",
      local: "Centro de Convenções Tech Hub",
      horario: "09:00 às 18:00",
      descricao: "O maior evento de tecnologia e inovação do ano! Junte-se a especialistas, empreendedores e líderes do setor para explorar as últimas tendências em transformação digital.",
      descricao_participantes: "500+ Participantes",
      programacao: [
        "09:00 - 10:00 | Credenciamento e Welcome Coffee",
        "10:00 - 11:30 | Palestra Principal: O Futuro da IA",
        "11:30 - 12:00 | Coffee Break",
        "12:00 - 13:30 | Mesa Redonda: Inovação no Brasil",
        "13:30 - 14:30 | Almoço",
        "14:30 - 16:00 | Workshops Práticos",
        "16:00 - 16:30 | Networking",
        "16:30 - 18:00 | Encerramento e Premiação"
      ],
      imagem_url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      contato_email: "contato@evento.com",
      contato_telefone: "(11) 9999-9999",
      contato_endereco: "Centro de Convenções Tech Hub",
      linkedin_url: "https://linkedin.com/company/evento-x",
      instagram_url: "https://instagram.com/evento_x",
      twitter_url: "https://twitter.com/evento_x",
      facebook_url: "https://facebook.com/evento.x",
      youtube_url: "https://youtube.com/@evento-x",
      inscricao_gratuita_titulo: "Inscrição Gratuita",
      inscricao_gratuita_descricao: "Acesso completo ao evento com todas as palestras e workshops.",
      inscricao_gratuita_beneficios: [
        "Acesso a todas as palestras",
        "Material digital",
        "Certificado de participação",
        "Coffee breaks"
      ],
      inscricao_gratuita_disponivel: true,
      inscricao_paga_titulo: "Inscrição Premium",
      inscricao_paga_descricao: "Todos os benefícios + exclusividades para uma experiência completa.",
      inscricao_paga_beneficios: [
        "Tudo da inscrição gratuita",
        "Almoço incluído",
        "Kit exclusivo do evento",
        "Acesso VIP ao networking",
        "Sessão de mentoria"
      ],
      inscricao_paga_preco: 97,
      inscricao_paga_disponivel: true,
      cor_primaria: 'purple',
      cor_secundaria: 'blue',
      cor_gratuita: 'purple',
      cor_premium: 'orange',
      cor_sucesso: 'green',
      cor_erro: 'red',
      cor_aviso: 'yellow'
    };

    const { data, error } = await supabase
      .from('event_settings')
      .insert(defaultData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar configuração padrão:', error);
      throw error;
    }

    console.log('Configuração padrão criada com sucesso');
    
    return {
      id: data.id,
      nome: data.nome,
      data: data.data,
      local: data.local,
      horario: data.horario,
      descricao: data.descricao,
      programacao: data.programacao || [],
      imagemUrl: data.imagem_url,
      contato: {
        email: data.contato_email || "contato@evento.com",
        telefone: data.contato_telefone || "(11) 9999-9999",
        endereco: data.contato_endereco || "Centro de Convenções Tech Hub"
      },
      redesSociais: {
        linkedin: data.linkedin_url || "",
        instagram: data.instagram_url || "",
        twitter: data.twitter_url || "",
        facebook: data.facebook_url || "",
        youtube: data.youtube_url || ""
      },
      inscricaoGratuita: {
        titulo: data.inscricao_gratuita_titulo,
        descricao: data.inscricao_gratuita_descricao,
        beneficios: data.inscricao_gratuita_beneficios || [],
        disponivel: data.inscricao_gratuita_disponivel
      },
      inscricaoPaga: {
        titulo: data.inscricao_paga_titulo,
        descricao: data.inscricao_paga_descricao,
        beneficios: data.inscricao_paga_beneficios || [],
        preco: parseFloat(data.inscricao_paga_preco),
        disponivel: data.inscricao_paga_disponivel
      },
      cores: {
        primaria: data.cor_primaria || 'purple',
        secundaria: data.cor_secundaria || 'blue',
        gratuita: data.cor_gratuita || 'purple',
        premium: data.cor_premium || 'orange',
        sucesso: data.cor_sucesso || 'green',
        erro: data.cor_erro || 'red',
        aviso: data.cor_aviso || 'yellow'
      }
    };
  },

  async update(eventData: EventData): Promise<EventData> {
    console.log('Atualizando configurações do evento:', eventData);
    
    const updateData = {
      nome: eventData.nome,
      data: eventData.data,
      local: eventData.local,
      horario: eventData.horario,
      descricao: eventData.descricao,
      descricao_participantes: eventData.descricaoParticipantes,
      programacao: eventData.programacao,
      imagem_url: eventData.imagemUrl,
      contato_email: eventData.contato.email,
      contato_telefone: eventData.contato.telefone,
      contato_endereco: eventData.contato.endereco,
      linkedin_url: eventData.redesSociais.linkedin,
      instagram_url: eventData.redesSociais.instagram,
      twitter_url: eventData.redesSociais.twitter,
      facebook_url: eventData.redesSociais.facebook,
      youtube_url: eventData.redesSociais.youtube,
      inscricao_gratuita_titulo: eventData.inscricaoGratuita.titulo,
      inscricao_gratuita_descricao: eventData.inscricaoGratuita.descricao,
      inscricao_gratuita_beneficios: eventData.inscricaoGratuita.beneficios,
      inscricao_gratuita_disponivel: eventData.inscricaoGratuita.disponivel,
      inscricao_paga_titulo: eventData.inscricaoPaga.titulo,
      inscricao_paga_descricao: eventData.inscricaoPaga.descricao,
      inscricao_paga_beneficios: eventData.inscricaoPaga.beneficios,
      inscricao_paga_preco: eventData.inscricaoPaga.preco,
      inscricao_paga_disponivel: eventData.inscricaoPaga.disponivel,
      cor_primaria: eventData.cores.primaria,
      cor_secundaria: eventData.cores.secundaria,
      cor_gratuita: eventData.cores.gratuita,
      cor_premium: eventData.cores.premium,
      cor_sucesso: eventData.cores.sucesso,
      cor_erro: eventData.cores.erro,
      cor_aviso: eventData.cores.aviso
    };

    console.log('Dados para salvar:', updateData);

    if (!eventData.id) {
      // Se não tem ID, criar novo registro
      console.log('Criando novo registro de configurações...');
      const { data, error } = await supabase
        .from('event_settings')
        .insert(updateData)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao criar configurações do evento:', error);
        throw error;
      }
      
      console.log('Configurações do evento criadas com sucesso:', data);
      
      return {
        id: data.id,
        nome: data.nome,
        data: data.data,
        local: data.local,
        horario: data.horario,
        descricao: data.descricao,
        descricaoParticipantes: data.descricao_participantes || "500+ Participantes",
        programacao: data.programacao || [],
        imagemUrl: data.imagem_url,
        contato: {
          email: data.contato_email || "contato@evento.com",
          telefone: data.contato_telefone || "(11) 9999-9999",
          endereco: data.contato_endereco || "Centro de Convenções Tech Hub"
        },
        redesSociais: {
          linkedin: data.linkedin_url || "",
          instagram: data.instagram_url || "",
          twitter: data.twitter_url || "",
          facebook: data.facebook_url || "",
          youtube: data.youtube_url || ""
        },
        inscricaoGratuita: {
          titulo: data.inscricao_gratuita_titulo,
          descricao: data.inscricao_gratuita_descricao,
          beneficios: data.inscricao_gratuita_beneficios || [],
          disponivel: data.inscricao_gratuita_disponivel
        },
        inscricaoPaga: {
          titulo: data.inscricao_paga_titulo,
          descricao: data.inscricao_paga_descricao,
          beneficios: data.inscricao_paga_beneficios || [],
          preco: parseFloat(data.inscricao_paga_preco),
          disponivel: data.inscricao_paga_disponivel
        },
        cores: {
          primaria: data.cor_primaria || 'purple',
          secundaria: data.cor_secundaria || 'blue',
          gratuita: data.cor_gratuita || 'purple',
          premium: data.cor_premium || 'orange',
          sucesso: data.cor_sucesso || 'green',
          erro: data.cor_erro || 'red',
          aviso: data.cor_aviso || 'yellow'
        }
      };
    } else {
      // Se tem ID, atualizar registro específico
      console.log('Atualizando registro existente com ID:', eventData.id);
      const { data, error } = await supabase
        .from('event_settings')
        .update(updateData)
        .eq('id', eventData.id)
        .select();

      if (error) {
        console.error('Erro ao atualizar configurações do evento:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        // Registro não encontrado, limpar tabela e criar novo
        console.log('Registro não encontrado, limpando tabela e criando novo...');
        
        // Primeiro, deletar todos os registros existentes
        await supabase.from('event_settings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Depois, inserir o novo registro
        const { data: newData, error: insertError } = await supabase
          .from('event_settings')
          .insert(updateData)
          .select();
        
        if (insertError) {
          console.error('Erro ao criar novo registro após limpeza:', insertError);
          throw insertError;
        }
        
        console.log('Novo registro criado após limpeza:', newData);
        
        return {
          id: newData[0].id,
          nome: newData[0].nome,
          data: newData[0].data,
          local: newData[0].local,
          horario: newData[0].horario,
          descricao: newData[0].descricao,
          programacao: newData[0].programacao || [],
          imagemUrl: newData[0].imagem_url,
          contato: {
            email: newData[0].contato_email || "contato@evento.com",
            telefone: newData[0].contato_telefone || "(11) 9999-9999",
            endereco: newData[0].contato_endereco || "Centro de Convenções Tech Hub"
          },
          redesSociais: {
            linkedin: newData[0].linkedin_url || "",
            instagram: newData[0].instagram_url || "",
            twitter: newData[0].twitter_url || "",
            facebook: newData[0].facebook_url || "",
            youtube: newData[0].youtube_url || ""
          },
          inscricaoGratuita: {
            titulo: newData[0].inscricao_gratuita_titulo,
            descricao: newData[0].inscricao_gratuita_descricao,
            beneficios: newData[0].inscricao_gratuita_beneficios || [],
            disponivel: newData[0].inscricao_gratuita_disponivel
          },
          inscricaoPaga: {
            titulo: newData[0].inscricao_paga_titulo,
            descricao: newData[0].inscricao_paga_descricao,
            beneficios: newData[0].inscricao_paga_beneficios || [],
            preco: parseFloat(newData[0].inscricao_paga_preco),
            disponivel: newData[0].inscricao_paga_disponivel
          }
        };
      }
      
      console.log('Configurações do evento atualizadas com sucesso:', data);
      
      return {
        id: data[0].id,
        nome: data[0].nome,
        data: data[0].data,
        local: data[0].local,
        horario: data[0].horario,
        descricao: data[0].descricao,
        descricaoParticipantes: data[0].descricao_participantes || "500+ Participantes",
        programacao: data[0].programacao || [],
        imagemUrl: data[0].imagem_url,
        contato: {
          email: data[0].contato_email || "contato@evento.com",
          telefone: data[0].contato_telefone || "(11) 9999-9999",
          endereco: data[0].contato_endereco || "Centro de Convenções Tech Hub"
        },
        redesSociais: {
          linkedin: data[0].linkedin_url || "",
          instagram: data[0].instagram_url || "",
          twitter: data[0].twitter_url || "",
          facebook: data[0].facebook_url || "",
          youtube: data[0].youtube_url || ""
        },
        inscricaoGratuita: {
          titulo: data[0].inscricao_gratuita_titulo,
          descricao: data[0].inscricao_gratuita_descricao,
          beneficios: data[0].inscricao_gratuita_beneficios || [],
          disponivel: data[0].inscricao_gratuita_disponivel
        },
        inscricaoPaga: {
          titulo: data[0].inscricao_paga_titulo,
          descricao: data[0].inscricao_paga_descricao,
          beneficios: data[0].inscricao_paga_beneficios || [],
          preco: parseFloat(data[0].inscricao_paga_preco),
          disponivel: data[0].inscricao_paga_disponivel
        },
        cores: {
          primaria: data[0].cor_primaria || 'purple',
          secundaria: data[0].cor_secundaria || 'blue',
          gratuita: data[0].cor_gratuita || 'purple',
          premium: data[0].cor_premium || 'orange',
          sucesso: data[0].cor_sucesso || 'green',
          erro: data[0].cor_erro || 'red',
          aviso: data[0].cor_aviso || 'yellow'
        }
      };
    }
  }
};

// Serviços para Autenticação de Admin
export const authService = {
  async checkIfFirstUser(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);

      if (error) {
        console.error('Erro ao verificar usuários:', error);
        return true; // Se houver erro, assumir que é o primeiro usuário
      }

      return !data || data.length === 0;
    } catch (error) {
      console.error('Erro ao verificar primeiro usuário:', error);
      return true;
    }
  },

  async createFirstUser(email: string, password: string): Promise<boolean> {
    try {
      console.log('Criando primeiro usuário admin:', email);
      
      // Verificar se realmente é o primeiro usuário
      const isFirst = await this.checkIfFirstUser();
      if (!isFirst) {
        console.log('Já existem usuários no sistema');
        return false;
      }

      // Gerar hash da senha
      const passwordHash = await bcrypt.hash(password, 12);
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          email: email,
          password_hash: passwordHash
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar primeiro usuário:', error);
        return false;
      }

      console.log('Primeiro usuário criado com sucesso:', data);
      return true;
    } catch (error) {
      console.error('Erro ao criar primeiro usuário:', error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<boolean> {
    try {
      console.log('Tentando login com:', email);
      
      // Verificar se é o primeiro usuário
      const isFirstUser = await this.checkIfFirstUser();
      
      if (isFirstUser) {
        console.log('Primeiro usuário detectado, criando conta...');
        const created = await this.createFirstUser(email, password);
        return created;
      }
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('email', email)
        .single();

      console.log('Resultado da consulta:', { data, error });

      if (error || !data) {
        console.log('Usuário não encontrado ou erro na consulta');
        return false;
      }

      console.log('Hash armazenado no banco:', data.password_hash);
      
      // Verificar senha usando bcrypt
      const isValid = await bcrypt.compare(password, data.password_hash);
      console.log('Senha válida:', isValid);
      
      return isValid;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  }
};