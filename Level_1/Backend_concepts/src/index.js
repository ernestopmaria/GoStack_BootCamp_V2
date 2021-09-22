const express = require("express")
const {v4} = require("uuid")
const app = express()
app.use(express.json())

let projects =[]

app.get("/", (request, response )=>{    
    return response.json({projects})
});

app.post("/", (request, response )=>{  
    const { title} = request.body
    const project ={
       id:v4(),
        title
    }
    projects.push(project)

    return response.json(project)
});

app.delete("/:id", async (request, response )=>{    
    const {id} = request.params
    const projectExists =  await projects.find(i=>i.id===id)
    if(projectExists){  
        projects=projects.filter(p=>p.id!==id);
         return response.status(200).json(projectExists)
    }  
    
    return response.status(401).json({message:"project not found"})
});

app.put("/:id", (request, response )=>{  
    const {id} = request.params
    const { title} = request.body
    const project ={
       id,
        title
    }    
    const newProject =projects.findIndex(i =>i.id===id)
    if(newProject>=0){
        projects[newProject] = project

        return response.json(project)
    }
    return response.status(401).json({message:"project not found"})
 
});

app.listen(3333, ()=>{
    console.log("Server is running ✔")
})