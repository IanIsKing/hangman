import State1 from "../assets/state1.GIF";
import State2 from "../assets/state2.GIF";
import State3 from "../assets/state3.GIF";
import State4 from "../assets/state4.GIF";
import State5 from "../assets/state5.GIF";
import State6 from "../assets/state6.GIF";
import State7 from "../assets/state7.GIF";
import State8 from "../assets/state8.GIF";
import State9 from "../assets/state9.GIF";
import State10 from "../assets/state10.GIF";
import State11 from "../assets/state11.GIF";

function Picture({ mistakes }) {
  const images = [
    State1,
    State2,
    State3,
    State4,
    State5,
    State6,
    State7,
    State8,
    State9,
    State10,
    State11,
  ];
  return <img src={images[mistakes]} alt={mistakes} />;
}

export default Picture;
