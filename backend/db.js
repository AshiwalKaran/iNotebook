const mongoose=require('mongoose');
const server='127.0.0.1:27017';
const database='practiceInotebook';


const connectToMongo=async()=>{
    try {
        mongoose.set('strictQuery',false); //To remove DeprecationWarning. 
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('Mongodb connected');
    } catch (error) {
        console.log('Failed to connect to database');
    }
}


module.exports=connectToMongo;