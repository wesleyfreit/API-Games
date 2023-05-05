export class Game {
  async list() {
    try {
      const response = await axios.get("http://localhost:8080/games");
      const array = response.data.games;
      const list = document.getElementById("games-list");
      list.textContent = "";

      array.forEach((element) => {
        const item = document.createElement("li");
        list.appendChild(item);

        item.innerHTML = `
            <h5>${element.title}</h5>
            <p>lançamento: ${element.year}</p>
            <p>
              valor: ${Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(element.price)}
            </p>
        `;
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        item.appendChild(editBtn);
        item.appendChild(deleteBtn);
        editBtn.textContent = "Editar";
        deleteBtn.textContent = "Deletar";

        editBtn.addEventListener("click", async () => {
          this.edit(element.id);
        });
        deleteBtn.addEventListener("click", async () => {
          this.delete(element.id);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create() {
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", async () => {
      const title = document.getElementById("title").value;
      const year = document.getElementById("year").value;
      const price = document.getElementById("price").value;

      const required = document.getElementById("required-input");

      if (title != "" && year != "" && price != "") {
        required.classList.add("hidden");
        const game = {
          title,
          year,
          price,
        };

        const request = await axios.post("http://localhost:8080/game", game);
        const response = request.data.has_error;

        if (!response) {
          alert("Jogo salvo com sucesso");
          this.list();
          document.getElementById("title").value = "";
          document.getElementById("year").value = "";
          document.getElementById("price").value = "";
        }
      } else {
        required.classList.remove("hidden");
      }
    });
  }

  async edit(id) {}

  async delete(id) {
    const request = await axios.delete(`http://localhost:8080/game/${id}`);
    const response = request.data.status;
    console.log(response);

    if (response == "deleted") {
      alert("Jogo deletado com sucesso");
      this.list();
    } else if (response == "not found") {
      alert("Este Jogo não existe");
    } else {
      alert("Ocorreu um erro ao deletar");
    }
  }
}
