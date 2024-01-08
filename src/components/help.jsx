import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Help() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" className="help" onClick={handleShow}>
        Help
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hangman Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Welcome to Hangman, the classic word-guessing game where your
            objective is to guess a hidden word, letter by letter, before the
            hangman is completely drawn. Below are the rules and guidelines to
            help you get started:
          </p>
          <h3>How to Play</h3>
          <ol>
            <li>Starting the Game:</li>
            <ul>
              <li>
                Select a level of difficulty from the options provided. The
                higher the difficulty, the longer the word you will be trying to
                guess.
              </li>
              <li>
                Once you have selected a level, the game will begin and the
                hangman will be drawn.
              </li>
            </ul>
            <li>Playing the Game:</li>
            <ul>
              <li>
                Guess a letter by clicking on the letter you want to guess. If
                the letter is in the word, it will be revealed in the masked
                word. If the letter is not in the word, the hangman will be
                drawn further.
              </li>
              <li>
                Continue guessing letters until you have guessed the entire
                word, or until the hangman is completely drawn.
              </li>
            </ul>
            <li>Ending the Game:</li>
            <ul>
              <li>
                If you guess the entire word before the hangman is drawn, you
                win!
              </li>
              <li>
                If the hangman is completely drawn before you guess the entire
                word, you lose.
              </li>
            </ul>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Help;
