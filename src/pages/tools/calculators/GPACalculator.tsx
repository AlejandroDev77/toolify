import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import ToolLayout from '../../ToolLayout';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { calculateGPA, type Course } from '../../../utils/calculators/gpa';

export default function GPACalculator() {
  const { t } = useTranslation();
  const [scale, setScale] = useState<'4.0' | '100'>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { grade: 0, credits: 3 },
  ]);
  const [result, setResult] = useState<ReturnType<typeof calculateGPA> | null>(null);

  const handleCalculate = () => {
    const validCourses = courses.filter(c => c.grade > 0 && c.credits > 0);
    if (validCourses.length === 0) return;
    
    const gpaResult = calculateGPA(validCourses, scale);
    setResult(gpaResult);
  };

  const addCourse = () => {
    setCourses([...courses, { grade: 0, credits: 3 }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: 'grade' | 'credits', value: number) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  return (
    <>
      <SEO
        title={t('tools.gpacalculator.name')}
        description={t('tools.gpacalculator.description')}
        keywords="GPA calculator, grade point average, promedio académico"
      />
      <ToolLayout
        title={t('tools.gpacalculator.name')}
        description={t('tools.gpacalculator.description')}
        icon={GraduationCap}
      >
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setScale('4.0')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  scale === '4.0'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Escala 4.0
              </button>
              <button
                onClick={() => setScale('100')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  scale === '100'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Escala 100
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {courses.map((course, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1">
                    <input
                      type="number"
                      step={scale === '4.0' ? '0.1' : '1'}
                      max={scale === '4.0' ? '4' : '100'}
                      value={course.grade || ''}
                      onChange={(e) => updateCourse(index, 'grade', parseFloat(e.target.value) || 0)}
                      placeholder={scale === '4.0' ? 'Nota (0-4.0)' : 'Nota (0-100)'}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(index, 'credits', parseFloat(e.target.value) || 0)}
                      placeholder="Créditos"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeCourse(index)}
                    disabled={courses.length === 1}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addCourse}
              className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Plus className="w-5 h-5" />
              Agregar Curso
            </button>

            <button
              onClick={handleCalculate}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Calcular GPA
            </button>
          </div>

          {result && result.gpa > 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white/95 backdrop-blur-md rounded-[1.4rem] p-8 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                  <div className="text-sm font-semibold text-gray-600 mb-2">Tu GPA</div>
                  <div className="text-6xl font-black text-gray-900 mb-2">{result.gpa}</div>
                  <div className="text-3xl font-bold text-purple-600 mb-6">{result.letterGrade}</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Créditos Totales</div>
                      <div className="text-3xl font-black text-gray-900">{result.totalCredits}</div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Puntos de Calidad</div>
                      <div className="text-3xl font-black text-gray-900">{result.qualityPoints}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Escala de Calificaciones</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { letter: 'A', range: '3.7-4.0', color: 'bg-green-50 text-green-700 border-green-200' },
                    { letter: 'B', range: '2.7-3.6', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { letter: 'C', range: '1.7-2.6', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                    { letter: 'D', range: '1.0-1.6', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                    { letter: 'F', range: '< 1.0', color: 'bg-red-50 text-red-700 border-red-200' },
                  ].map((grade) => (
                    <div key={grade.letter} className={`${grade.color} border rounded-xl p-3 text-center`}>
                      <div className="text-2xl font-black mb-1">{grade.letter}</div>
                      <div className="text-xs font-semibold">{grade.range}</div>
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
