import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { User, Users, RefreshCw, Copy, Check } from 'lucide-react';
import { generateMultipleFakePeople, type FakePerson } from '../../../utils/generators/fakeName';

export default function FakeName() {
  const { t } = useTranslation();
  const [people, setPeople] = useState<FakePerson[]>([]);
  const [count, setCount] = useState(1);
  const [gender, setGender] = useState<'male' | 'female' | 'random'>('random');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = () => {
    const selectedGender = gender === 'random' ? undefined : gender;
    const newPeople = generateMultipleFakePeople(count, selectedGender);
    setPeople(newPeople);
    setCopiedField(null);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <SEO
        title={t('tools.fakename.name')}
        description={t('tools.fakename.description')}
        keywords="fake name generator, random name, nombre falso, generador de identidad"
      />
      <ToolLayout
        title={t('tools.fakename.name')}
        description={t('tools.fakename.description')}
        icon={User}
      >
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Género
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' },
                    { value: 'random', label: 'Aleatorio' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setGender(option.value as any)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        gender === option.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('common.quantity')}: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {count > 1 ? t('common.generateIdentities') : t('common.generateIdentity')}
              </button>
            </div>
          </div>

          {people.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  {people.length} Identidad{people.length > 1 ? 'es' : ''} Generada{people.length > 1 ? 's' : ''}
                </h3>
              </div>

              {people.map((person, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      person.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                    }`}>
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{person.fullName}</div>
                      <div className="text-sm text-gray-500">{person.age} {t('common.yearsOld')}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Nombre', value: person.firstName, field: `firstName-${index}` },
                      { label: 'Apellidos', value: person.lastName, field: `lastName-${index}` },
                      { label: 'Email', value: person.email, field: `email-${index}` },
                      { label: t('common.username'), value: person.username, field: `username-${index}` },
                      { label: t('common.phone'), value: person.phone, field: `phone-${index}` },
                      { label: t('common.age'), value: `${person.age} ${t('common.yearsOld')}`, field: `age-${index}` },
                    ].map((item) => (
                      <div key={item.field} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">{item.label}</div>
                          <div className="text-sm font-medium text-gray-900">{item.value}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(item.value, item.field)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {copiedField === item.field ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
