import { Display } from "./display.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      this.closeDetails();
    });
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    this.getDetails(id);
  }
  handleKeydown(e) {
    if (e.key === 'Escape' && e.target === document.body) {
        this.closeDetails();
    }
}

  closeDetails(){
    document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
  }
  async getDetails(id) {
    document.getElementById("loading").classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a6f3043ee0msh3113dd0339b1ddcp1a09dejsn07d3735d80ec",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      new Display().detailGames(result);
      document.getElementById("loading").classList.add("d-none");
    } catch (error) {
      console.error(error);
    }
  }
}
