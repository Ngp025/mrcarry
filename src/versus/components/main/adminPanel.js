import React, { Component, useContext, useState } from 'react';

// Methods
//import login from '../user/login/loginFunctions'
//import CardList from '../user/passport-cards/cardList';
//import PassportProfile from '../user/passportProfile'
// Local imports
// SCSS imports
import '../../styles/main/home.scss';
import '../../styles/main/home-animations.scss';
// Logim
import login from '../user/login/loginFunctions';

var allNavArray = []
var navigationArray = [];
var navigationIndex = []
// Local Declarations

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: "home",
      navBar: "expanded",
      personalize : {
        mcList: [],
        mainColor : {
          red: 155,
          green: 155,
          blue: 155,
        },
      },
      socialData:[]
    };
  }
  // LOGUIN FUNCTIONS STATE
  loginState(invoked, resInvoke) {
    switch (invoked) {
      case 'register':
        document.getElementById('register-box').style.display = 'block';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        break;
      case 'validation':
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'block';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        break;
      case 'updating':
        window.scrollTo(0, 0)
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'block';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        break;
      case 'congrats':
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'block';
        setTimeout( ()=> location.reload(), 2000)
        break;
      case 'recovery':
        //document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('validation-box').style.display = 'none';
        document.getElementById('updating-box').style.display = 'none';
        document.getElementById('congrats-box').style.display = 'none';
        document.getElementById('recovery-box').style.display = 'block';
        break;
    }
  }
  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  productSubmit() {
    var name = document.getElementById('name-input').value;
    var description = document.getElementById('desc-input').value;
    var image = document.getElementById('image-input').value;
    var price = document.getElementById('price-input').value;
    async function saveProduct() {
        var preventLoginError = setTimeout(()=>{alert("Disculpe hubo un problema en su inscripción, por favor intente mas tarde"); location.reload()}, 22000);
        await fetch(`product/priceSubmit`, {
          method: 'POST',
          body: JSON.stringify({
            name,
            description,
            image,
            price,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json)
            clearTimeout(preventLoginError);
              if (json === "saved"){
              }else{
                alert(
                  `El siguiente dato "${Object.values(json)}" fue ingresado anteriormente, si usted considera que esto es un error, o necesita modificar su inscripción, envie un mail a mision.hiphop.artistas@gmail.com`)
              }
          });
        //.then( location.reload())
    }
    if (
      name &&
      description &&
      image &&
      price
    ) {
      saveProduct();
    } else {
      alert('Complete el formulario para avanzar');
      //console.log(`Complete the info`);
    }
  }
  // Mount Component
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    return(
      <div id="render-div">
        <div id="main-bg" className="main-bg"></div>      
        <div id="pre-enroll" className="pre-enroll-content animatedO opacity">
          <label 
            id='land-title'
            className='text-title'
            >
              NUEVO PRODUCTO
            </label>
            <div id="pre-enroll-data" className="pre-enroll-data-box">
              <label id="enroll-faq-1" className="enroll-faq-1">Ingrese su producto</label>
              {/* 
              <label id="enroll-faq-2" className="enroll-faq-2">¿Cuando participar?</label>
              <p id="enroll-p-2" className="enroll-p-2">Una vez enviado su link nuestro equipo de jurados seleccionara a los 64 mejores de cada semana dandoles acceso a la fase "Retadores"</p>
              */}       
              <label
                id='label-social-register'
                className='label-link-register'
                htmlFor='social-input'>
                Nombre de producto
              </label>
              <input
                id='name-input'
                className='social-register'
                type='text'
                placeholder='Nombre de producto'
              />       
              <label
                id='label-link-register'
                className='label-link-register'
                htmlFor='link-input'>
                Descripción
              </label>
              <input
                id='desc-input'
                className='link-register'
                type='text'
                placeholder='Descripción de producto'
              />
              <label
                id='product-image'
                className='label-link-register'
                htmlFor='link-input'>
                IMAGEN 1280 x 720 (URL) 
              </label>
              <input
                id='image-input'
                className='link-register'
                type='text'
                placeholder='Link completo'
              />
              <label
                id='product-price'
                className='label-link-register'
                htmlFor='link-input'>
                PRECIO 
              </label>
              <input
                id='price-input'
                className='link-register'
                type='text'
                placeholder='Ingrese solo el numero'
              />
              <button id="continue" className="continue" onClick={()=>{
                this.productSubmit()
              }}>CONTINUAR</button>
              <div id="footer-content" className="footer-content">
                <label id="footer-title" className="footer-title">Al continuar su producto sera subido a la base de datos</label>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

export default AdminPanel;
