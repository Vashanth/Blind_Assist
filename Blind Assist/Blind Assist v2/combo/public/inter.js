const parse = (str) => {
    let num="";
    for(let i=0;i<str.length;i++)
    if(str[i] === '=')
    num='='
    else if(num.length>0)
    {
        if(num[0] === '=')
        num=str[i]
        else 
        num+=str[i]
    }
    return parseInt(num)
}

const setNumClasses = () => {
    let str = window.location.search
    const num = parse(str)
    const renderer = document.getElementById("renderClasses")
    let parentDiv,child1,child2,h1,input,br
    for(let i=0;i<num;i++)
    {
        br = document.createElement("br")
        parentDiv = document.createElement("div")
        parentDiv.className = "row"
        child1 = document.createElement("div")
        child2 = document.createElement("div")
        child1.className = "col-6"
        child2.className = "col-6"
        h1 = document.createElement("h1")
        h1.textContent = "Class "+ (i+1)
        input = document.createElement("input")
        input.setAttribute("type", "text");
        input.required = true
        input.id = "class"+(i+1)
        child1.appendChild(h1)
        child2.appendChild(input)
        parentDiv.appendChild(child1)
        parentDiv.appendChild(child2)
        renderer.appendChild(parentDiv)
        renderer.appendChild(br)
    }
}

const completeAndRedirect = () => {
    let ar = []
    let str = window.location.search
    const num = parse(str)
    for(let i=1;i<=num;i++)
    {
        ar.push(document.getElementById("class"+i).value)
    }
    localStorage.setItem("classes", JSON.stringify(ar))
}