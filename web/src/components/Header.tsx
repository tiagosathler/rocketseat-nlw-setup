import { Plus } from 'phosphor-react';

import logoImage from '../assets/logo.svg';

export default function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits log" />
      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 p-4 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500"></Plus>
        Novo hábito
      </button>
    </div>
  );
}
