const jobListingsContainer = document.getElementById("jobListings");
const searchInput = document.getElementById("searchInput");

function displayJobListings() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredListings = jobListings.filter((job) =>
    job.year.toLowerCase().includes(searchTerm)
  );

  jobListingsContainer.innerHTML = "";

  if (filteredListings.length === 0) {
    const noResultMessage = document.createElement("div");
    noResultMessage.classList.add("no-result-message");
    noResultMessage.innerText = "Oops!! No Search Results";
    jobListingsContainer.appendChild(noResultMessage);
  } else {
    filteredListings.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");

      jobCard.style.display = "flex";
      jobCard.style.flexDirection = "column";
      jobCard.style.alignItems = "center";
      jobCard.style.justifyContent = "center";

      const jobImage = document.createElement("img");
      jobImage.src = job.jobImage;
      jobImage.alt = "Job Image";
      jobImage.style.borderRadius = "2%";

      jobCard.innerHTML = `
			                     <div class="image-container">
                                    ${jobImage.outerHTML}
								 </div>
			                     <h2 class="jobtitle">${job.title}</h2>
                                 <p class="companyname"><strong>Company:</strong> ${job.company}</p>
                                 <p class="eligibleyear"><strong>Eligible Year:</strong> ${job.year}</p>
                                 <p class="dateposted"><strong>Posted Date:</strong> ${job.date}</p>`;

      jobCard.querySelector("img").style.width = "200px";
      jobCard.querySelector("img").style.height = "200px";

      const applyButton = document.createElement("a");
      applyButton.href = job.applyLink;
      applyButton.target = "_blank";
      applyButton.classList.add("apply-button");
      applyButton.innerText = "Apply Now";
      applyButton.style.display = "block";
      applyButton.style.margin = "auto";

      jobCard.appendChild(applyButton);
      jobListingsContainer.appendChild(jobCard);
    });
  }
}

searchInput.addEventListener("input", displayJobListings);
displayJobListings();

//Query

const queryForm = document.getElementById("queryForm");

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

queryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(queryForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  $.ajax({
    url: "save_query/",
    type: "POST",
    data: {
      name: name,
      email: email,
      subject: subject,
      message: message,
      csrfmiddlewaretoken: getCookie("csrftoken"),
    },
    success: function (response) {
      alert("Query submitted successfully!");
      queryForm.reset();
    },
    error: function (error) {
      alert("Error sending email. Please try again later.");
    },
  });
});

// Smooth scrolling for internal links
$('a[href^="#"]').on("click", function (event) {
  var target = $($(this).attr("href"));

  if (target.length) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      1000
    );
  }
});
