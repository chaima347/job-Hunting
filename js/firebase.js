import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

window.addEventListener("DOMContentLoaded", function () {
  // web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC0bNbWy1Cl34ejQEPKOwrL5XWRXGtpN50",
    authDomain: "mini-project-59d59.firebaseapp.com",
    databaseURL: "https://mini-project-59d59-default-rtdb.firebaseio.com",
    projectId: "mini-project-59d59",
    storageBucket: "mini-project-59d59.appspot.com",
    messagingSenderId: "1031167507444",
    appId: "1:1031167507444:web:a2edb6701b1e947c4197a1",
    measurementId: "G-BVVP0PEWHH",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const AUTH_FIREBASE = getAuth(app);

  const LOGIN_BTN = document.getElementById("login_btn");
  const LOGOUT_BTN = document.getElementById("logout_btn");

  onAuthStateChanged(AUTH_FIREBASE, (user) => {
    document.getElementById("loader").hidden = true;

    if (user) {
      // User is logged in, show the protected form
      LOGIN_BTN.hidden = true;
      LOGOUT_BTN.hidden = false;
    } else {
      // User is not logged in, hide the protected form
      LOGIN_BTN.hidden = false;
      LOGOUT_BTN.hidden = true;

      //
      const goto_post_job__btn = document.getElementById("goto-post-job-btn");
      if (goto_post_job__btn) {
        goto_post_job__btn.href = "login.html";
      }

      //
      const private_content__dom = document.getElementById("private_content");
      if (private_content__dom) {
        private_content__dom.remove();
      }
    }
  });

  // Handle logout button click
  const logoutButton = document.getElementById("logout_btn");

  // if we have logout button on this page we set it up
  // otherwise we just ignore it
  if (logoutButton != null) {
    logoutButton.addEventListener("click", () => {
      signOut(AUTH_FIREBASE);
    });
  }

  const loginForm__dom = document.getElementById("login-form");

  // if we are in the loggin form this code should work
  // other wise we just ignore it
  if (loginForm__dom != null) {
    loginForm__dom.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm__dom.email.value;
      const password = loginForm__dom.password.value;

      const login_form_btn__dom = document.getElementById("login-form-btn");

      // disable the login button and change its value
      login_form_btn__dom.disabled = true;
      login_form_btn__dom.value = "Continue...";
      try {
        // try to login
        // if it fails it will throw an error
        const user_creds = await signInWithEmailAndPassword(
          AUTH_FIREBASE,
          email,
          password
        );
        // redirect the user to the main page if it succeeded
        window.location.href = "/";
      } catch (error) {
        // show failure message
        const message_dom = document.getElementById("message");
        message_dom.innerHTML = "invalid email or password";
      }

      // return the login button state to normal
      login_form_btn__dom.disabled = false;
      login_form_btn__dom.value = "Continue";
    });
  }
});
