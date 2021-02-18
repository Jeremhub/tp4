
function GetAllTask()
{
    
    var parent = document.getElementById("Liste");
    var url="http://localhost:5000/todo";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";
    xhr.onload = function() {
        var result = xhr.response;
        parent.innerHTML = '';
        for(var i = 0; i < result.length; i++)
        {
            var p = document.createElement("p")
            p.innerHTML += "Id:" + result[i][0] + "<br/>";
            p.innerHTML += "Titre:" + result[i][1] + "<br/>";
            p.innerHTML += "Description:" + result[i][2] + "<br/>";
            p.innerHTML += "Deadline:" + result[i][3] + "<br/>";
            if (result[i][4] > 0)
            {
                p.innerHTML += "Statuts: Fait" + "<br/>";
            }
            else
            {
                p.innerHTML += "Statuts: A faire" + "<br/>";
            }
            p.innerHTML += "<hr/>";
            parent.append(p);
        }
    }
    xhr.send(null);
}

function GetTask()
{
    var taskid = document.getElementById("taskid").value;
    var url ="http://localhost:5000/task/" + taskid;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";
    xhr.onload = function() {
        var result = xhr.response;
        document.getElementById("tasktitle").value = result[0][1];
        document.getElementById("taskdesc").value = result[0][2];
        document.getElementById("taskdeadline").value = result[0][3];
        if (result[0][4] > 0)
        {
            document.getElementById("fait").checked = true;
        }
        else
        {
            document.getElementById("pasfait").checked = true;
        }
    }
    xhr.send(null);
}

function DeleteTask()
{
    var taskid = document.getElementById("taskid").value;
    var url ="http://localhost:5000/task/" + taskid;
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.responseType = "json";
    xhr.onload = function() {
        alert("Tâche supprimée!");
        GetAllTask();
    }
    xhr.send(null);
}

function CreateTask()
{
    var title = document.getElementById("tasktitle").value
    var description = document.getElementById("taskdesc").value
    var deadline = document.getElementById("taskdeadline").value
    if (document.getElementById("fait").checked)
    {
    var done = 1
    }
    else
    {
        var done = 0
    }
    var url="http://localhost:5000/todo";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"title": title, "description": description, "deadline": deadline, "done": done}));
    alert("La tâche est crée.")
    GetAllTask();
}

function UpdateTask()
{
    var title = document.getElementById("tasktitle").value
    var description = document.getElementById("taskdesc").value
    var deadline = document.getElementById("taskdeadline").value
    if (document.getElementById("fait").checked)
    {
    var done = 1
    }
    else
    {
        var done = 0
    }
    var taskid = document.getElementById("taskid").value;
    var url ="http://localhost:5000/task/" + taskid;
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"title": title, "description": description, "deadline": deadline, "done": done}));
    alert("La tâche est modifié.")
    GetAllTask();
}