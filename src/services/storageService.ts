import { supabase } from '../lib/supabase';

export interface UploadResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Faz upload de uma imagem para o Supabase Storage
   */
  async uploadImage(file: File, folder: string = 'event-images'): Promise<UploadResult> {
    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      console.log('Fazendo upload da imagem:', { fileName, filePath, size: file.size });

      // Fazer upload do arquivo
      const { data, error } = await supabase.storage
        .from('event-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Erro no upload:', error);
        throw new Error(`Erro no upload: ${error.message}`);
      }

      console.log('Upload realizado com sucesso:', data);

      // Obter URL pública do arquivo
      const { data: urlData } = supabase.storage
        .from('event-assets')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Erro ao obter URL pública da imagem');
      }

      console.log('URL pública gerada:', urlData.publicUrl);

      return {
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Erro no serviço de upload:', error);
      throw error;
    }
  },

  /**
   * Remove uma imagem do Supabase Storage
   */
  async deleteImage(path: string): Promise<void> {
    try {
      console.log('Removendo imagem:', path);

      const { error } = await supabase.storage
        .from('event-assets')
        .remove([path]);

      if (error) {
        console.error('Erro ao remover imagem:', error);
        throw new Error(`Erro ao remover imagem: ${error.message}`);
      }

      console.log('Imagem removida com sucesso');
    } catch (error) {
      console.error('Erro no serviço de remoção:', error);
      throw error;
    }
  },

  /**
   * Valida se o arquivo é uma imagem válida
   */
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return {
        isValid: false,
        error: 'Por favor, selecione apenas arquivos de imagem (PNG, JPG, GIF, etc.)'
      };
    }

    // Verificar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'A imagem deve ter no máximo 5MB'
      };
    }

    // Verificar extensões permitidas
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: 'Formato de arquivo não suportado. Use: JPG, PNG, GIF ou WebP'
      };
    }

    return { isValid: true };
  },

  /**
   * Cria um preview local da imagem
   */
  createImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Erro ao criar preview da imagem'));
      };
      
      reader.readAsDataURL(file);
    });
  }
};