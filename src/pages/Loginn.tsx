import React from 'react';
import '../../public/main.css';

function Loginn() {
    const text = document.querySelector(".second-text");

            const textLoad = () => {
              setTimeout(() => {
                text.textContent = "Validación Simplificada";
              }, 0);
              setTimeout(() => {
                text.textContent = "Nosotros Hacemos el Trabajo Pesado";
              }, 4000);
              setTimeout(() => {
                text.textContent = "Tu Socio Confiable :)";
              }, 8000);
            }
            textLoad();
            setInterval(textLoad, 12000);

  return (
    <div className="heroki">
      <div className="box-1">
        <div className="conteiner">
            <h1 className="title">Action Factory</h1>
            <h3 className="text second-text">Liberando tu Tiempo</h3>
        </div>


      </div>
      <div className="box-2">
      <div className="hero">
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="login">
                <form className="form">
                <label htmlFor="chk" aria-hidden="true">Log in</label>
                <input className="input" type="email" name="email" placeholder="Email" required />
                <input className="input" type="password" name="pswd" placeholder="Password" required />
                <button>Log in</button>
                </form>
                
            </div>

            <div className="register">
                <form className="form">
                <label htmlFor="chk" aria-hidden="true">Register</label>
                <input className="input" type="text" name="txt" placeholder="Username" required />
                <input className="input" type="email" name="email" placeholder="Email" required />
                <input className="input" type="password" name="pswd" placeholder="Password" required />
                <button>Register</button>
                </form>
            </div>
            </div>
    </div>
      </div>
    </div>


    
    
  );
}

export default Loginn;
