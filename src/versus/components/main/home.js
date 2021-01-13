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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: "home",
      navBar: "expanded",
      productsList: [],
      personalize : {
        mainColor : {
          red: 155,
          green: 155,
          blue: 155,
        },
      },
      socialData:[]
    };
    Home.prototype.navigationHandler = Home.prototype.navigationHandler.bind(this);
    Home.prototype.userInfoSetter = Home.prototype.userInfoSetter.bind(this);
    Home.prototype.localRegister = Home.prototype.localRegister.bind(this);
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
  // Register Handler
  localRegister() {
    var nameR = document.getElementById('name-register-input').value;
    var mcName = document.getElementById('name-mc-input').value;
    //var emailR = document.getElementById('email-register-input').value.trim().toLowerCase();
    var dateR = document.getElementById('date-register-input').value;
    var nameTutorR = document.getElementById('name-tutor-register-input').value;
    var documentTutorR = document.getElementById('document-tutor-input').value;
    var documentR = document.getElementById('document-input').value;
    var link = this.state.socialData[0]
    var social = this.state.socialData[1];
    async function saveRegister() {
        var preventLoginError = setTimeout(()=>{alert("Disculpe hubo un problema en su inscripción, por favor intente mas tarde"); location.reload()}, 22000);
        await fetch(`users/betaregister`, {
          method: 'POST',
          body: JSON.stringify({
            nameR,
            mcName,
            link,
            social,
            documentR,
            dateR,
            nameTutorR,
            documentTutorR,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => {
            clearTimeout(preventLoginError);
              if (json === "saved"){
                Home.prototype.loginState("congrats", true)
              }else{
                alert(
                  `El siguiente dato "${Object.values(json)}" fue ingresado anteriormente, si usted considera que esto es un error, o necesita modificar su inscripción, envie un mail a mision.hiphop.artistas@gmail.com`)
                  Home.prototype.loginState('register', true)
              }
          });
        //.then( location.reload())
    }
    if (
      nameR &&
      dateR &&
      mcName &&
      link &&
      social &&
      documentR
    ) {
      saveRegister();
      Home.prototype.loginState('updating', true);
    } else {
      alert('Complete el formulario para avanzar');
      //console.log(`Complete the info`);
    }
  }
  // Navigation Handler
  navBarHandler(){
    if(this.state.navBar === "colapsed"){
      this.setState({navBar : "expanded"})
    }else{
      this.setState({navBar : "colapsed"})
    }
  }
  navigationHandler(newNav, invoke){
    if(invoke){
      function eliminar(array, elemento) {
        var resultado = []
        for (var i = 0; i < array.length; i++) {
          if (i !== elemento) {
            resultado.push(array[i]);
          }
        }
        return resultado;
      }
      navigationIndex.pop()
      navigationIndex.push(navigationArray.length-1);
      var newNavArray = eliminar(navigationArray, navigationIndex[0]);
      navigationArray = newNavArray
      console.log(navigationArray)
      newNav === "land" ? this.navBarHandler() : ""
      this.setState({
        navigation : newNav
      })
    }else{
      navigationArray.push(this.state.navigation)
      this.setState({
        navigation : newNav
      })
    }
  }
  footerBar(){
    return(<div id="footer-bar" style={{display: `${this.state.navigation === "home" ? "none" : ""}`}}>Contacto: mrcarry451025@gmail.com</div>)
  }
  navigationSwitch(){
    switch(this.state.navigation){
      case "home":
        return (
            <div id="home" className="content-align">
              <div id="help-content" className="help-content">
                {/*<label id="help-label" className="help-label">Click para comenzar</label>*/}
              </div>
               <img 
                  src="https://media.discordapp.net/attachments/689942074425999446/798962305718550538/carry.fw.png"
                  id="main-logo" 
                  className="main-logo animatedO opacity" 
                  onClick={()=>{
                    this.navigationHandler("land");
                  }}/>
              {/*<h4 id="main-subtitle" className="main-subtitle animatedO opacity">MR.CARRY</h4> */}
              <label id="info-text" className="info-text animatedOD opacity-d" >CONSIGUE LA DIVISIÓN QUE MERECES</label>
            </div>
        );
        break
      case "land" : 
      return(
        <div id="land" className="land-content opacityLand-content animatedLand-content">
          <label 
            id='land-title'
            className='text-title'
            >
              INICIO
            </label>
            <div id="land-data" className="land-data-box animatedO opacity">
            <label id="mcList-help" className="mcList-help">Revisa un listado con las ofertas de cada paquete </label>
              <button id="mc-list" className="mc-list " onClick={()=>{this.navigationHandler("mcList"); setTimeout(()=>this.setState({navBar : "colapsed"}), 500)}}>OFERTAS</button>
              <label id="enroll-help" className="enroll-help">Genera un cálculo personalizado de acuerdo a tus ligas y tus campeones</label>
              <button id="enroll" className="enroll " onClick={()=>{this.navigationHandler("pre-enroll"); setTimeout(()=>this.setState({navBar : "colapsed"}), 500)}}>CALCULADORA</button>
              <label id="enroll-help" className="enroll-help">Completa el formulario para realizar tu pedido</label>
              <button id="enroll" className="enroll " onClick={()=>{this.navigationHandler("pre-enroll"); setTimeout(()=>this.setState({navBar : "colapsed"}), 500)}}>HACER PEDIDO</button>
            </div>
        </div>
      )
      case "pre-enroll" : 
        return(
          <div id="pre-enroll" className="pre-enroll-content animatedO opacity">
          <label 
            id='land-title'
            className='text-title'
            >
              INSCRIPCIÓN
            </label>
            <div id="pre-enroll-data" className="pre-enroll-data-box">
              <label id="enroll-faq-1" className="enroll-faq-1">¿Cómo participar?</label>
              <p id="enroll-p-1" className="enroll-p-1">Envie un link con su video subido a youtube haciendo freestyle. (máximo 60 segundos)</p>
              {/* 
              <label id="enroll-faq-2" className="enroll-faq-2">¿Cuando participar?</label>
              <p id="enroll-p-2" className="enroll-p-2">Una vez enviado su link nuestro equipo de jurados seleccionara a los 64 mejores de cada semana dandoles acceso a la fase "Retadores"</p>
              */}       
              <label
                id='label-social-register'
                className='label-link-register'
                htmlFor='social-input'>
                Coloque su tag en Instagram/myTag
              </label>
              <input
                id='social-input'
                className='social-register'
                type='text'
                placeholder='myTag'
              />       
              <label
                id='label-link-register'
                className='label-link-register'
                htmlFor='link-input'>
                Link con minuto de freestyle (YouTube)
              </label>
              <input
                id='link-input'
                className='link-register'
                type='text'
                placeholder='Link completo'
              />
              <button id="continue" className="continue" onClick={()=>{this.navigationHandler("user-login");this.socialDataHandler()}}>CONTINUAR</button>
              <div id="footer-content" className="footer-content">
                <label id="footer-title" className="footer-title">REGLAMENTO, FORMATO Y DISCORD</label>
                <div id="compe-links-1" className="compe-links-1">
                  <a id="reglamento" className="reglamento" onClick={()=>window.open("https://docs.google.com/document/d/1XVW1Iia837yXvfNcjmr__hfgIHaQaHvqq6G_rGSaoe8/edit?usp=sharing")}>REGLAMENTO</a>
                  <a id="discord" className="discord" onClick={()=>window.open("https://discord.gg/AqSENSZ")}>DISCORD</a>
                </div>
                <div id="compe-links-2" className="compe-links-2"> 
                  <a id="retadores" className="retadores" onClick={()=>window.open("https://docs.google.com/document/d/1VgcVfo1MAXmmvu7HO3L6Kxs6Dk8cQXimnyWwbCGQavA/edit?usp=sharing")}>RETADORES</a>
                  <a id="pesos-pesados" className="pesos-pesados" onClick={()=>window.open("https://docs.google.com/document/d/1SJ9NaEW6OknLOD8uOTR-wOrZMP4NGCzQ46XvJtBXEgY/edit?usp=sharing")}>PESOS PESADOS</a>
                </div>
              </div>
            </div>
          </div>
        )
      case "user-login" :
        return (
          <div
            id='user-login'
            className="enroll-content opacity animatedO">
          {/*login.loginBeta(
            Home.prototype.loginState,
            Home.prototype.locallogin,
          )*/}            
          <label 
            id='land-title'
            className='text-title'
            >
              INSCRIPCIÓN
            </label>
          {login.registerBeta(Home.prototype.localRegister)}
          {login.recovery(Home.prototype.loginState)}
          {login.validationModal(Home.prototype.localValidation)}
          {login.updating()}
          {login.congrats()}
        </div>
      )
      case "mcList" : 
      return(
        <div id="mcList-content" className="mcList-content animatedO opacity">
          <label 
            id='land-title'
            className='text-title'
            >PAQUETES</label>
          <div id="mcList-box" className="mcList-box">
            {console.log(this.state.productsList)}
            {this.state.productsList ? this.state.productsList.map((product, index)=>{
              return( 
              <div id={`mc-${index}`} key={`${index}`} className="mc-card">
                <img id="card-bg" className="card-bg" src={`${product.image}`} />
                <label id="card-title" className="card-title" key={`card-title-${index}`}>{product.name.toUpperCase()}</label>
                <label id="product-desc" className="product-desc" key={`product-desc-${index}`}>{product.description.toUpperCase()}</label>
                <label id="product-price" className="product-price" key={`product-price-${index}`}>{`U$S ${product.price}`} </label>
                <button id="get-product" className="get-product" key={`get-product-${index}`}>OBTENER</button>
              </div>)
              }) : <img
                     id='loading-img-mcList'
                     className='loading-img'
                     src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>}
          </div>
       </div>
      )
    }
  }
  navReturnHandler(){
    navigationIndex.pop()
    navigationIndex.push(navigationArray.length -1)
    if(navigationIndex[0] === 0){}else{this.navigationHandler(navigationArray[navigationIndex[0]], true)}
  }
  // MC LIST Handlers
  async viewsHandler(mc, e){
      const IDU = mc._id
      const mcName = mc.mcName
      var link = e.target.className.split("-")[1]
      if(link === "social"){
        window.open(
          `http://www.instagram.com/${mc.social}`,
          `${mcName}`,
        )
        }else{
          window.open(
            `${mc.link}`,
            `${mcName}`)
        }
      const response = await fetch(`users/views/${IDU}/${mcName}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      
  }
  async loadMcList(){
    await fetch('product/getProduct/')
      .then((res) =>res.json())
      .then((json) => {
        var productsList = json;
        this.setState({productsList : productsList}) 
        console.log(productsList)
    });
    }
  // User info setter
  userInfoSetter(data){
    this.setState({
      userInfo : data
    })
  }
  socialDataHandler(){
   const link = document.getElementById("link-input").value
   const social = document.getElementById("social-input").value
    this.setState({
      socialData : [link, social]
    })
  }
  // Mount Component
  componentDidMount() {
    this.loadMcList()
  }
  componentWillUnmount() {
  }

  render() {
    return(
      <div id="render-div">
        <div id="main-bg" className="main-bg" style={{opacity: this.state.navigation === "mcList" ? 0.05 : 0.3 }}>        </div>

        <div id="header" className={`header h-${this.state.navBar}`} style={{display:`${this.state.navigation === "home" ? "none" : "block"}`}}>
          <div id="navigation-bar" className="navigation-bar">
            <img id="return-button" className="return-button delay opacity-return-button" style={{display: `${this.state.navBar === "expanded" ? "none" : "block"}`}} onClick={()=>this.navReturnHandler()} src="https://res.cloudinary.com/drgv8takd/image/upload/a_270/v1603087706/Mision%20Hip%20Hop/Assets/Nav%20assets/25366_m3kjuv.svg"/>
            <img id="title-img-nav" className={`${this.state.navBar}`} src="https://cdn.discordapp.com/attachments/689942074425999446/798998300912517201/carry3.fw.png" />
          </div>
          {/*<img id="title-img" className="title-img" src="https://res.cloudinary.com/drgv8takd/image/upload/v1602536269/Mision%20Hip%20Hop/Logos/MISION_HH_-_logo_-_white_znaiz4.png" /> */}
        </div>        
        {this.navigationSwitch()}
        {this.footerBar()}
      </div>
    )
  }
}

export default Home;
