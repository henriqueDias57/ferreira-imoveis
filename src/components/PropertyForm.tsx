'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, Upload, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PropertyFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
}

export default function PropertyForm({ mode, initialData }: PropertyFormProps) {
  const router = useRouter();

  const [code, setCode] = useState(initialData?.code || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [type, setType] = useState(initialData?.type || 'APARTAMENTO');
  const [purpose, setPurpose] = useState(initialData?.purpose || 'VENDA');
  const [price, setPrice] = useState(initialData?.price || '');
  const [condoFee, setCondoFee] = useState(initialData?.condoFee || '');
  const [iptu, setIptu] = useState(initialData?.iptu || '');
  const [city, setCity] = useState(initialData?.city || 'Cruzeiro');
  const [neighborhood, setNeighborhood] = useState(initialData?.neighborhood || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms || '0');
  const [suites, setSuites] = useState(initialData?.suites || '0');
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms || '0');
  const [parking, setParking] = useState(initialData?.parking || '0');
  const [area, setArea] = useState(initialData?.area || '0');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [active, setActive] = useState(initialData?.active !== false);

  const [photoUrls, setPhotoUrls] = useState<string[]>(
    initialData?.photos?.map((p: any) => p.url) || []
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro no upload.');

      setPhotoUrls((prev) => [...prev, ...data.urls]);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    const payload = {
      code,
      title,
      description,
      type,
      purpose,
      price,
      condoFee,
      iptu,
      city,
      neighborhood,
      address,
      bedrooms,
      suites,
      bathrooms,
      parking,
      area,
      featured,
      active,
      photoUrls,
    };

    try {
      const endpoint = mode === 'create' ? '/api/admin/properties' : `/api/admin/properties/${initialData.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar imóvel.');

      setSuccessMsg(mode === 'create' ? 'Imóvel criado com sucesso!' : 'Imóvel atualizado com sucesso!');
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1E293B] border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
      {errorMsg && (
        <div className="bg-brandRed-900/30 border border-brandRed-600/50 p-4 rounded-xl text-brandRed-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Código do Imóvel *</label>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: AP0105"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs uppercase focus:outline-none focus:border-brandRed-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Imóvel *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="APARTAMENTO">Apartamento</option>
            <option value="CASA">Casa</option>
            <option value="SOBRADO">Sobrado</option>
            <option value="COMERCIAL">Comercial / Ponto</option>
            <option value="CHACARA">Chácara</option>
            <option value="SITIO">Sítio</option>
            <option value="TERRENO">Terreno / Lote</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Finalidade *</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="VENDA">Venda</option>
            <option value="LOCACAO">Locação</option>
            <option value="TEMPORADA">Temporada (Ubatuba)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Título Anúncio *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Lindo Apartamento de 3 Dormitórios no Centro"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Preço (R$) *</label>
          <input
            type="number"
            required
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 480000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Condomínio (R$)</label>
          <input
            type="number"
            step="any"
            value={condoFee}
            onChange={(e) => setCondoFee(e.target.value)}
            placeholder="0"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">IPTU (R$)</label>
          <input
            type="number"
            step="any"
            value={iptu}
            onChange={(e) => setIptu(e.target.value)}
            placeholder="0"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade *</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          >
            <option value="Cruzeiro">Cruzeiro - SP</option>
            <option value="Ubatuba">Ubatuba - SP</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Bairro *</label>
          <input
            type="text"
            required
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Ex: Centro, Jardim América, Praia Grande..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Endereço Completo (opcional)</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Área (m²)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Quartos</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Suítes</label>
          <input
            type="number"
            value={suites}
            onChange={(e) => setSuites(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Banheiros</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">Vagas</label>
          <input
            type="number"
            value={parking}
            onChange={(e) => setParking(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Descrição Completa</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva as características do imóvel, acabamentos, localização, armários embutidos..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
        />
      </div>

      {/* Upload de Fotos */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300">Fotos do Imóvel</label>

        <div className="flex items-center gap-3">
          <label className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-brandRed-500 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-brandRed-500" />}
            Fazer Upload de Fotos
            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {photoUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {photoUrls.map((url, idx) => (
              <div key={idx} className="relative h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                <Image src={url} alt="Foto" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full text-white hover:bg-red-600 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 bg-brandRed-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Capa
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Switches de Status */}
      <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-brandRed-600 rounded"
          />
          Destacar este imóvel na Home
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded"
          />
          Imóvel Ativo (Visível ao público)
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-4 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/40 disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {mode === 'create' ? 'Salvar e Publicar Imóvel' : 'Atualizar Dados do Imóvel'}
      </button>
    </form>
  );
}
