import express,{Request,Response, NextFunction} from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"

interface Books{
    id:number;
    pages:number;
    title:string;
    image:string;
    author:string;
    genre:string;
    year:number;
    publisher:string;
    description:string;
    price:number;
}

//configure the dotenv 
dotenv.config()

//instance of express
const app = express()

//load the variables
const port = process.env.PORT 
console.log(port) //3000


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

app.use(express.json());

//get the current  directory 
const _dirname = path.resolve()



//synchronously read the file
const booksData = readFileSync(
    path.join(_dirname, "src", "db", "booksData.json"), "utf-8"
)
const Book:Books[] =JSON.parse(booksData)


//a simple get request saying hello world  
app.get('/', (req, res) => {

    res.send(`Hello World, Be humble to us`)
})

app.get('/api/books', (req, res) => {

    res.send(booksData)
})

app.get('/api/booksFilter',(req:Request ,res:Response) =>{
    try {
        const {genre}=req.query
        let filteredBooks =[...Book]

        //filtering logic

        if(genre ){
            filteredBooks=Book.filter(book =>
                book.genre.toLowerCase() ===
                (genre as string).toLowerCase()
            )
           
        }
        res.json(filteredBooks);
        
    } catch (error) {
        res.status(500).json({message:"Error fetching books"})
    } 
})

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 