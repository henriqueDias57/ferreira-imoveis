'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, KeyRound, ArrowLeft, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Passo 1: Solicitar código
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao processar.');

      if (data.code) {
        setCode(data.code); // Preenche automaticamente o código gerado para praticidade
      }

      setSuccessMsg(data.message);
      setStep(2);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Passo 2: Redefinir senha com o código
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao redefinir.');

      setSuccessMsg('Senha alterada com sucesso! Redirecionando para a página de login...');
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brandRed-600/20 text-brandRed-500 flex items-center justify-center mx-auto border border-brandRed-600/30">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading">Recuperar Senha Admin</h1>
          <p className="text-xs text-slate-400">
            {step === 1
              ? 'Digite o e-mail do corretor/administrador cadastrado'
              : `Digite o código enviado e sua nova senha`}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-brandRed-900/20 border border-brandRed-600/30 p-3.5 rounded-xl text-brandRed-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="henrique.dias.ferreira321@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/30 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Gerar Código de Recuperação'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Código de Verificação (6 Dígitos)</label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: 123456"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold tracking-widest text-center focus:outline-none focus:border-brandRed-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nova Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="No mínimo 6 caracteres"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brandRed-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brandRed-600 hover:bg-brandRed-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brandRed-900/30 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar Nova Senha'}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition"
            >
              Voltar ao passo anterior
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-800 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Login Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
