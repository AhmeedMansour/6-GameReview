import { Details } from "./details.module.js";
import { Display } from "./display.module.js";

export class Home {
  constructor() {
    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");
    this.display = new Display();
    this.getGames("MMORPG");
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        const category = link.getAttribute("data-category");
        this.changeActive(link);
        this.getGames(category);
      });
    });
  }

  changeActive(link) {
    const activeLink = document.querySelector(".navbar-nav .active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
    link.classList.add("active");
  }

  async getGames(category) {
    this.loading.classList.remove("d-none");
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "a6f3043ee0msh3113dd0339b1ddcp1a09dejsn07d3735d80ec",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      if (!api.ok) {
        throw new Error(`HTTP error! status: ${api.status}`);
      }
      const response = await api.json();
      setTimeout(() => {
        this.loading.classList.add("d-none");
      }, 150);
      this.display.displayGames(response);
      document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", () => {
          this.details.classList.remove("d-none");
          this.games.classList.add("d-none");
          const gameId = card.getAttribute("data-id");
          new Details(gameId);
        });
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }
}
