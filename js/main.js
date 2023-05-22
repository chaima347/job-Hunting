var jobs_page_index = 0;

window.addEventListener("DOMContentLoaded", async () => {
  // init data for table defaults
  load_jobs_page();

  // set the event for filtering jobs
  const filter_jobs__form = document.getElementById("filter-jobs-form");
  filter_jobs__form.addEventListener("submit", (e) => {
    e.preventDefault();
    // clear the jobs
    clear_jobs_table();
    // load the new filtered jobs table
    load_jobs_page();
  });

  //
  const add_new_heading_form__dom = document.getElementById(
    "add-new-heading-form"
  );
  add_new_heading_form__dom.addEventListener("submit", (e) => {
    e.preventDefault();
    // get the new heading name
    const new_heading_title = e.target.add_new_heading.value;
    // create the new heading
    create_new_heading(new_heading_title);
  });
});

function handle_delete_heading(dom) {
  dom.parentNode.parentNode.remove();
}

async function load_jobs_page() {
  const show_more_jobs__div = document.getElementById("show-more-jobs");
  const initial_content = show_more_jobs__div.innerHTML;
  show_more_jobs__div.innerHTML = "loading...";

  // set max pages from the api docmentation
  const MAX_PAGE_INDEX = 99;

  // if all the pages have been loaded just return
  if (jobs_page_index > MAX_PAGE_INDEX) return;

  if (jobs_page_index == MAX_PAGE_INDEX) {
    show_more_jobs__div.style.display = "none";
  }

  // jobs_page_index__var
  jobs_page_index = jobs_page_index + 1;

  const params = new URLSearchParams();
  // we add the page parameter
  params.append("page", jobs_page_index);

  // we add the location if declared
  const jobs_location_value = document.getElementById(
    "search_jobs_location"
  ).value;
  if (jobs_location_value != 0) {
    params.append("location", location);
  }

  // we add the categorie if declared
  const jobs_categorie_value = document.getElementById("jobs-categorie").value;
  if (jobs_categorie_value != "Hide") {
    params.append("category", jobs_categorie_value);
  }

  const jobs_descending_checked =
    document.getElementById("jobs-descending").checked;
  if (jobs_descending_checked) {
    params.append("descending", jobs_descending_checked);
  }

  let url = `https://www.themuse.com/api/public/jobs?${params.toString()}`;

  const response = await fetch(url);

  const data = await response.json();

  const tbody__dom = document.querySelector("#jobs-data-table tbody");

  // bunch of dom to create the table body content
  // ( adding the data to the table body)
  data.results.forEach((job) => {
    const nom = job.name;
    const description = job.contents;
    const publication_date = new Date(
      job.publication_date
    ).toLocaleDateString();
    const locations = collect_names(job.locations).trim();
    const categories = collect_names(job.categories).trim();

    const nom__td = document.createElement("td");
    const description__td = document.createElement("td");
    // set class to the description to change its styling with css
    description__td.setAttribute("class", "jobs-data-description");
    const publication_date__td = document.createElement("td");
    const locations__td = document.createElement("td");
    const categories__td = document.createElement("td");

    nom__td.innerHTML = nom;
    description__td.innerHTML = description.substring(0, 50);
    publication_date__td.innerHTML = publication_date;
    locations__td.innerHTML = locations;
    categories__td.innerHTML = categories;

    const new_tr__dom = document.createElement("tr");
    new_tr__dom.appendChild(nom__td);
    new_tr__dom.appendChild(description__td);
    new_tr__dom.appendChild(publication_date__td);
    new_tr__dom.appendChild(locations__td);
    new_tr__dom.appendChild(categories__td);

    // append the new tr to the tbody
    tbody__dom.appendChild(new_tr__dom);
  });

  // return the initial value for the btn
  show_more_jobs__div.innerHTML = initial_content;
}

// just helper function to use to change array to array
// of the shape [{name1},{name2},{name3}] to "name1,name2,name3"
function collect_names(array) {
  return array
    .map((e) => {
      return e.name;
    })
    .join(",");
}

// clears the jobs table
function clear_jobs_table() {
  const tbody__dom = document.querySelector("#jobs-data-table tbody");
  tbody__dom.innerHTML = "";
}

