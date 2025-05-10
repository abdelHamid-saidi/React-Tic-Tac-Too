import { useState } from 'react';

const PlayerChoice = ({ onChoice }) => {
  const [selected, setSelected] = useState('x');

  const toggleMark = () => {
    const newMark = selected === 'x' ? 'o' : 'x';
    setSelected(newMark);
  };

  return (
    <div className="container" id="cont1">
      <img src="./xo.png" id="logo" alt="logo" />
      <div id="choix">
        <br />
        <label id="lb1">PICK PLAYER 1'S MARK</label>
        <br />
        <div id="x-o" onClick={toggleMark} style={{ cursor: 'pointer' }}>
          <div id="x1" style={{ backgroundColor: selected === 'x' ? '#11232d' : '#a9bfca' }}></div>
          <div id="x2" style={{ backgroundColor: selected === 'x' ? '#11232d' : '#a9bfca' }}></div>
          <div id="c1" style={{ backgroundColor: selected === 'o' ? '#11232d' : '#a9bfca' }}></div>
          <div id="c2" style={{ backgroundColor: selected === 'o' ? '#a9bfca' : '#11232d' }}></div>
          <div id="grs" style={{ left: selected === 'x' ? '25%' : '75%' }}></div>
        </div>
        <label id="lb2">REMEMBER: X GOES FIRST</label>
      </div>
      <button id="cpu" onClick={() => onChoice(selected, 'cpu')}>NEW GAME (VS CPU)</button>
      <button id="amis" onClick={() => onChoice(selected, 'player')}>NEW GAME (VS PLAYER)</button>
    </div>
  );
};

export default PlayerChoice;
