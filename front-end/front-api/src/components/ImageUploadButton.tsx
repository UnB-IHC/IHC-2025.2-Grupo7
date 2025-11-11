// components/ImageUploadButton.tsx
"use client";

import { useState, useRef } from "react";
import { IoImageOutline, IoClose, IoLink } from "react-icons/io5";

interface ImageUploadButtonProps {
  onImageSelect: (file: File | null) => void;
  onModeChange: (mode: 'url' | 'image') => void;
  currentMode: 'url' | 'image';
}

export default function ImageUploadButton({ 
  onImageSelect, 
  onModeChange, 
  currentMode 
}: ImageUploadButtonProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (currentMode === 'url') {
      onModeChange('image');
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onImageSelect(file);
      onModeChange('image');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    onImageSelect(null);
    onModeChange('url');
    
    // Reset do input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSwitchToUrl = () => {
    handleRemoveImage();
    onModeChange('url');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Botão Principal - Alterna entre modos */}
      <div className="flex gap-2">
        {currentMode === 'image' && (
          <button
            type="button"
            onClick={handleSwitchToUrl}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            title="Usar URL em vez de imagem"
          >
            <IoLink className="h-5 w-5" />
            <span className="text-sm font-medium">Usar URL</span>
          </button>
        )}
        
        <button
          type="button"
          onClick={handleButtonClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
            currentMode === 'image' 
              ? 'bg-green-600 hover:bg-green-500 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
          title={currentMode === 'image' ? "Alterar imagem" : "Usar imagem em vez de URL"}
        >
          <IoImageOutline className="h-5 w-5" />
          <span className="text-sm font-medium">
            {currentMode === 'image' ? 'Alterar Imagem' : 'Usar Imagem'}
          </span>
        </button>
      </div>

      {/* Preview da Imagem */}
      {previewUrl && (
        <div className="bg-gray-800 rounded-lg shadow-xl p-2 border border-white/20">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-400 transition-colors cursor-pointer"
              title="Remover imagem"
            >
              <IoClose className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-green-400 mt-2 text-center">
            ✓ Imagem selecionada
          </p>
        </div>
      )}

      {/* Input File Hidden */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}