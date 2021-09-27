const express = require("express")
const {v4} = require("uuid")
const app = express()
app.use(express.json())

let projects =[]



app.get("/projects", (request, response )=>{    
    const {title}= request.query

    const results = title ? projects.filter(p=>p.title.includes(title)) : projects
    return response.json(results)
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
    const projectIndex =  projects.findIndex(i=>i.id===id)
    if(projectIndex <0){  
       
        return response.status(401).json({message:"project not found"})
    }  
    
    projects.splice(projectIndex, 1)
    return response.status(204).send()
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