// bunch of dom to create new heading
function create_new_heading(heading_name) {
  const tbody__dom = document.querySelector("#create-new-job tbody");
  //
  const new__tr = document.createElement("tr");
  //
  const new__td1 = document.createElement("td");
  const new__td2 = document.createElement("td");
  const new__td3 = document.createElement("td");
  const new__td4 = document.createElement("td");

  // new__td1
  const new__label = document.createElement("label");
  new__label.innerHTML = heading_name;
  new__td1.appendChild(new__label);

  // new__td2
  const new__input_text = document.createElement("input");
  new__input_text.setAttribute("additional_input", true);
  new__input_text.setAttribute("type", "text");
  new__input_text.setAttribute("name", heading_name.replace(" ", "_"));
  new__td2.appendChild(new__input_text);

  // new__td3
  new__td3.setAttribute("class", "haut-bas-container");
  const new__div1 = document.createElement("div");
  const new__div2 = document.createElement("div");
  new__div1.innerHTML = "haut";
  new__div1.classList.add("haut-btn");
  new__div1.setAttribute("onclick", "move_up(this)");
  new__div2.innerHTML = "bas";
  new__div2.classList.add("bas-btn");
  new__div2.setAttribute("onclick", "move_down(this)");
  new__td3.appendChild(new__div1);
  new__td3.appendChild(new__div2);

  // new__td4
  const new_div3 = document.createElement("div");
  const new_div4 = document.createElement("div");
  new_div3.setAttribute("class", "delete-heading-btn");
  new_div3.setAttribute("onClick", "handle_delete_heading(this)");
  new_div4.innerHTML = "delete";
  new_div3.appendChild(new_div4);
  new__td4.appendChild(new_div3);

  //
  new__tr.appendChild(new__td1);
  new__tr.appendChild(new__td2);
  new__tr.appendChild(new__td3);
  new__tr.appendChild(new__td4);

  //
  tbody__dom.appendChild(new__tr);
}

function validate_create_job_post_input(dom) {
  // check the current input that have been clicked
  if (dom.value.length == 0) {
    dom.classList.add("invalid-input");
  } else {
    dom.classList.remove("invalid-input");
  }

  const submit_form__btn = document.getElementById("create-new-job-btn");
  const apercu_job_btn__btn = document.getElementById("apercu-new-job-btn");

  // check if all input are valid
  if (all_inputs_are_valid()) {
    // if they are valid then
    // make the create and apercu
    // buttons available
    submit_form__btn.disabled = false;
    submit_form__btn.classList.remove("disabled-btn");
    //
    apercu_job_btn__btn.disabled = false;
    apercu_job_btn__btn.classList.remove("disabled-btn");
  } else {
    // otherwise we make sure to
    // make them unavailable
    submit_form__btn.disabled = true;
    submit_form__btn.classList.add("disabled-btn");
    //
    apercu_job_btn__btn.disabled = true;
    apercu_job_btn__btn.classList.add("disabled-btn");
  }
}

function all_inputs_are_valid() {
  const form = document.getElementById("create-new-job");
  const nom_value = form.nom.value;
  const description_value = form.description.value;
  const intitule_value = form.intitule.value;
  const location_value = form.location.value;

  return (
    nom_value.length > 0 &&
    description_value.length > 0 &&
    intitule_value.length > 0 &&
    location_value.length > 0
  );
}

function move_up(dom) {
  const row = dom.parentNode.parentNode;
  const prevRow = row.previousElementSibling;

  if (prevRow) {
    row.parentNode.insertBefore(row, prevRow);
  }
}

function move_down(dom) {
  const row = dom.parentNode.parentNode;
  const nextRow = row.nextElementSibling;

  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
  }
}

function handle_create_new_job(event) {
  event.preventDefault();

  if (!all_inputs_are_valid()) {
    return;
  }

  const form = document.getElementById("create-new-job");

  pop_notification("job post has been created successfully");

  form.reset();
  //
  const submit_form__btn = document.getElementById("create-new-job-btn");
  const apercu_job_btn__btn = document.getElementById("apercu-new-job-btn");

  submit_form__btn.disabled = true;
  submit_form__btn.classList.add("disabled-btn");
  //
  apercu_job_btn__btn.disabled = true;
  apercu_job_btn__btn.classList.add("disabled-btn");
}

function pop_notification(message) {
  // create the elemnt and set
  // its value and atributes
  const new_notification__div = document.createElement("div");
  new_notification__div.setAttribute("class", "notification-pop");
  new_notification__div.innerHTML = message;
  // add the element to the body
  document.body.appendChild(new_notification__div);
  new_notification__div.classList.add("notification-pop-out");

  // delete the notification
  // after 15 seconds
  setTimeout(() => {
    new_notification__div.remove();
  }, 15000);
}

function apercu() {
  // show the notification pop out div
  // by changing the style display
  // from 'none' to 'flex'
  const pop_apercu__div = document.getElementById("pop-apercu");
  pop_apercu__div.style.display = "flex";

  const additional_inputs = document.querySelectorAll(
    "#create-new-job input[type=text]"
  );

  // get the container and reset its content
  const content_container = document.getElementById("content-container");
  content_container.innerHTML = "";

  // bunch of dom as always
  additional_inputs.forEach((input) => {
    //
    let new_div = document.createElement("div");
    let new_span = document.createElement("span");
    let new_p = document.createElement("p");

    //
    new_span.innerHTML = input.name.concat(": ");
    new_p.innerHTML = input.value;

    //
    new_div.appendChild(new_span);
    new_div.appendChild(new_p);

    //
    content_container.appendChild(new_div);
  });
}

// close the pop out for apercu
function close_pop_apercu() {
  const pop_apercu__div = document.getElementById("pop-apercu");
  pop_apercu__div.style.display = "none";
}
