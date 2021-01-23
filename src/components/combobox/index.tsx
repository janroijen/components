import React, { useState, useReducer } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  position: relative;
  font-size: 14px;
  margin: 10px;
  width: 120px;

  .input-row {
    border: 1px solid #888;
    border-radius: 2px;
    padding: 5px 10px;
  }

  input {
    font-size: 14px;
    border: 0;
    padding: 0;
    outline: none;
    width: calc(100% - 10px);
  }

  .dropdown-list {
    position: absolute;
    box-sizing: border-box;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 1px solid #bbb;
    border-radius: 2px;
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s;
    background: white;
    max-height: 30vh;
    overflow-y: auto;
  }

  // Scrollbar
  .dropdown-list::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  .dropdown-list::-webkit-scrollbar-track {
    background: #eee;
  }

  /* Handle */
  .dropdown-list::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 2px;
  }

  /* Handle on hover */
  .dropdown-list::-webkit-scrollbar-thumb:hover {
    background: #888};
  }


  .item {
    padding: 2px 10px;
    border-bottom: 1px solid #eee;
    width: calc(100% - 20px);
    overflow-x: hidden;
  }

  .item:first-child {
    padding-top: 2px;
  }

  .item:last-child {
    padding-bottom: 2px;
  }

  &:hover .dropdown-list {
    opacity: 1;
  }

  .item:hover {
    background-color: #eee;
  }

  .add-control,
  .delete-control {
    // margin-left: 10px;
    float: right;
    color: #eee;
  }

  .add-control:hover,
  .delete-control: hover {
    color: #888;
    cursor: pointer;
  }
`;

const listReducer = (
  list: string[],
  action: { type: "add" | "delete"; value?: string }
): string[] => {
  switch (action.type) {
    case "add":
      const items = action.value ? [...list, action.value] : list;
      const itemSet = new Set(items);
      return [...itemSet].sort();
    case "delete":
      return [...list].filter((item) => item !== action.value);
    default:
      return list;
  }
};

interface IComboBox {
  items: string[];
  setSelected(value: string): void;
  updateItems(items: string[]): void;
}

const ComboBox = ({ items, setSelected }: IComboBox) => {
  const [value, setValue] = useState("");
  const [listItems, dispatch] = useReducer(listReducer, items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelected(e.target.value);
  };

  const insertItemIntoComboBox = (value: string) => {
    setValue(value);
    setSelected(value);
  };

  const addItemToList = () => {
    dispatch({ type: "add", value });
  };

  const deleteItemFromList = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: string
  ) => {
    e.stopPropagation();
    dispatch({ type: "delete", value });
  };

  return (
    <Container>
      <div className="input-row">
        <input type="text" value={value} onChange={handleChange}></input>
        <span className="add-control" onClick={addItemToList}>
          +
        </span>
      </div>
      <ul className="dropdown-list">
        {listItems &&
          listItems.length &&
          listItems.map((item) => (
            <li
              className="item"
              key={item}
              onClick={(e) => insertItemIntoComboBox(item)}
            >
              {item}
              <span
                className="delete-control"
                onClick={(e) => deleteItemFromList(e, item)}
              >
                x
              </span>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default ComboBox;
