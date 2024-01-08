import { useState, useEffect } from "react";
import Selection from "./selection";
import MyModal from "./my_modal";
import Picture from "./picture";
import Help from "./help";
import Button from "react-bootstrap/Button";

function Hangman() {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [wordLength, setWordLength] = useState(3);

  // Fetch the dictionary and get a random word
  useEffect(() => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((text) => {
        let wordList = text.split("\n");
        wordList = wordList.filter(
          (word) => word.length > wordLength && word.length < wordLength + 3
        );
        const randomWord =
          wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
        setWord(randomWord);
      })
      .catch((error) => {
        console.error("Error fetching the dictionary:", error);
      });
    console.log("useEffect wordLength", wordLength);
  }, [status, wordLength]);

  // Create a masked word with the correct guesses
  const maskedWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");

  // Check if the game is in progress and if the word is guessed or if the amount of mistakes is more than 9
  useEffect(() => {
    if (status === "In Progress") {
      if (!maskedWord.includes("_")) {
        setStatus("Won");
      } else if (wrongGuesses.length > 9) {
        setStatus("Lost");
      }
    }
  }, [correctGuesses, wrongGuesses, maskedWord, status]);

  // Get the letter from the button that was clicked and check if it is in the word, also check if the game is in progress and
  const onClick = (e) => {
    if (status === "In Progress") {
      const letter = e.target.id;
      if (word.includes(letter)) {
        setCorrectGuesses([...correctGuesses, letter]);
      } else {
        setWrongGuesses([...wrongGuesses, letter]);
      }
    }
  };

  // Start the game and set the word length based on the level
  const startGame = (level) => {
    let newWordLength;
    if (level === "Beginner") {
      newWordLength = 3;
    } else if (level === "Intermediate") {
      newWordLength = 5;
    } else if (level === "Advanced") {
      newWordLength = 7;
    } else if (level === "Expert") {
      newWordLength = 9;
    }
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setWordLength(newWordLength);
    setStatus("In Progress");
  };

  // Play again and set the status to not started
  const playAgain = () => {
    setStatus("Not Started");
  };

  return (
    <div>
      <h1>Hangman</h1>
      {status === "Not Started" && (
        <>
          <Button variant="info" onClick={() => startGame("Beginner")}>
            Play as Beginner
          </Button>
          <Button variant="info" onClick={() => startGame("Intermediate")}>
            Play as Intermediate
          </Button>
          <Button variant="info" onClick={() => startGame("Advanced")}>
            Play as Advanced
          </Button>
          <Button variant="info" onClick={() => startGame("Expert")}>
            Play as Expert
          </Button>
        </>
      )}
      {status === "In Progress" && (
        <>
          <Picture mistakes={wrongGuesses.length} />
          <p>{maskedWord}</p>
          {alphabets.map((alphabet, index) =>
            correctGuesses.includes(alphabet) ||
            wrongGuesses.includes(alphabet) ? (
              <Selection
                key={index}
                letter={alphabet}
                onClick={onClick}
                status="remove"
              />
            ) : (
              <Selection
                key={index}
                letter={alphabet}
                onClick={onClick}
                status="OK"
              />
            )
          )}
          <p>Wrong guesses: {wrongGuesses.join(" ")}</p>
          <p>Amount of mistakes: {wrongGuesses.length}</p>
        </>
      )}
      {status === "Won" && (
        <>
          <Picture mistakes={wrongGuesses.length} />
          <p>You won!</p>
          <Button onClick={playAgain} variant="info">
            Play again
          </Button>
          <MyModal showModal={true} message={"You Won"} />
        </>
      )}
      {status === "Lost" && (
        <>
          <Picture mistakes={wrongGuesses.length} />
          <p>You lost!</p>
          <Button onClick={playAgain} variant="info">
            Play again
          </Button>
          <MyModal showModal={true} message={"You Lost"} />
        </>
      )}

      <Help />
    </div>
  );
}

export default Hangman;
