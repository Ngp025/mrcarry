import React, { Component } from 'react';
import moment from 'moment-timezone';

//Login Functions

function teamRegisterData() {
  var playerTeamData = location.href.split('/')[5].split('-');
  return playerTeamData;
}
function logOut() {
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
}
async function recoveryPassword(email, pass, confirm, loginState) {
  if (pass === confirm) {
    await fetch(`users/newPassword/${email}`, {
      method: 'POST',
      body: JSON.stringify({
        tempPassword: pass,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((jsonMess) => {
        if (!jsonMess.alert) {
          loginState('validation');
        } else {
          alert(jsonMess.alert);
        }
      });
  } else {
    alert(
      'Disculpe la contraseña no es exactamente igual por favor indique correctamente'
    );
  }
}
function loginBeta(loginState, localLogin) {
  return (
    <div id='login-box' className='login-box  opacity animatedO'>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='login-title' className='login-title'>
        Bienvenido
      </label>
        <label
          id='label-loginlocal-email'
          className='label-loginlocal-email'
          htmlFor='email-local-input'>
          Correo Electrónico
        </label>
        <input
          id='email-local-input'
          className='email-local-input'
          type='email'
          autoComplete="on"
          placeholder='Ingrese su correo electrónico'
        />
        <label
          id='label-loginlocal-password'
          className='label-loginlocal-password'
          htmlFor='password'>
          Contraseña
        </label>
        <input
          id='password-local-input'
          className='password-local-input'
          type='password'
          placeholder='Ingresa su password'
          autoComplete="nope"
        />
        <button
          id='submit-loginlocal'
          className='submit-loginlocal'
          type='submit'
          onClick={() => localLogin()}>
          INGRESAR
        </button>
        <label
          id='label-register'
          className='label-register'
          >
          ¿No tienes cuenta?
        </label>
        <button
          id='to-register'
          className='to-register'
          onClick={() => loginState('register')}
          >
          REGISTRARSE
        </button>
        <a
          id='submit-lostPass'
          className='submit-lostPass'
          type='submit'
          onClick={() => loginState('recovery')}>
          ¿Olvidaste tu contraseña?
        </a>
    </div>
  );
}
function registerBeta(localRegister, invoke) {
  return (
    <div
      id='register-box'
      style={{display:"block"}}
      className='register-box animatedO opacity'>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      {/* Nombre */}
        <label
          id='label-name-register'
          className='label-name-register'
          htmlFor='name-register-input'>
          Nombre completo
        </label>
        <input
          id='name-register-input'
          className='name-register'
          type='text'
          placeholder='Nombre y apellido'
          autoComplete='off'/>
      {/* Nombre de MC */}
        <label
          id='label-mc-register'
          className='label-mc-register'
          htmlFor='name-mc-input'>
          Nombre de MC
        </label>
        <input
          id='name-mc-input'
          className='mc-register'
          type='text'
          placeholder='Ingresa tu nombre de MC'
          defaultValue= ""
          maxLength="12"
          autoComplete='off'/>
      {/* Email */}
        <label
          id='label-email-register'
          className='label-email-register'
          htmlFor='email-register-input'>
          Correo electrónico
        </label>
        <input
          id='email-register-input'
          className='email-register'
          type='text'
          placeholder= 'Correo Electronico'
          autoComplete='off'
          onChange={()=>{ 
            var mail = document.getElementById('email-register-input')
            var cMail = document.getElementById('email-register-input-confirm')
            function validMail(){
              cMail.style.outline = "1px solid green" ;
              cMail.style.borderBottom ="1px solid transparent"
              mail.style.outline = "1px solid green" ;
              mail.style.borderBottom ="1px solid transparent"
            }
            function invalidMail(){
              cMail.style.outline = "1px solid red";
              cMail.style.borderBottom ="1px solid transparent"
              mail.style.outline = "1px solid red"
              mail.style.borderBottom ="1px solid transparent"
            }
            function resetStyle(){
              cMail.style.borderBottom = "1px solid rgb(248, 234, 153)"
              mail.style.borderBottom = "1px solid rgb(248, 234, 153)"
              cMail.style.outline = "1px solid transparent"
              mail.style.outline = "1px solid transparent"
            }
            if(cMail.value === ""){
              resetStyle()
            }else{
              mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail() 
              mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail()
            }
          }}
          />
      {/* Confirm Email */}
        <label
          id='label-email-confirm-register'
          className='label-email-register'
          htmlFor='email-register-input-confirm'>
          Confirma tu correo electrónico
        </label>
        <input
          id='email-register-input-confirm'
          className='email-register'
          type='text'
          placeholder='Confirma tu correo electrónico'
          autoComplete='off'
          onChange={()=>{ 
            var mail = document.getElementById('email-register-input')
            var cMail = document.getElementById('email-register-input-confirm')
            function validMail(){
              cMail.style.outline = "1px solid green" ;
              cMail.style.borderBottom ="1px solid transparent"
              mail.style.outline = "1px solid green" ;
              mail.style.borderBottom ="1px solid transparent"
            }
            function invalidMail(){
              cMail.style.outline = "1px solid red";
              cMail.style.borderBottom ="1px solid transparent"
              mail.style.outline = "1px solid red"
              mail.style.borderBottom ="1px solid transparent"
            }
            function resetStyle(){
              cMail.style.borderBottom = "1px solid rgb(248, 234, 153)"
              mail.style.borderBottom = "1px solid rgb(248, 234, 153)"
              cMail.style.outline = "1px solid transparent"
              mail.style.outline = "1px solid transparent"
            }
            if(mail.value === ""){
              resetStyle()
            }else{
              mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail() 
              mail.value.trim().toLowerCase() ===  cMail.value.trim().toLowerCase() ? validMail() : invalidMail()
            }
          }}
          style={{ display: invoke === 'teamregister' ? 'none' : 'block' }}
        />
      {/* Fecha de nacimiento */}
        <label
          id='label-date-register'
          className='label-date-register'
          htmlFor='email-register-input'>
          Fecha de nacimiento
        </label>
        <input
          id='date-register-input'
          className='date-register'
          type='date'
          defaultValue='01/01/2000'
          style={{color: 'rgb(194, 194, 194)'}}
          onChange={() => {
            event.target.style.color = '#ffffff';
            var userDate = event.target.value.split('-');
            var isUnder16 = moment()
              .subtract(16, 'years')
              .format('YYYY-MM-DD')
              .split('-');
            if (userDate[0] >= 1920) {
              var tutorData = document.getElementById('tutor-data');
              setTimeout(function () {
                if (isUnder16[0] > userDate[0]) {
                  tutorData.style.display = 'none';
                }
                if (isUnder16[0] === userDate[0]) {
                  if (isUnder16[1] > userDate[1]) {
                    tutorData.style.display = 'none';
                  }
                  if (isUnder16[1] === userDate[1]) {
                    if (isUnder16[2] > userDate[2]) {
                      tutorData.style.display = 'none';
                      alert('aqui');
                    }
                    if (isUnder16[2] === userDate[2]) {
                      tutorData.style.display = 'none';
                    }
                    if (isUnder16[2] < userDate[2]) {
                      tutorData.style.display = 'block';
                    }
                  }
                  if (isUnder16[1] < userDate[1]) {
                    tutorData.style.display = 'block';
                  }
                }
                if (isUnder16[0] < userDate[0]) {
                  tutorData.style.display = 'block';
                }
              }, 1000);
            }
          }}
          max={'2005-01-01'}
          min={'1920-01-01'}
          placeholder='Fecha de nacimiento'
          autoComplete='off'
        />
        <div
          id='tutor-data'
          className='tutor-data animatedO opacity'
          style={{ display: 'none' }}>
          <label
            id='label-tutor-name-register'
            className='label-name-register'
            htmlFor='name-register-input'>
            Nombre completo de el padre, la madre o tutor
          </label>
          <input
            id='name-tutor-register-input'
            className='name-register'
            type='text'
            placeholder='Nombre y apellido (padre madre o tutor)'
            autoComplete='off'
          />
          <label
            id='label-tutor-date-register'
            className='label-date-register'
            htmlFor='document-tutor-input'>
            Número de documento de el padre la madre o tutor
          </label>
          <input
            id='document-tutor-input'
            className='document-input'
            type='number'
            placeholder='Documento (padre madre o tutor)'
            autoComplete='off'
            min='1200000'
            max='20000000'
          />
          <label id='tutor-auth' className='tutor-auth'>
            Una vez enviado el formulario el representante acepta la
            participacion del menor a su cargo en nuestras competencias. Bienvenidos.{' '}
          </label>
        </div>
        <label
          id='label-date-register'
          className='label-date-register'
          htmlFor='document-input'>
          Número de documento
        </label>
        <input
          id='document-input'
          className='document-input'
          type='number'
          placeholder='Documento del jugador'
          autoComplete='off'
          min='1200000'
          max='20000000'
        />
        <label
          id='label-city-register'
          className='label-city-register'
          htmlFor='city-input'>
          Ciudad
        </label>
        <input
          id='city-register-input'
          className='city-register'
          type='text'
          placeholder='Ingrese su ciudad'
        />
        {/* 
        <label
          id='label-password-register'
          className='label-password-register'
          htmlFor='password-register-input'>
          Contraseña
        </label>
        <input
          id='password-register-input'
          className='password-register'
          type='password'
          placeholder='Ingrese su contraseña'
          autoComplete='off'
        />
        <label
          id='label-passwordconfirm-register'
          className='label-passwordconfirm-register'
          htmlFor='passwordconfirm-register-input'>
          Confirmar contraseña
        </label>
        <input
          id='passwordconfirm-register-input'
          className='passwordconfirm-register'
          type='password'
          placeholder='Confime su contraseña'
          autoComplete='off'
        />
        */}
        <label id='label-policy-register' className='label-policy-register'>
          Al registrarse usted acepta nuestros{' '}
          <a
            className="terms"
            onClick={() =>
              window.open(
                'localhost:5000/#/terms-and-politics',
                'Diseño Web',
                'width=300, height=200'
              )
            }>
            terminos y politicas de uso
          </a>
        </label>
        <button
          id='register-submit'
          className='register-submit'
          type='submit'
          onClick={() => localRegister()}>
          Enviar Inscripción
        </button>
    </div>
  );
}
function recovery(loginState) {
  return (
    <div
      id='recovery-box'
      className='recovery-box opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='recovery-title' className='recovery-title'>
        Recuperar contraseña
      </label>
      <label id='recovery-condition' className='recovery-condition'>
        Al realizar el cambio de contraseña debe recordar que no podra cambiarla
        nuevamente por las siguientes 72 horas luego de culminar el proceso.
      </label>
      <form id='form-recovery' className='form-recovery'>
        {/* EMAIL INPUT */}
        <label
          id='label-recovery-email'
          className='label-recovery-email'
          htmlFor='email-recovery-input'>
          Correo Electrónico
        </label>
        <input
          id='email-recovery-input'
          className='email-recovery-input'
          type='email'
          placeholder='Ingrese su correo electrónico'
        />
        {/* PASWORD INPUT */}
        <label
          id='label-recovery-password'
          className='label-recovery-password'
          htmlFor='password-recovery-input'>
          Nueva contraseña
        </label>
        <input
          id='password-recovery-input'
          className='password-recovery-input'
          type='password'
          placeholder='Ingresa su password'
          //error={}//errors.password
        />
        {/* PASWORD INPUT 2*/}
        <label
          id='label-recovery-password-2-confirm'
          className='label-recovery-password-2-confirm'
          htmlFor='password-recovery-input-2-confirm'>
          Confirma la nueva contraseña
        </label>
        <input
          id='password-recovery-input-2-confirm'
          className='password-recovery-input-2-confirm'
          type='password'
          placeholder='Ingresa su password'
        />
        {/*<spam id='red-text-password-l' className='red-text-password-l'></spam>*/}
        <button
          id='submit-recovery'
          className='submit-recovery'
          type='submit'
          onClick={
            () =>
              recoveryPassword(
                document.getElementById('email-recovery-input').value,
                document.getElementById('password-recovery-input').value,
                document.getElementById('password-recovery-input-2-confirm')
                  .value,
                loginState
              )
            /*fetch*/
          }>
          VALIDAR
        </button>
      </form>
    </div>
  );
}
function loginButtonDisplay(navigation) {
  function loginButton() {
    if (localStorage.userData) {
      return (
        <button
          id='profile-button'
          className='modal-trigger tooltipped  login-button highGradeButton'
          data-tooltip='Mira tu perfil'
          onClick={() => (location.href = '/#/perfil')}>
          Perfil
        </button>
      );
    } else {
      return (
        <button
          id='plataformaesports-singIn-button'
          data-target='modal1'
          className='modal-trigger tooltipped login-button lowGradeButton'
          data-tooltip='Iniciar sesión'>
          Ingresa
        </button>
      );
    }
  }
  if (navigation === 'Cargando') {
    <p title='...'>...</p>;
  } else {
    return loginButton();
  }
}
function cleanAndSafe() {
  const email = JSON.parse(localStorage.userData).email;
  const IDP = JSON.parse(localStorage.userData)._id;

  fetch(`users/cleanInfo/${IDP}/${email}`)
    .then((res) => res.json())
    .then((data) => d);

  localStorage.clear();
  location.reload();
}
function validationModal(localValidation) {
  if (localStorage.userData) {
    var userData = JSON.parse(localStorage.userData);
  }
  return (
    <div
      id='validation-box'
      className='validation-box  opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <label id='validation-title' className='validation-title'>
        ¡Sólo un paso más!
      </label>
      <form id='form-validation' className='form-validation'>
        <label id='label-email-token' className='label-email-token'>
          Un código de validación fué enviado a su email{' '}
          {localStorage.userData ? userData.email : ''}
        </label>
        <label
          id='label-validation-token'
          className='label-validation-token'
          htmlFor='validation-token-input'>
          Código de validación
        </label>
        <input
          id='validation-token-input'
          className='validation-token-input'
          type='text'
          placeholder='Coloque aqui su codigo de validación'
        />
        <button
          id='validate-submit'
          className='validate-submit'
          onClick={() => localValidation()}>
          Validar
        </button>
        <label
          id='clearRegister'
          className='clearRegister'
          onClick={() => cleanAndSafe()}>
          Comenzar de nuevo
        </label>
      </form>
    </div>
  );
}
function updating() {
  return (
    <div
      id='updating-box'
      className='updating-box  opacity animatedO'
      style={{display: "none"}}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
      <img
        id='loading-img-updating-box'
        className='loading-img'
        src='https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif'></img>
    </div>
  );
}
function congrats() {
  return (
    <div
      id='congrats-box'
      className='congrats-box  opacity animatedO'
      style={{ display: 'none' }}>
      {/*AQUI COMIENZA LOGIN CONTENT */}
        <img
          id='congrats-img'
          className='congrats-img'
          src='../../../media/assets/elipse-1.svg'></img>
        <label id='congrats-title' className='congrats-title'>
          ¡Registro Exitoso!
        </label>
      </div>
  );
}
const login = {
  loginButtonDisplay: loginButtonDisplay,
  registerBeta: registerBeta,
  loginBeta: loginBeta,
  logOut: logOut,
  validationModal: validationModal,
  updating: updating,
  congrats: congrats,
  teamRegisterData: teamRegisterData,
  recovery: recovery,
};

export default login;
