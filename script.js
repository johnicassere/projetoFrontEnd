const lista = document.getElementById("lista");
const apiUrl = "http://localhost:3000/albuns";

let titulo = document.getElementById("titulo");
let artista = document.getElementById("artista");
let imagem = document.getElementById("capa");
let genero = document.getElementById("genero");
let nota = document.getElementById("nota");

let edicao = false;
let idEdicao = 0;

//GET
const getAlbuns = async () => {
  const response = await fetch(apiUrl);
  const albuns = await response.json();
console.log(albuns);
  albuns.map((album) => {
      if(album.assistido === false){
    lista.insertAdjacentHTML(
      "beforeend",
      `
        <div class="col">
            <div class="card">
             <img src="${album.imagem}" class="card-img-top" alt="..."> 
                <div class="card-body">
                <h5 class="card-title">${album.titulo} - ${album.artista}</h5>
                <span class="badge bg-primary">${album.genero}</span>
                <p class="card-text"> &#9733;${album.nota}</p>
                <p>Selecione uma Opção:</p>
<div>
  <input onchange="assistido('${album.id}')" type="radio" id="huey" name="${album.id}" value="huey">
  <label for="huey">Reproduzido</label>
</div>

<div>
  <input onchange="naoAssistido('${album.id}')" type="radio" id="dewey" name="${album.id}" value="dewey"
  checked>
  <label for="dewey">Nao Reproduzido</label>
</div>
                
                  <div>
                     <button class="btn btn-primary" onclick="editAlbum('${album.id}')">Editar</button>
                     <button class="btn btn-danger" onclick="deleteAlbum('${album.id}')">Excluir</button>
                 </div>
               </div>
            </div>
        </div>
        `
    );
      }else{
        lista.insertAdjacentHTML(
            "beforeend",
            `
              <div class="col">
                  <div class="card">
                   <img src="${album.imagem}" class="card-img-top" alt="..."> 
                      <div class="card-body">
                      <h5 class="card-title">${album.titulo} - ${album.artista}</h5>
                      <span class="badge bg-primary">${album.genero}</span>
                      <p class="card-text"> &#9733;${album.nota}</p>
                      <p>Selecione uma Opção:</p>
      <div>
        <input onchange="assistido('${album.id}')" type="radio" id="huey" name="${album.id}" value="huey"
               checked>
        <label for="huey">Reproduzido</label>
      </div>
      
      <div>
        <input onchange="naoAssistido('${album.id}')" type="radio" id="dewey" name="${album.id}" value="dewey">
        <label for="dewey">Nao Reproduzido</label>
      </div>
                      
                        <div>
                           <button class="btn btn-primary" onclick="editAlbum('${album.id}')">Editar</button>
                           <button class="btn btn-danger" onclick="deleteAlbum('${album.id}')">Excluir</button>
                       </div>
                     </div>
                  </div>
              </div>
              `
          );

      }
  });
};
//POST
const submitForm = async (event) => {
  event.preventDefault();

  const album = {
    titulo: titulo.value,
    artista: artista.value,
    imagem: imagem.value,
    genero: genero.value,
    nota: parseInt(nota.value),
  };

  if (edicao) {
    putAlbum(album, idEdicao);
  } else {
    criarAlbum(album);
  }

  clearFields();
  lista.innerHTML = "";
};

const criarAlbum = async (album) => {
  const request = new Request(`${apiUrl}/add`, {
    method: "POST",
    body: JSON.stringify(album),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const response = await fetch(request);

  const result = await response.json();

  alert(result.message);

  getAlbuns();
};
//PUT
const putAlbum = async (album, id) => {
  const request = new Request(`${apiUrl}/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(album),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);
  edicao = false;
  idEdicao = 0;
  getAlbuns();
};

// [DELETE] funcao que exclui
const deleteAlbum = async (id) => {
  const request = new Request(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);

  lista.innerHTML = "";
  getAlbuns();
};

// [GET] {id} - funcao onde recebe um id via paramtero
const getAlbumById = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  return await response.json();
};

const editAlbum = async (id) => {
  edicao = true;
  idEdicao = id;

  const album = await getAlbumById(id);

  titulo.value = album.titulo;
  artista.value = album.artista;
  imagem.value = album.imagem;
  genero.value = album.genero;
  nota.value = album.nota;
};

const clearFields = () => {
  titulo.value = "";
  artista.value = "";
  imagem.value = "";
  genero.value = "";
  nota.value = "";
};

const assistido = async (id) =>{
let ok = true
const request = new Request(`${apiUrl}/${ok}/${id}`, {
method : 'PUT'
});
const response = await fetch(request);
const result = await response.json();
lista.innerHTML = '';
getAlbuns();
}

const naoAssistido = async (id) =>{
    let ok = false
    const request = new Request(`${apiUrl}/${ok}/${id}`, {
    method : 'PUT'
    });
    const response = await fetch(request);
    const result = await response.json();
    lista.innerHTML = '';
    getAlbuns();
    }

getAlbuns();
