const mongoose=require("mongoose");

async function databaseConnection(){
    await mongoose.connect("mongodb+srv://sayali:w65FNYkyKLf3TeqP@nodejsapp.wmb16p3.mongodb.net/?appName=nodejsapp")
    .then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log(err);
});

}

// w65FNYkyKLf3TeqP
module.exports=databaseConnection;





