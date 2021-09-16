const express = require("express")

const app = express()
app.use(express.json())

const projects =[]

app.get("/", (request, response )=>{    
    return response.json({projects})
});

app.post("/", (request, response )=>{  
    const { id, title} = request.body
    const project ={
       id,
        title
    }
    projects.push(project)

    return response.json(project)
});

app.delete("/", async (request, response )=>{    
    const {id} = request.headers
    const projectExists = await projects.find(i =>i.id===id)
    if(!projectExists){
        return response.send("Project not found")
    }

     projects.splice(projectExists, 1)
    return response.json("Projecto deletado")
});

app.put("/", (request, response )=>{    
    return response.json({titulo:"Ja não nesta fase2"})
});

app.listen(3333, ()=>{
    console.log("Server is running ✔")
})