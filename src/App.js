import "./styles.css";
import { useState, useEffect } from "react";
const redPath = [
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  9,
  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  135,
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  217,
  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  107,
  108,
  109,
  110,
  111,
  112
];
const greenPath = [
  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  135,
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  217,
  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  91,
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  23,
  38,
  53,
  68,
  83,
  98
];
const yellowPath = [
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  217,
  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  91,
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  9,
  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  119,
  118,
  117,
  116,
  115,
  114
];
const bluePath = [
  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  91,
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  9,
  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  135,
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  203,
  188,
  173,
  158,
  143,
  128
];
const homeBase = [
  [47, 48, 62, 63],
  [26, 27, 41, 42],
  [163, 164, 178, 179],
  [184, 185, 199, 200]
];
const falsePawn = [0, 0, 0, 0];
const initialValues = [
  // [47, 48, 62, 63],
  [107, 108, 109, 110],
  [26, 27, 41, 42],
  [101, 102, 103, 104],
  // [163, 164, 178, 179],
  [184, 185, 199, 200]
];

const getItemText = (i, pawns = []) => {
  // const colorIndex = pawns.findIndex((pawn) => pawn.includes(i));
  let arrayOFIndexes = [];
  pawns.forEach((pawn, colorIndex) => {
    pawn.forEach((point, pawnIndex) => {
      if (point === i) {
        arrayOFIndexes.push({ colorIndex, pawnIndex }); //
      }
    });
  });

  return arrayOFIndexes;
};
const player = ["RED", "GREEN", "YELLOW", "BLUE"];
const getColor = (i) => {
  if (
    [
      92,
      107,
      108,
      109,
      110,
      111,
      112,
      1,
      76,
      16,
      31,
      46,
      61,
      21,
      36,
      51,
      66,
      77,
      78,
      79,
      80,
      81,
      2,
      3,
      4,
      5,
      6
    ].includes(i)
  )
    return "red";
  else if (
    [
      134,
      119,
      118,
      117,
      116,
      115,
      114,
      145,
      146,
      147,
      148,
      149,
      150,
      220,
      160,
      175,
      190,
      205,
      165,
      180,
      195,
      210,
      221,
      222,
      223,
      224,
      225
    ].includes(i)
  ) {
    return "yellow";
  } else if (
    [
      24,
      23,
      38,
      53,
      68,
      83,
      98,
      11,
      12,
      13,
      14,
      15,
      30,
      45,
      60,
      75,
      86,
      87,
      88,
      89,
      90,
      10,
      25,
      40,
      55,
      70,
      85
    ].includes(i)
  ) {
    return "green";
  } else if (
    [
      128,
      143,
      158,
      173,
      188,
      203,
      202,
      211,
      136,
      137,
      138,
      139,
      140,
      141,
      212,
      213,
      214,
      215,
      216,
      151,
      166,
      181,
      196,
      156,
      171,
      186,
      201
    ].includes(i)
  ) {
    return "blue";
  } else if ([113, 97, 99, 127, 129].includes(i)) {
    return "#abc";
  }
};
export default function App() {
  const path = [redPath, greenPath, yellowPath, bluePath];
  const getNextTurn = (currentTurn) => {
    if (winner.length > 0 && winner.length !== 4) {
      let nxt = currentTurn === 3 ? 0 : currentTurn + 1;
      while (winner.includes(nxt)) {
        nxt = nxt === 3 ? 0 : nxt + 1;
      }
      return nxt;
    } else {
      return currentTurn === 3 ? 0 : currentTurn + 1;
    }
  };
  const setMultiPlayer = (playerNumber) => () => {
    setPlayers(playerNumber);
  };
  const unusedPath = [];
  const isAnyPawnMovable = (pollValue) => {
    if (
      pollValue === 6 &&
      pawns[turn].some((i) => homeBase[turn].includes(i))
    ) {
      // if (pawns[turn].some((i) => homeBase[turn].includes(i))) {
      setMoved(false);
      // }
    } else {
      let isMovableFound = pawns[turn].find((element, index) => {
        let elementIndex = path[turn].indexOf(element);
        return (
          elementIndex >= 0 && elementIndex + pollValue < path[turn].length
        );
      });
      if (isMovableFound) {
        // return true
        setMoved(false);
      } else {
        // return false
        setTimeout(() => {
          setValue("start");
          // setTurn((prev) => (prev === 3 ? 0 : prev + 1));
          setTurn(getNextTurn);
          setDisable(false);
        }, 1000);
      }
    }
  };
  const [value, setValue] = useState("start");
  const [players, setPlayers] = useState(null);

  const [pawns, setPawns] = useState(initialValues);
  const [winner, setWinner] = useState([]);
  const [turn, setTurn] = useState(0);
  const [disable, setDisable] = useState(false);
  const [moved, setMoved] = useState(true);
  useEffect(() => {
    if (moved && players) {
      setValue("start");
      // setTurn((prev) => (prev === 3 ? 0 : prev + 1));
      setTurn(getNextTurn);
      setDisable(false);
      setMoved(false);
      // if(){

      // }
    }
  }, [moved]);

  useEffect(() => {
    if (players) {
      if (players === 2) {
        setWinner([1, 3]);
        setPawns((pawns) => {
          pawns[1] = falsePawn;
          pawns[3] = falsePawn;
          return pawns;
        });
        setTurn(0);
      } else if (players === 3) {
        setWinner([1]);
        setPawns((pawns) => {
          pawns[1] = falsePawn;
          return pawns;
        });
        setTurn(0);
      } else {
      }
      //setWinner
      //setPawns
      //setTurn
    }
  }, [players]);
  // const value=6
  const pollClick = () => {
    const pollValue = Math.floor(Math.random() * 6) + 1;
    setValue(pollValue);
    setDisable(true);
    isAnyPawnMovable(pollValue);
  };

  const onPawnClick = (colorIndex, pawnIndex) => () => {
    if (!moved && colorIndex === turn && value > 0) {
      let currentPawnPoint = pawns[turn][pawnIndex];
      if (value === 6 && homeBase[turn].includes(currentPawnPoint)) {
        //setPawn at start
        setPawns((prevPawns) => {
          let newPawns = JSON.parse(JSON.stringify(prevPawns));
          newPawns[turn][pawnIndex] = path[turn][0];
          newPawns.forEach((pawn, index) => {
            if (turn !== index) {
              let pawnInd = pawn.indexOf(path[turn][0]);
              if (pawnInd >= 0) {
                newPawns[index][pawnInd] = homeBase[index][0];
              }
            }
          });
          //path[turn][0] //rest 3 color pawn is there if yes then move pawn of only one from one class to their homebase
          return newPawns;
        });
        setMoved(true);
      } else {
        const currentPawnIndex = path[turn].indexOf(currentPawnPoint);
        if (
          currentPawnIndex >= 0 &&
          currentPawnIndex + value < path[turn].length
        ) {
          setPawns((prevPawns) => {
            let newPawns = JSON.parse(JSON.stringify(prevPawns));
            newPawns[turn][pawnIndex] = path[turn][currentPawnIndex + value];
            newPawns.forEach((pawn, index) => {
              if (turn !== index) {
                let pawnInd = pawn.indexOf(
                  path[turn][currentPawnIndex + value]
                );
                if (pawnInd >= 0) {
                  newPawns[index][pawnInd] = homeBase[index][0];
                }
              }
            });
            if (
              !winner.includes(turn) &&
              newPawns[turn].every(
                (point) => point === path[turn][path[turn].length - 1]
              )
            ) {
              let winnerNumber = 0;
              if (players === 4) {
                winnerNumber = winner.length + 1;
              } else if (players === 3) {
                winnerNumber = winner.length;
              } else if (players === 2) {
                winnerNumber = winner.length - 1;
              }
              alert(`winner ${winnerNumber} player ${player[turn]}`);
              setWinner((a) => {
                let b = [...a];
                b.push(turn);
                return b;
              });
            }
            return newPawns;
          });
          //setPawn at target
          //is he winner=>
          // console.log(path[turn][path[turn].length - 1]);

          setMoved(true);
        }
      }
    }
  };
  return (
    <>
      {players && players > 1 ? (
        <div className="App">
          <div className="grid-container">
            {Array.from({ length: 225 }, (_, i) => {
              const colorIndexes = getItemText(i + 1, pawns);
              return (
                <div
                  onClick={(e) => {}}
                  className="grid-item"
                  style={{ backgroundColor: getColor(i + 1) }}
                >
                  {colorIndexes.length > 0
                    ? colorIndexes.map((v, j) => {
                        return (
                          <Pawn
                            onPawnClick={onPawnClick(v.colorIndex, v.pawnIndex)}
                            colorIndex={v.colorIndex}
                            pawnIndex={v.pawnIndex}
                            pawnClass={`${player[v.colorIndex]}-pawn`}
                          >
                            &#9823;
                          </Pawn>
                        );
                      })
                    : i + 1}
                </div>
              );
            })}
          </div>

          <ParagButton
            disable={disable}
            value={value}
            turn={player[turn]}
            pollClick={pollClick}
          />
        </div>
      ) : (
        <MultiPlayer setMultiPlayer={setMultiPlayer} />
      )}
    </>
  );
}
const ParagButton = ({ turn, value, pollClick, disable }) => {
  return (
    <div>
      <button onClick={pollClick} disabled={disable}>
        {value}
      </button>
      {turn}
    </div>
  );
};

const Pawn = (props) => {
  const { pawnClass, onPawnClick, colorIndex, pawnIndex } = props;
  return (
    <span className={pawnClass} onClick={onPawnClick}>
      {props.children}
    </span>
  );
};

const MultiPlayer = ({ setMultiPlayer }) => {
  return (
    <>
      LUDO multi players
      <div className="player" onClick={setMultiPlayer(2)}>
        2 player
      </div>
      <div className="player" onClick={setMultiPlayer(3)}>
        3 player
      </div>
      <div className="player" onClick={setMultiPlayer(4)}>
        4 player
      </div>
    </>
  );
};
