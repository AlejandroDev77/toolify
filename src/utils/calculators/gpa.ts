// GPA Calculator Logic
export interface Course {
  grade: number; // 0-100 or 0-4 scale
  credits: number;
}

export interface GPAResult {
  gpa: number;
  totalCredits: number;
  letterGrade: string;
  qualityPoints: number;
}

export function calculateGPA(courses: Course[], scale: '4.0' | '100' = '4.0'): GPAResult {
  if (courses.length === 0) {
    return { gpa: 0, totalCredits: 0, letterGrade: 'N/A', qualityPoints: 0 };
  }

  let totalQualityPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    let gradePoint = course.grade;
    
    // Convert 100 scale to 4.0 scale if needed
    if (scale === '100') {
      if (course.grade >= 93) gradePoint = 4.0;
      else if (course.grade >= 90) gradePoint = 3.7;
      else if (course.grade >= 87) gradePoint = 3.3;
      else if (course.grade >= 83) gradePoint = 3.0;
      else if (course.grade >= 80) gradePoint = 2.7;
      else if (course.grade >= 77) gradePoint = 2.3;
      else if (course.grade >= 73) gradePoint = 2.0;
      else if (course.grade >= 70) gradePoint = 1.7;
      else if (course.grade >= 67) gradePoint = 1.3;
      else if (course.grade >= 65) gradePoint = 1.0;
      else gradePoint = 0.0;
    }

    totalQualityPoints += gradePoint * course.credits;
    totalCredits += course.credits;
  });

  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
  
  let letterGrade = 'F';
  if (gpa >= 3.7) letterGrade = 'A';
  else if (gpa >= 3.3) letterGrade = 'A-';
  else if (gpa >= 3.0) letterGrade = 'B+';
  else if (gpa >= 2.7) letterGrade = 'B';
  else if (gpa >= 2.3) letterGrade = 'B-';
  else if (gpa >= 2.0) letterGrade = 'C+';
  else if (gpa >= 1.7) letterGrade = 'C';
  else if (gpa >= 1.0) letterGrade = 'D';

  return {
    gpa: Math.round(gpa * 100) / 100,
    totalCredits,
    letterGrade,
    qualityPoints: Math.round(totalQualityPoints * 100) / 100,
  };
}
