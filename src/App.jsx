import { useState } from "react";
import "./App.css";
import megaSenaLogo from "./assets/logo-mega-sena.png";

function App() {
  const [palavra, setPalavra] = useState("");
  const [numbers, setNumbers] = useState([]);

  const handleInput = (event) => {
    setPalavra(event.target.value);
  };

  const gerarAposta = (event) => {
    event.preventDefault();

    if (!palavra) {
      setNumbers([]);
      return;
    }

    const generate = new Math.seedrandom(palavra.hashCode());

    const arr = new Array(6).fill(0).map(() => Math.ceil(60 * generate()));

    setNumbers(arr.sort((a, b) => a - b));
  };

  String.prototype.hashCode = function () {
    var hash = 0,
      i,
      chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  return (
    <div className="App">
      <div>
        <img src={megaSenaLogo} className="logo react" alt="Mega sena" />
      </div>
      <h1>Mega Sena Generator</h1>
      <form className="card" onSubmit={gerarAposta}>
        Insira uma palavra/frase da sorte:
        <br />
        <input type="text" onChange={handleInput} />
        <button className="button">Gerar</button>
        <div id="result">
          {numbers.map((number, idx) => (
            <div key={idx} className="number">
              {number}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
