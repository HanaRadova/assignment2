const gender = ["male", "female"];
const workload = [10, 20, 30, 40, 50];

const maleNames = [
    "Adam",
    "Aleš",
    "Daniel",
    "David",
    "Filip",
    "Jan",
    "Jiří",
    "Lukáš",
    "Martin",
    "Matěj",
    "Michal",
    "Pavel",
    "Petr",
    "Tomáš",
    "Václav",
    "Viktor",
    "Vojtěch",
    "Zdeněk",
    "Zbyněk",
    "Zdeněk",
    "Zdislav",
    "Zoltán",
    "Zbyněk",
    "Zvěstislav",
];

const femaleNames = [
    "Adéla",
    "Alena",
    "Barbora",
    "Denisa",
    "Eva",
    "Hana",
    "Jana",
    "Kateřina",
    "Lucie",
    "Markéta",
    "Michaela",
    "Nikola",
    "Pavla",
    "Petra",
    "Simona",
    "Šárka",
    "Tereza",
    "Veronika",
    "Vlasta",
    "Zdeňka",
    "Zdenka",
    "Zdislava",
    "Zita",
    "Zora",
];

const maleSurnames = [
    "Novák",
    "Svoboda",
    "Novotný",
    "Dvořák",
    "Černý",
    "Procházka",
    "Kučera",
    "Veselý",
    "Horák",
    "Pavlík",
    "Hájek",
    "Němec",
    "Malý",
    "Král",
    "Fiala",
    "Kolář",
    "Růžička",
    "Bartoš",
    "Kopecký",
    "Krejčí",
    "Šťastný",
    "Pospíšil",
    "Urban",
    "Kamizolka",
];

const femaleSurnames = [
    "Nováková",
    "Svobodová",
    "Novotná",
    "Dvořáková",
    "Černá",
    "Procházková",
    "Kučerová",
    "Veselá",
    "Horáková",
    "Pavlíková",
    "Hájková",
    "Němcová",
    "Malá",
    "Králová",
    "Fialová",
    "Kolářová",
    "Růžičková",
    "Bartošová",
    "Kopecká",
    "Krejčí",
    "Šťastná",
    "Pospíšilová",
    "Urbanová",
    "Kamizolková",
];

const getRandomDate = (minAge, maxAge) => {
    const now = new Date();
    const minDate = new Date(
        now.getFullYear() - maxAge - 1,
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
    );
    const maxDate = new Date(
        now.getFullYear() - minAge,
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
    );
    const randomDate =
        minDate.getTime() +
        Math.random() * (maxDate.getTime() - minDate.getTime());
    let date = new Date(randomDate);
    date = new Date(date.toDateString());
    date = date.toISOString();
    return date;
};

function getEmployeeAge(employee) {
    const birthday = new Date(employee.birthdate)
    const today = new Date()
    let employeeAge = today.getFullYear() - birthday.getFullYear()
    const monthDiff = today.getMonth() - birthday.getMonth()
    const dayDiff = today.getDate() - birthday.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        employeeAge--
    }

    return employeeAge
}

function calculateAverageAge(employees) {
    const totalAge = employees.reduce((sum, e) => sum + getEmployeeAge(e), 0);
    return parseFloat((totalAge / employees.length).toFixed(1));
}

function findMinMaxAge(employees) {
    const ages = employees.map(e => getEmployeeAge(e));
    return {
        min: Math.min(...ages),
        max: Math.max(...ages)
    };
}

function calculateMedian(values) {
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

function calculateAverageWorkloadForWomen(employees) {
    const women = employees.filter(e => e.gender === 'female');
    const totalWorkload = women.reduce((sum, w) => sum + w.workload, 0);
    return women.length ? totalWorkload / women.length : 0;
}

function sortEmployeesByWorkload(employees) {
    return employees.slice().sort((a, b) => a.workload - b.workload);
}

function generateEmployeeData(dtoIn) {
    let employees = [];
    let counter = dtoIn.count;

    while (counter > 0) {
        const isFemale = Math.random() < 0.5; // randomly assign gender
        const arrayLength = isFemale ? femaleNames.length : maleNames.length;
        const randomIndex = Math.floor(Math.random() * arrayLength);
        const randomName = isFemale ? femaleNames[randomIndex] : maleNames[randomIndex];
        const randomSurname = isFemale ? femaleSurnames[randomIndex] : maleSurnames[randomIndex];

        const employee = {
            gender: isFemale ? 'female' : 'male',
            birthdate: getRandomDate(dtoIn.age.min, dtoIn.age.max),
            name: randomName,
            surname: randomSurname,
            workload: workload[Math.floor(Math.random() * workload.length)],
        };

        employees.push(employee);
        counter--

    }
    return employees
}


function getEmployeeStatistics(employees) {
    const totalNumberOfEmployees = dtoIn.count;
    const workloadCounts = {
        workload10: 0,
        workload20: 0,
        workload30: 0,
        workload40: 0,
    };


    employees.forEach(employee => {
        switch (employee.workload) {
            case 10:
                workloadCounts.workload10++;
                break;
            case 20:
                workloadCounts.workload20++;
                break;
            case 30:
                workloadCounts.workload30++;
                break;
            case 40:
                workloadCounts.workload40++;
                break;
            default:
                break;
        }
    })

    const { min, max } = findMinMaxAge(employees)

    // Add workload counts to the output
    const employeeStatistics = {
        total: totalNumberOfEmployees,
        ...workloadCounts,
        averageAge: calculateAverageAge(employees),
        minAge: min,
        maxAge: max,
        medianAge: calculateMedian(employees.map(employee => getEmployeeAge(employee))),
        medianWorkload: calculateMedian(employees.map(employee => employee.workload)),
        averageWomenWorkload: calculateAverageWorkloadForWomen(employees),
        sortedByWorkload: sortEmployeesByWorkload(employees)
    }



    return employeeStatistics;
}

function main(dtoIn) {
    const employees = generateEmployeeData(dtoIn)
    const employeeStatistics = getEmployeeStatistics(employees)

    return employeeStatistics
}


const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35,
    },
};

const dtoOut = main(dtoIn);
console.log(dtoOut);
