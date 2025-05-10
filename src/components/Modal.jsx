const Modal = () => (
 <>
   <div className="blr" id="howon">
     <div className="ntf">
       <p id="won1"></p>
       <div id="won2">
         <img src="#" id="xox" alt="X or O" />
         <p id="ppp">TAKES THE ROUND</p>
       </div>
       <div style={{ marginBottom: '10px' }}>
         <button id="qit">QUIT</button>
         <button id="nxt">NEXT ROUND</button>
       </div>
     </div>
   </div>
   <div className="blr" id="rest">
     <div className="ntf">
       <h2 style={{ fontWeight: 'bold', fontSize: '38px', color: '#a9bfca' }}>RESTART GAME?</h2>
       <div style={{ marginBottom: '10px' }}>
         <button id="no">NO, CANCEL</button>
         <button id="yes">YES, RESTART</button>
       </div>
     </div>
   </div>
 </>
);

export default Modal;
