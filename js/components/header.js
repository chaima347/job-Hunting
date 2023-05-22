window.addEventListener("DOMContentLoaded", () => {
  const header__dom = document.querySelector("header");

  header__dom.innerHTML = `
	<span id="title" class="styly">
		<a href="./index.html">Chaima</a>
	</span>
	<ul class="links">
		<li class="btn-primary" id="login_btn"><a href="./login.html">login</a></li>
		<li class="btn-primary" id="logout_btn">logout</li>
	</ul>
`;
});
