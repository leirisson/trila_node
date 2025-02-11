const url = "https://www2.cjf.jus.br/jurisprudencia/unificada/";

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
    
    const data = await response.text(); // Se for HTML, use `.text()`, se JSON, `.json()`
    console.log("Dados recebidos:", data);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

fetchData();
