class Client{
    constructor(nombre,apellido,libros,mascotas){
        this.name = nombre,
        this.surname = apellido,
        this.books=libros,
        this.pets = mascotas
    }

    getFullName(){
        return `Su nombre compelto es ${this.surname}, ${this.name}`
    }

    addMascotas(pet){
        this.pets.push(pet)
    }
    
    countMascotas(){
        return `Tiene ${this.pets.length} mascota/s`
    }

    
    addLibros(libro){
        this.books.push(libro)
    }
    
    getBookNames(){
        return this.books.map((book)=>{
           return book.title
        })
    }
    getBooks(){
        return this.books
    }
}

let client1 = new Client("Jorge","Sardón",[{isbn:943344,title:"Libro 1"}],["Loro","Conejo"]);

client1.addMascotas("Gato")
client1.addLibros({
    isbn:11111,
    title:"Libro 2"
})


console.log(client1.getFullName())
console.log(client1.getBookNames())
console.log(client1.countMascotas())

function operacion(num1,num2,func){

}