const operacion = (num1, num2, func) => func(num1, num2)

const suma = (n1,n2) => n1+n2
const resta = (n1,n2) => n1-n2
const multiplicacion = (n1,n2) => n1*n2
const division = (n1,n2) => n1%n2

console.log(operacion(2,5,resta))