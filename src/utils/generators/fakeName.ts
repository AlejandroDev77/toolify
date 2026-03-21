// Fake Name Generator Logic
const FIRST_NAMES_MALE = [
  'Juan', 'Carlos', 'Miguel', 'José', 'Luis', 'Pedro', 'Antonio', 'Francisco',
  'Javier', 'Rafael', 'Daniel', 'David', 'Alejandro', 'Fernando', 'Ricardo',
  'Roberto', 'Manuel', 'Jorge', 'Sergio', 'Andrés', 'Diego', 'Pablo', 'Raúl',
  'Ángel', 'Víctor', 'Enrique', 'Alberto', 'Ramón', 'Eduardo', 'Arturo'
];

const FIRST_NAMES_FEMALE = [
  'María', 'Ana', 'Carmen', 'Laura', 'Isabel', 'Rosa', 'Patricia', 'Lucía',
  'Elena', 'Sofía', 'Marta', 'Paula', 'Andrea', 'Cristina', 'Sara', 'Beatriz',
  'Natalia', 'Claudia', 'Silvia', 'Raquel', 'Teresa', 'Pilar', 'Mónica',
  'Gabriela', 'Daniela', 'Valentina', 'Carolina', 'Adriana', 'Fernanda', 'Julia'
];

const LAST_NAMES = [
  'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández', 'Pérez',
  'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz',
  'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Chávez', 'Ruiz', 'Jiménez',
  'Mendoza', 'Castillo', 'Vargas', 'Romero', 'Herrera', 'Medina', 'Aguilar',
  'Castro', 'Vega', 'Ramos', 'Moreno', 'Guerrero', 'Mendez', 'Silva'
];

const DOMAINS = [
  'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com',
  'protonmail.com', 'mail.com', 'aol.com', 'zoho.com', 'tutanota.com'
];

export interface FakePerson {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhone(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const firstPart = Math.floor(Math.random() * 900) + 100;
  const secondPart = Math.floor(Math.random() * 9000) + 1000;
  return `+52 ${areaCode} ${firstPart} ${secondPart}`;
}

function generateUsername(firstName: string, lastName: string): string {
  const random = Math.floor(Math.random() * 9999);
  const options = [
    `${firstName.toLowerCase()}${random}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}${random}`,
    `${lastName.toLowerCase()}${firstName.toLowerCase()}`,
  ];
  return getRandomItem(options);
}

function generateEmail(firstName: string, lastName: string): string {
  const username = generateUsername(firstName, lastName);
  const domain = getRandomItem(DOMAINS);
  return `${username}@${domain}`;
}

export function generateFakePerson(gender?: 'male' | 'female'): FakePerson {
  const selectedGender = gender || (Math.random() > 0.5 ? 'male' : 'female');
  const firstName = selectedGender === 'male' 
    ? getRandomItem(FIRST_NAMES_MALE)
    : getRandomItem(FIRST_NAMES_FEMALE);
  const lastName = `${getRandomItem(LAST_NAMES)} ${getRandomItem(LAST_NAMES)}`;
  const fullName = `${firstName} ${lastName}`;
  const email = generateEmail(firstName, lastName.split(' ')[0]);
  const username = generateUsername(firstName, lastName.split(' ')[0]);
  const phone = generatePhone();
  const age = Math.floor(Math.random() * 60) + 18;

  return {
    firstName,
    lastName,
    fullName,
    email,
    username,
    phone,
    age,
    gender: selectedGender,
  };
}

export function generateMultipleFakePeople(count: number, gender?: 'male' | 'female'): FakePerson[] {
  return Array.from({ length: count }, () => generateFakePerson(gender));
}
