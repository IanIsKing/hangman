import Button from "react-bootstrap/Button";

const Selection = ({ letter, onClick, status }) => {
  return (
    <>
      <Button onClick={onClick} id={letter} className={status} variant="info">
        {letter}
      </Button>
    </>
  );
};

export default Selection;
