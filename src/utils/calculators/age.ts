// Age Calculator Logic
export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthday: {
    date: Date;
    daysUntil: number;
  };
}

export function calculateAge(birthDate: Date): AgeResult {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days
  const timeDiff = today.getTime() - birth.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Calculate total months
  const totalMonths = years * 12 + months;

  // Calculate next birthday
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    nextBirthday: {
      date: nextBirthday,
      daysUntil: daysUntilBirthday,
    },
  };
}
