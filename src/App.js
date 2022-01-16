import { useEffect, useState } from "react";
import {
  bluePath,
  falsePawn,
  greenPath,
  homeBase,
  initialValues,
  player,
  redPath,
  yellowPath
} from "./constant.js";
import "./styles.css";
import { getColor, getItemText } from "./utils.js";
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
  const isAnyPawnMovable = (pollValue) => {
    if (
      pollValue === 6 &&
      pawns[turn].some((i) => homeBase[turn].includes(i))
    ) {
      setMoved(false);
    } else {
      let isMovableFound = pawns[turn].find((element, index) => {
        let elementIndex = path[turn].indexOf(element);
        return (
          elementIndex >= 0 && elementIndex + pollValue < path[turn].length
        );
      });
      if (isMovableFound) {
        setMoved(false);
      } else {
        setTimeout(() => {
          setValue("start");
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
      setTurn(getNextTurn);
      setDisable(false);
      setMoved(false);
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
        //default 4
      }
    }
  }, [players]);
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
            <img
              src="/assets/image/center-ludo.png"
              width="135"
              height="135"
              alt="image"
            />
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
                            <span class="pawn">&#9823;</span>
                          </Pawn>
                        );
                      })
                    : null}
                </div>
              );
            })}
          </div>

          <Dice
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
const Dice = ({ turn, value, pollClick, disable }) => {
  return (
    <div className="poll">
      <div>
        <button className="dice" onClick={pollClick} disabled={disable}>
          {value}
        </button>
        <span style={{ width: "100px", color: turn, fontWeight: 700 }}>
          {turn}
        </span>
      </div>
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
    <div className="multiplayer">
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
    </div>
  );
};
