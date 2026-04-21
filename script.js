const ADVICE_ENDPOINT = "https://api.adviceslip.com/advice";

const card = document.querySelector(".card");
const idEl = document.querySelector("[data-advice-id]");
const textEl = document.querySelector("[data-advice-text]");
const button = document.querySelector("[data-advice-button]");

async function fetchAdvice() {
  card.classList.add("cargando");
  button.disabled = true;

  try {
    const response = await fetch(`${ADVICE_ENDPOINT}?t=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const { id, advice } = data.slip;

    idEl.textContent = id;
    textEl.textContent = advice;
  } catch (error) {
    console.error(error);
    textEl.textContent =
      "No se pudo obtener la información en este momento. Verifique su conexión e inténtelo de nuevo.";
  } finally {
    card.classList.remove("cargando");
    button.disabled = false;
  }
}

button.addEventListener("click", fetchAdvice);

fetchAdvice();
