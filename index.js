const fs = require("fs");
const http = require("http");
const axios = require("axios");
const url = require('url');

let clientes="";
let proveedores="";

const createRowC = (item) =>`
<tr>
<td>${item.idCliente}</td>
<td>${item.NombreCompania}</td>
<td>${item.NombreContacto}</td>
</tr>
`;

const createRowP = (item) =>`   
<tr>
<td>${item.idproveedor}</td>
<td>${item.nombrecompania}</td>
<td>${item.nombrecontacto}</td>
</tr>
`;


    const URLProveedores= "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
    const URLClientes= "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
    axios.get(URLProveedores).then(response=> axios.get(URLClientes).then(response1=>{
        clientes = response1.data;
        proveedores = response.data;

    let readFile=(callback)=>{

        fs.readFile("cliente.html", (err,data)=>{
            let pageContent = data.toString();
            //const rows = clientes.map(createRow);
            let r="";
            clientes.forEach(cl => {
                r += createRowC(cl);
            });
            pageContent = pageContent.replace("{{replace}}", r);
            callback(pageContent);
            
        });
    
    };

    let readFile1=(callback)=>{

        fs.readFile("proveedor.html", (err,data)=>{
            let pageContent = data.toString();
            //const rows = clientes.map(createRow);
            let r="";
            proveedores.forEach(cl => {
                r += createRowP(cl);
            });
            pageContent = pageContent.replace("{{replace}}", r);
            callback(pageContent);
            
        });
    
    };

    
        http.createServer((req, res) =>{
            let p = url.parse(req.url, true);
            if(p.pathname==="/api/clientes"){
            readFile((data)=>{
                res.writeHead(200, { "Content-Type": "text/html"});
                //console.log(data.toString() )
                res.end(data.toString());
            })
        }
        else if(p.pathname==="/api/proveedores"){
            readFile1((data)=>{
                res.writeHead(200, { "Content-Type": "text/html"});
                //console.log(data.toString() )
                res.end(data.toString());
            })
        }
        else{
                res.writeHead(404,{'Content-Type': 'text/html'});   
                return res.end("404 not found");
        }
        
        }).listen(8081);



}));


  