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
];

const main = (dtoIn) => {
    const minAge = dtoIn.age.min;
    const maxAge = dtoIn.age.max;
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

    let dtoOut = [];
    let counter = dtoIn.count;

    while (counter > 0) {
        const isFemale = Math.random() < 0.5; // randomly assign gender
        const arrayLength = isFemale ? femaleNames.length : maleNames.length
        const randomIndex = Math.floor(Math.random() * arrayLength)
        const randomName = isFemale ? femaleNames[randomIndex] : maleNames[randomIndex]
        const randomSurname = isFemale ? femaleSurnames[randomIndex] : maleSurnames[randomIndex]

        dtoOut.push({
            gender: isFemale ? 'female' : 'male',
            birthdate: getRandomDate(minAge, maxAge),
            name: randomName,
            surname: randomSurname,
            workload: workload[Math.floor(Math.random() * workload.length)],
        });

        counter -= 1;
    }

    return dtoOut;
};

// here you enter your input
const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35,
    },
};

console.log(main(dtoIn))