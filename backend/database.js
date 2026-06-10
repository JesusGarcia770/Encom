import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Andryck:Drixx2024@cluster0.rizw0kw.mongodb.net/?appName=Cluster0")

//Comprobar que todo funciona 

//Creo na constante que es igual a la conexion 
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected")
})

connection.on("disconnected", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) => {
    console.log(`Error found ${error}`)
})