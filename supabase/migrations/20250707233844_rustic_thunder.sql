/*
  # Inserir configurações padrão do evento

  1. Verificações
    - Verifica se já existe alguma configuração
    - Insere configurações padrão apenas se não existir nenhuma

  2. Configurações Padrão
    - Nome, data, local e horário do evento
    - Descrição e programação completa
    - Configurações de inscrição gratuita e paga
    - URL da imagem padrão
*/

-- Inserir configurações padrão apenas se não existir nenhuma
INSERT INTO event_settings (
  nome,
  data,
  local,
  horario,
  descricao,
  programacao,
  imagem_url,
  inscricao_gratuita_titulo,
  inscricao_gratuita_descricao,
  inscricao_gratuita_beneficios,
  inscricao_gratuita_disponivel,
  inscricao_paga_titulo,
  inscricao_paga_descricao,
  inscricao_paga_beneficios,
  inscricao_paga_preco,
  inscricao_paga_disponivel
)
SELECT 
  'Evento X - Transformação Digital 2025',
  '15 de Março de 2025',
  'Centro de Convenções Tech Hub',
  '09:00 às 18:00',
  'O maior evento de tecnologia e inovação do ano! Junte-se a especialistas, empreendedores e líderes do setor para explorar as últimas tendências em transformação digital.',
  ARRAY[
    '09:00 - 10:00 | Credenciamento e Welcome Coffee',
    '10:00 - 11:30 | Palestra Principal: O Futuro da IA',
    '11:30 - 12:00 | Coffee Break',
    '12:00 - 13:30 | Mesa Redonda: Inovação no Brasil',
    '13:30 - 14:30 | Almoço',
    '14:30 - 16:00 | Workshops Práticos',
    '16:00 - 16:30 | Networking',
    '16:30 - 18:00 | Encerramento e Premiação'
  ],
  'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Inscrição Gratuita',
  'Acesso completo ao evento com todas as palestras e workshops.',
  ARRAY[
    'Acesso a todas as palestras',
    'Material digital',
    'Certificado de participação',
    'Coffee breaks'
  ],
  true,
  'Inscrição Premium',
  'Todos os benefícios + exclusividades para uma experiência completa.',
  ARRAY[
    'Tudo da inscrição gratuita',
    'Almoço incluído',
    'Kit exclusivo do evento',
    'Acesso VIP ao networking',
    'Sessão de mentoria'
  ],
  97.00,
  true
WHERE NOT EXISTS (SELECT 1 FROM event_settings LIMIT 1);