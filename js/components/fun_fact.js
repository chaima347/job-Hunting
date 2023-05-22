window.addEventListener("DOMContentLoaded", async () => {
  const url = "https://fun-facts1.p.rapidapi.com/api/fun-facts";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "59fba79f2fmsh8c36a78d8cf48d0p1e2af2jsna08b7351f85d",
      "X-RapidAPI-Host": "fun-facts1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const span = document.querySelector("#fun_fact_container span");
    span.innerHTML = result.fact;
  } catch (error) {
    console.error(error);
  }
});
