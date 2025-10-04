import React from 'react';
import { BookOpen, CreditCard as Edit } from 'lucide-react';
import { marked } from 'marked';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Rule } from '../types';
import { officialRegulation } from '../data/regulationData';

interface RulesPageProps {
  isAdmin: boolean;
}

const RulesPage: React.FC<RulesPageProps> = ({ isAdmin }) => {
  const [rules, setRules] = useLocalStorage<Rule[]>('tournament-rules', officialRegulation);
  const [editingRule, setEditingRule] = React.useState<Rule | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSaveRule = (updatedRule: Rule) => {
    setRules(rules.map(rule => 
      rule.id === updatedRule.id ? updatedRule : rule
    ));
    setIsEditing(false);
    setEditingRule(null);
  };

  const RuleEditor: React.FC<{ rule: Rule; onSave: (rule: Rule) => void; onCancel: () => void }> = ({
    rule,
    onSave,
    onCancel
  }) => {
    const [title, setTitle] = React.useState(rule.title);
    const [content, setContent] = React.useState(rule.content);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...rule, title, content });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Titolo
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contenuto
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Salva
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
          >
            Annulla
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-yellow-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-yellow-500 p-3 rounded-xl shadow-lg">
              <BookOpen size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Regolamento Ufficiale</h1>
          </div>
          <p className="text-slate-200 text-lg">
            Le regole che garantiscono il fair play e il divertimento per tutti
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {rules
          .sort((a, b) => a.order - b.order)
          .map((rule, index) => (
            <div key={rule.id} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              {editingRule?.id === rule.id && isEditing ? (
                <RuleEditor
                  rule={rule}
                  onSave={handleSaveRule}
                  onCancel={() => {
                    setIsEditing(false);
                    setEditingRule(null);
                  }}
                />
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {rule.title}
                        </h2>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          setEditingRule(rule);
                          setIsEditing(true);
                        }}
                        className="p-2 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Modifica regola"
                      >
                        <Edit size={20} />
                      </button>
                    )}
                  </div>
                  <div className="prose prose-slate max-w-none pl-16">
                    <div 
                      className="text-slate-700 leading-relaxed text-base"
                      dangerouslySetInnerHTML={{ __html: marked(rule.content) }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="bg-yellow-400 text-white p-3 rounded-xl flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-900 mb-2">
              Importante
            </h3>
            <p className="text-yellow-800 leading-relaxed">
              Il rispetto del regolamento è fondamentale per il buon andamento del torneo.
              Comportamenti antisportivi possono portare a sanzioni o squalifiche.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;