import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

document.getElementById('login-btn')?.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const pw = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, pw);
    alert("로그인 성공!");
    window.location.href = "index.html";
  } catch (err) {
    console.error("로그인 실패", err);

    if (err.code === 'auth/invalid-login-credentials') {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    } else if (err.code === 'auth/user-not-found') {
      alert("등록되지 않은 이메일입니다.");
    } else if (err.code === 'auth/wrong-password') {
      alert("비밀번호가 틀렸습니다.");
    } else {
      alert("로그인 실패: " + err.message);
    }
  }
});

document.getElementById('register-btn')?.addEventListener('click', async () => {
  console.log("회원가입 버튼 클릭됨");

  const email = document.getElementById('register-email').value;
  const pw = document.getElementById('register-password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    window.location.href = "login.html";
  } catch (err) {
    console.error("회원가입 실패", err);

    if (err.code === 'auth/email-already-in-use') {
      alert("이미 사용 중인 이메일입니다. 로그인하거나 다른 이메일을 사용하세요.");
    } else if (err.code === 'auth/invalid-email') {
      alert("올바르지 않은 이메일 형식입니다.");
    } else if (err.code === 'auth/weak-password') {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
    } else {
      alert("회원가입 실패: " + err.message);
    }
  }
});

onAuthStateChanged(auth, (user) => {
  const loginLink = document.getElementById('nav-login');
  const registerLink = document.getElementById('nav-register');
  const logoutBtn = document.getElementById('nav-logout');

  if (user) {

    if (loginLink) loginLink.classList.add('hidden');
    if (registerLink) registerLink.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    console.log(" 로그인됨:", user.email);
  } else {

    if (loginLink) loginLink.classList.remove('hidden');
    if (registerLink) registerLink.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    console.log(" 로그아웃됨");
  }
});

document.getElementById('nav-logout')?.addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert("로그아웃 되었습니다.");
    window.location.href = "index.html";
  } catch (err) {
    console.error("로그아웃 실패", err);
  }
});
