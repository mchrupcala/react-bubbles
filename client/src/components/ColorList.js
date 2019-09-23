import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      setColorToEdit(initialColor);
    })
    .catch(err => {
      console.log(err);
    })

  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
    })
    .catch(err => console.log(err.response));
  };

  const addColorHandler = e => {
    console.log(e.target.value);
    setColorToAdd({
      ...colorToAdd, 
      [e.target.name]: e.target.value,
    });
  }

  const addColor = e => {
    e.preventDefault();
    console.log(colorToAdd)
    axiosWithAuth().post(`http://localhost:5000/api/colors/`, colorToAdd)
    .then(res => {
      console.log('Result ', res, 'New color ', colorToAdd);
      axiosWithAuth().get('http://localhost:5000/api/colors')
        .then(res => {
          updateColors(res.data);
        })
        .catch(err => console.log(err))
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <h4 className='add-header'>Add Color: </h4>
            <form className='addColor' onSubmit={addColor}>
            
            <label> Name:
        <input type="text" name="color" value={colorToAdd.name} onChange={addColorHandler}>
        </input>
        </label>

        <label> Hex Code:
        <input type="text" name="code" value={colorToAdd.code.hex} 
        onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }>
        </input>
        </label>
        {/* <input type="text" name="id" value={colorToAdd.id} onChange={addColorHandler}>
        </input> */}
        <button>
          Add</button>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

    </div>
  );
};

export default ColorList;
