const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Please enter a decimal number, that you would like to convert: ', (answer) => {
    //here is my solution of convering from decimal to binary using a function convertToBinary
    //here I followed the same structure as in the Algoritmn I presented in the first assignment 
    const convertToBinary = (decimalNum) => {
        let binaryNum = "";
        while (decimalNum > 0) {
            let remainder = decimalNum % 2;
            let binaryDigit = remainder;
            binaryNum = binaryDigit + binaryNum;
            decimalNum = Math.floor(decimalNum / 2);
        }
        return binaryNum;
    }
    console.log(`1st convertor: `);
    console.log(`The number ${answer} is ${convertToBinary(answer)} in binary.`);
    console.log(`2nd convertor: `);

    //here I achived the same results with much shorter code 
    //it tranfers the number from decimal to different bases

    const input = Number(answer);
    console.log(`The number ${input} is already a decimal number.`)
    console.log(`The number ${input} is represented as ${input.toString(2)} in binary.`)//does the same as the very first code (decimal => binary)
    console.log(`The number ${input} is represented as ${input.toString(8)} in octal.`)
    console.log(`The number ${input} is represented as ${input.toString(16)} in hexadecimal.`)
    rl.close();
});
