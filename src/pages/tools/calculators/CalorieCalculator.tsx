import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { Activity, Flame } from 'lucide-react';
import { calculateCalories } from '../../../utils/calculators/calorie';

export default function CalorieCalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'>('moderate');
  const [result, setResult] = useState<ReturnType<typeof calculateCalories> | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return;
    
    const calorieResult = calculateCalories(w, h, a, gender, activityLevel, unit);
    setResult(calorieResult);
  };

  const activities = [
    { id: 'sedentary', label: t('common.sedentary'), desc: t('common.sedentaryDesc') },
    { id: 'light', label: t('common.light'), desc: t('common.lightDesc') },
    { id: 'moderate', label: t('common.moderate'), desc: t('common.moderateDesc') },
    { id: 'active', label: t('common.active'), desc: t('common.activeDesc') },
    { id: 'veryActive', label: t('common.veryActive'), desc: t('common.veryActiveDesc') },
  ] as const;

  return (
    <>
      <SEO
        title={t('tools.caloriecalculator.name')}
        description={t('tools.caloriecalculator.description')}
        keywords="calorie calculator, TDEE, BMR, calorías diarias"
      />
      <ToolLayout
        title={t('tools.caloriecalculator.name')}
        description={t('tools.caloriecalculator.description')}
        icon={Flame}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    unit === 'metric'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Métrico (kg, cm)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    unit === 'imperial'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Imperial (lb, in)
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    gender === 'male'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Hombre
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    gender === 'female'
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Mujer
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso {unit === 'metric' ? '(kg)' : '(lb)'}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? '70' : '154'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Altura {unit === 'metric' ? '(cm)' : '(in)'}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? '175' : '69'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('common.ageYears')}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nivel de Actividad
                </label>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => setActivityLevel(activity.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        activityLevel === activity.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-semibold">{activity.label}</div>
                      <div className={`text-sm ${activityLevel === activity.id ? 'text-blue-100' : 'text-gray-500'}`}>
                        {activity.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/30"
              >
                Calcular Calorías
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-2xl p-1 shadow-xl">
                  <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-6 text-center">
                    <Activity className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                    <div className="text-sm font-semibold text-gray-600 mb-2">BMR</div>
                    <div className="text-4xl font-black text-gray-900">{result.bmr}</div>
                    <div className="text-xs text-gray-500 mt-2">Calorías en reposo</div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl p-1 shadow-xl">
                  <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-6 text-center">
                    <Flame className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                    <div className="text-sm font-semibold text-gray-600 mb-2">TDEE</div>
                    <div className="text-4xl font-black text-gray-900">{result.tdee}</div>
                    <div className="text-xs text-gray-500 mt-2">Calorías diarias totales</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Objetivos de Calorías</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { label: 'Pérdida Extrema', value: result.goals.extremeLoss, color: 'bg-red-50 text-red-700 border-red-200' },
                    { label: 'Pérdida de Peso', value: result.goals.weightLoss, color: 'bg-orange-50 text-orange-700 border-orange-200' },
                    { label: 'Pérdida Leve', value: result.goals.mildLoss, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                    { label: 'Mantenimiento', value: result.goals.maintain, color: 'bg-green-50 text-green-700 border-green-200' },
                    { label: 'Ganancia Leve', value: result.goals.mildGain, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { label: 'Ganancia Muscular', value: result.goals.weightGain, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                  ].map((goal) => (
                    <div key={goal.label} className={`${goal.color} border rounded-xl p-4`}>
                      <div className="text-sm font-semibold mb-1">{goal.label}</div>
                      <div className="text-2xl font-black">{goal.value} cal/día</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
