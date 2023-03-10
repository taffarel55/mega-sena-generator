import { useState } from "react";
import "./App.css";
import megaSenaLogo from "./assets/logo-mega-sena.png";

function App() {
  const [palavra, setPalavra] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleInput = (event) => {
    setPalavra(event.target.value);
  };

  const gerarAposta = (event) => {
    event.preventDefault();

    if (!palavra) {
      setNumbers([]);
      return;
    }

    const generate = new Math.seedrandom(
      palavra
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .hashCode()
    );

    let arr = [];

    for (let i = 0; i < 6; i++) {
      let generatedNumber;
      do {
        generatedNumber = Math.ceil(60 * generate());
      } while (arr.includes(generatedNumber));

      arr.push(generatedNumber);
    }

    const orderedNumbers = arr.sort((a, b) => a - b);

    setNumbers(orderedNumbers);

    setCopied(true);
    setInterval(() => {
      navigator.clipboard.writeText(orderedNumbers);
      setCopied(false);
    }, 3000);
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
        {copied && <div className="text">Jogo copiado!</div>}
      </form>
      <p className="read-the-docs">Maur??cio Taffarel ????</p>
    </div>
  );
}

export default App;
