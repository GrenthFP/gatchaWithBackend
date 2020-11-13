import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";

export default function IndexPage() {
  const [char, setChar] = useState({});
  const [drawnCharacter, setDrawnCharacter] = useState({});
  const [userName, setUserName] = useState("");
  const [enteredName, setEnteredName] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [admin, setAdmin] = useState(false)

  const getOne = async () => {
    let random = Math.floor(Math.random() * 25 + 1);
    console.log(random);
    try {
      let queueData = await axios.post(
        "https://testfullapi.herokuapp.com/api/bio/getter",
        {
          username: userName,
          number: random,
        }
      );
      if (queueData.data.error) {
        console.log("fail");
      } else {
        console.log(queueData.data.data);
        setDrawnCharacter(queueData.data.data);
      }
    } catch (errorReqest) {
      console.log(errorReqest);
    }
    getInventory();
  };

  const queue = async () => {
    try {
      let queueData = await axios.post(
        "https://testfullapi.herokuapp.com/api/bio",
        {
          name: char.name,
          class: char.class,
          number: char.number,
          link: char.link,
        }
      );
      if (queueData.data.error) {
        console.log("fail");
      } else {
        console.log("ok");
      }
    } catch (errorReqest) {
      console.log(errorReqest);
    }
  };

  const apply = () => {
    console.log(enteredName);
    setEnteredName(!enteredName);
    getInventory()
  };
  const getInventory = async () => {
    try {
      let inventoryData = await axios.post(
        "https://testfullapi.herokuapp.com/api/bio/getinventory",
        {
          username: userName,
        }
      );
      if (inventoryData.data.error) {
        console.log("fail");
      } else {
        console.log(inventoryData.data.data);
        setInventory(inventoryData.data.data);
      }
    } catch (errorReqest) {
      console.log(errorReqest);
    }
  };
  return (
    <div>
      <div>
        <div
          className={classnames("ml-auto mr-auto w-1/3", {
            hidden: enteredName,
          })}
        >
          <input
            className="w-full px-4 py-2 mt-40 ml-2 bg-gray-200 border-2 "
            placeholder="Write Username here..."
            type="text"
            onChange={(element) => { setUserName(element.target.value); if (element.target.value == "Admin") { setAdmin(!admin) } }}
          ></input>
          <div className="flex w-20 ml-auto mr-auto">
            <button
              onClick={apply}
              className="w-full mt-4 bg-purple-200 rounded-md"
            >
              Enter
            </button>
          </div>
        </div>
        <div>
          <div
            className={classnames("border w-64 pr-4 inline-block", {
              hidden: !enteredName,
            })}
          >
            <button
              className="w-full mt-4 bg-purple-200 rounded-md"
              onClick={getOne}
            >
              Draw
            </button>
            <div className={classnames("", {
              hidden: !admin,
            })}>
              <button
                className="w-full mt-4 bg-purple-200 rounded-md"
                onClick={queue}
              >
                submit
            </button>

              <label>
                This form is to create a new a new possible charater to be drawn
            </label>
              <input
                className="w-full px-4 py-2 my-2 ml-2 bg-gray-200 border-black border-solid rounded-r"
                placeholder="Write Name here..."
                type="text"
                onChange={(element) =>
                  setChar({ ...char, name: element.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 my-2 ml-2 bg-gray-200 border-2 rounded-r "
                placeholder="Write Position here..."
                type="text"
                onChange={(element) =>
                  setChar({ ...char, class: element.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 my-2 ml-2 bg-gray-200 border-2 rounded-r "
                placeholder="Write number here..."
                type="text"
                onChange={(element) =>
                  setChar({ ...char, number: element.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 my-2 ml-2 bg-gray-200 border-2 rounded-r "
                placeholder="Write Link here..."
                type="text"
                maxLength="150"
                onChange={(element) =>
                  setChar({ ...char, link: element.target.value })
                }
              />
            </div>
          </div>
          <div
            className={classnames(
              "border space-y-2 p-8 w-64 inline-block align-top",
              {
                hidden: !enteredName,
              }
            )}
          >
            <img
              src={drawnCharacter.link}
              alt="react-image-fallback"
              className="w-48"
            ></img>
            <p className="w-24">{drawnCharacter.name}</p>
            <p>Position: {drawnCharacter.class}</p>
          </div>

          <div className="inline-block w-3/5 align-top">
            <button onClick={getInventory}>Get Inventory</button>
            <div
              className={classnames(" border border-black flex  flex-wrap", {
                hidden: !enteredName,
              })}
            >
              {inventory.map((characters) => (
                <div
                  key={characters._id}
                  className="flex flex-col border border-black"
                >
                  <p className="text-sm">{characters.name}</p>
                  <p className="mt-auto text-sm">Position: {characters.class}</p>
                  <img src={characters.link} className="w-32 "></img>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
