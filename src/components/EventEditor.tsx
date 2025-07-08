import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit3, Calendar, MapPin, Clock, Users, FileText, Image, Gift, CreditCard, DollarSign, ToggleLeft, ToggleRight, Upload, X, Loader2, Mail, Phone, Linkedin, Instagram, Twitter, Facebook, Youtube, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { SuccessAlert } from './SuccessAlert';
import { ColorPicker } from './ColorPicker';

export const EventEditor: React.FC = () => {
  const { eventData, updateEventData } = useApp();
  const [formData, setFormData] = useState(eventData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newProgramItem, setNewProgramItem] = useState('');
  const [newGratuitaBenefit, setNewGratuitaBenefit] = useState('');
  const [newPagaBenefit, setNewPagaBenefit] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [alertState, setAlertState] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Sincronizar formData quando eventData mudar
  React.useEffect(() => {
    setFormData(eventData);
  }, [eventData]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      let finalImageUrl = formData.imagemUrl;
      
      // Se há uma nova imagem para upload
      if (imageFile) {
        setUploadingImage(true);
        setUploadError('');
        
        try {
          const uploadResult = await storageService.uploadImage(imageFile, 'event-images');
          finalImageUrl = uploadResult.url;
          console.log('Imagem enviada com sucesso:', finalImageUrl);
        } catch (error) {
          console.error('Erro no upload da imagem:', error);
          setUploadError(error instanceof Error ? error.message : 'Erro no upload da imagem');
          return; // Não continuar se o upload falhar
        }
      }
      
      // Atualizar dados do evento
      await updateEventData({ ...formData, imagemUrl: finalImageUrl });
      
      setIsEditing(false);
      setImageFile(null);
      setImagePreview('');
      setUploadError('');
      
      // Mostrar feedback de sucesso
      setAlertState({
        isVisible: true,
        message: 'Todas as configurações foram salvas com sucesso!',
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setAlertState({
        isVisible: true,
        message: 'Erro ao salvar alterações. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
      setUploadingImage(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadError('');
      
      // Validar arquivo
      const validation = storageService.validateImageFile(file);
      if (!validation.isValid) {
        setUploadError(validation.error || 'Arquivo inválido');
        return;
      }
      
      setImageFile(file);
      
      try {
        const preview = await storageService.createImagePreview(file);
        setImagePreview(preview);
      } catch (error) {
        console.error('Erro ao criar preview:', error);
        setUploadError('Erro ao criar preview da imagem');
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setUploadError('');
  };

  const handleCancel = () => {
    setFormData(eventData);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview('');
    setUploadError('');
  };

  const addProgramItem = () => {
    if (newProgramItem.trim()) {
      setFormData(prev => ({
        ...prev,
        programacao: [...prev.programacao, newProgramItem.trim()]
      }));
      setNewProgramItem('');
    }
  };

  const removeProgramItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      programacao: prev.programacao.filter((_, i) => i !== index)
    }));
  };

  const updateProgramItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      programacao: prev.programacao.map((item, i) => i === index ? value : item)
    }));
  };

  const addGratuitaBenefit = () => {
    if (newGratuitaBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        inscricaoGratuita: {
          ...prev.inscricaoGratuita,
          beneficios: [...prev.inscricaoGratuita.beneficios, newGratuitaBenefit.trim()]
        }
      }));
      setNewGratuitaBenefit('');
    }
  };

  const removeGratuitaBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inscricaoGratuita: {
        ...prev.inscricaoGratuita,
        beneficios: prev.inscricaoGratuita.beneficios.filter((_, i) => i !== index)
      }
    }));
  };

  const updateGratuitaBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      inscricaoGratuita: {
        ...prev.inscricaoGratuita,
        beneficios: prev.inscricaoGratuita.beneficios.map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addPagaBenefit = () => {
    if (newPagaBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        inscricaoPaga: {
          ...prev.inscricaoPaga,
          beneficios: [...prev.inscricaoPaga.beneficios, newPagaBenefit.trim()]
        }
      }));
      setNewPagaBenefit('');
    }
  };

  const removePagaBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      inscricaoPaga: {
        ...prev.inscricaoPaga,
        beneficios: prev.inscricaoPaga.beneficios.filter((_, i) => i !== index)
      }
    }));
  };

  const updatePagaBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      inscricaoPaga: {
        ...prev.inscricaoPaga,
        beneficios: prev.inscricaoPaga.beneficios.map((item, i) => i === index ? value : item)
      }
    }));
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Configurações do Evento
        </h1>
        <p className="text-gray-600">
          Edite as informações e configurações do evento
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
              {isEditing ? 'Editando Configurações' : 'Visualizar Configurações'}
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {uploadingImage ? 'Enviando imagem...' : 'Salvando...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Evento
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data do Evento
                </label>
                <input
                  type="text"
                  value={formData.data}
                  onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local
                </label>
                <input
                  type="text"
                  value={formData.local}
                  onChange={(e) => setFormData(prev => ({ ...prev, local: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="text"
                  value={formData.horario}
                  onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição de Participantes
              </label>
              <input
                type="text"
                value={formData.descricaoParticipantes}
                onChange={(e) => setFormData(prev => ({ ...prev, descricaoParticipantes: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Ex: 500+ Participantes"
              />
              <p className="text-sm text-gray-500 mt-1">
                Este texto aparece na seção "Sobre o Evento" junto com outras informações
              </p>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Imagem do Evento */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-purple-600" />
              Imagem do Evento
            </h3>
            
            {isEditing ? (
              <div className="space-y-4">
                {/* Upload de Arquivo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload de Imagem
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Clique para selecionar ou arraste uma imagem
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF até 5MB
                      </p>
                    </label>
                  </div>
                  
                  {uploadError && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{uploadError}</p>
                    </div>
                  )}
                </div>

                {/* Preview da Nova Imagem */}
                {imagePreview && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview da Nova Imagem
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* URL Manual (alternativa) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ou insira URL da imagem
                  </label>
                  <input
                    type="url"
                    value={formData.imagemUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imagemUrl: e.target.value }))}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={formData.imagemUrl}
                  alt="Imagem do evento"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
                <p className="text-sm text-gray-500 mt-2">URL: {formData.imagemUrl}</p>
              </div>
            )}
          </div>

          {/* Programação */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Programação
            </h3>
            
            <div className="space-y-3">
              {formData.programacao.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateProgramItem(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeProgramItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">
                      {item}
                    </div>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newProgramItem}
                    onChange={(e) => setNewProgramItem(e.target.value)}
                    placeholder="Adicionar novo item da programação"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addProgramItem()}
                  />
                  <button
                    onClick={addProgramItem}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-600" />
              Informações de Contato
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail de Contato
                </label>
                <input
                  type="email"
                  value={formData.contato.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contato: { ...prev.contato, email: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="contato@evento.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.contato.telefone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contato: { ...prev.contato, telefone: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="(11) 9999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.contato.endereco}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contato: { ...prev.contato, endereco: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Endereço do evento"
                />
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Redes Sociais
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.redesSociais.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    redesSociais: { ...prev.redesSociais, linkedin: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://linkedin.com/company/evento"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.redesSociais.instagram}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    redesSociais: { ...prev.redesSociais, instagram: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://instagram.com/evento"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.redesSociais.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    redesSociais: { ...prev.redesSociais, twitter: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://twitter.com/evento"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-700" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.redesSociais.facebook}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    redesSociais: { ...prev.redesSociais, facebook: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://facebook.com/evento"
                />
              </div>
              
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube
                </label>
                <input
                  type="url"
                  value={formData.redesSociais.youtube}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    redesSociais: { ...prev.redesSociais, youtube: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://youtube.com/@evento"
                />
              </div>
            </div>
            
            {!isEditing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Dica:</strong> Deixe em branco os campos das redes sociais que não deseja exibir no footer.
                </p>
                <p className="text-sm text-gray-500">
                  As redes sociais configuradas aparecerão como ícones redondos no footer da página.
                </p>
              </div>
            )}
          </div>

          {/* Configurações de Cores */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              Personalização de Cores
            </h3>
            
            {!isEditing && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>💡 Dica:</strong> Personalize as cores do seu evento para combinar com sua marca. 
                  As cores serão aplicadas automaticamente em todo o site.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ColorPicker
                label="Cor Primária (Header e elementos principais)"
                value={formData.cores.primaria}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, primaria: color }
                }))}
                disabled={!isEditing}
              />
              
              <ColorPicker
                label="Cor Secundária (Gradientes e destaques)"
                value={formData.cores.secundaria}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, secundaria: color }
                }))}
                disabled={!isEditing}
              />
              
              <ColorPicker
                label="Cor da Inscrição Gratuita"
                value={formData.cores.gratuita}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, gratuita: color }
                }))}
                disabled={!isEditing}
              />
              
              <ColorPicker
                label="Cor da Inscrição Premium"
                value={formData.cores.premium}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, premium: color }
                }))}
                disabled={!isEditing}
              />
              
              <ColorPicker
                label="Cor de Sucesso (Mensagens positivas)"
                value={formData.cores.sucesso}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, sucesso: color }
                }))}
                disabled={!isEditing}
              />
              
              <ColorPicker
                label="Cor de Erro (Mensagens de erro)"
                value={formData.cores.erro}
                onChange={(color) => setFormData(prev => ({
                  ...prev,
                  cores: { ...prev.cores, erro: color }
                }))}
                disabled={!isEditing}
              />
            </div>
            
            {isEditing && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>⚠️ Importante:</strong> As mudanças de cor serão aplicadas imediatamente após salvar. 
                  Certifique-se de escolher cores que tenham boa legibilidade e contraste.
                </p>
              </div>
            )}
          </div>

          {/* Inscrição Gratuita */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              Inscrição Gratuita
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.inscricaoGratuita.titulo}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inscricaoGratuita: { ...prev.inscricaoGratuita, titulo: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Disponível
                </label>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    inscricaoGratuita: { ...prev.inscricaoGratuita, disponivel: !prev.inscricaoGratuita.disponivel }
                  }))}
                  disabled={!isEditing}
                  className={`p-1 rounded transition-colors ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {formData.inscricaoGratuita.disponivel ? (
                    <ToggleRight className="w-8 h-8 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.inscricaoGratuita.descricao}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  inscricaoGratuita: { ...prev.inscricaoGratuita, descricao: e.target.value }
                }))}
                disabled={!isEditing}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              <div className="space-y-2">
                {formData.inscricaoGratuita.beneficios.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateGratuitaBenefit(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeGratuitaBenefit(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">
                        • {benefit}
                      </div>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newGratuitaBenefit}
                      onChange={(e) => setNewGratuitaBenefit(e.target.value)}
                      placeholder="Adicionar novo benefício"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addGratuitaBenefit()}
                    />
                    <button
                      onClick={addGratuitaBenefit}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inscrição Paga */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Inscrição Premium
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.inscricaoPaga.titulo}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inscricaoPaga: { ...prev.inscricaoPaga, titulo: e.target.value }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.inscricaoPaga.preco}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inscricaoPaga: { ...prev.inscricaoPaga, preco: parseFloat(e.target.value) || 0 }
                  }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Disponível
                </label>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    inscricaoPaga: { ...prev.inscricaoPaga, disponivel: !prev.inscricaoPaga.disponivel }
                  }))}
                  disabled={!isEditing}
                  className={`p-1 rounded transition-colors ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {formData.inscricaoPaga.disponivel ? (
                    <ToggleRight className="w-8 h-8 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.inscricaoPaga.descricao}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  inscricaoPaga: { ...prev.inscricaoPaga, descricao: e.target.value }
                }))}
                disabled={!isEditing}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              <div className="space-y-2">
                {formData.inscricaoPaga.beneficios.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updatePagaBenefit(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removePagaBenefit(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">
                        • {benefit}
                      </div>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newPagaBenefit}
                      onChange={(e) => setNewPagaBenefit(e.target.value)}
                      placeholder="Adicionar novo benefício"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addPagaBenefit()}
                    />
                    <button
                      onClick={addPagaBenefit}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert de Sucesso/Erro */}
      <SuccessAlert
        isVisible={alertState.isVisible}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};