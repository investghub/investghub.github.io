jQuery( document ).ready(function() {

    $(window).scroll(function(){
    $('.topnav').toggleClass('scrollednav py-0', $(this).scrollTop() > 50);
    });
    
});

function submitComment() {
    const userName = document.getElementById("userName").value;
    const userComment = document.getElementById("comment").value;

    if (userName.trim() === "" || userComment.trim() === "") {
        alert("Please enter your name and comment before submitting.");
        return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();

    const commentBox = document.createElement("div");
    commentBox.className = "comment-box";

    const commentDetails = document.createElement("div");
    commentDetails.className = "comment-details";
    commentDetails.textContent = `Posted by ${userName} on ${formattedDate}`;

    const commentText = document.createElement("p");
    commentText.textContent = userComment;

    // Create a reply button
    const replyButton = document.createElement("button");
    replyButton.className = "reply-button";
    replyButton.textContent = "Reply";
    replyButton.onclick = function() {
        createReplySection(commentBox);
    };

    // Create a container for replies
    const repliesContainer = document.createElement("div");
    repliesContainer.className = "replies-container";

    commentBox.appendChild(commentDetails);
    commentBox.appendChild(commentText);
    commentBox.appendChild(replyButton);
    commentBox.appendChild(repliesContainer);

    const commentsContainer = document.getElementById("commentsContainer");
    commentsContainer.insertBefore(commentBox, commentsContainer.firstChild); // Insert at the top

    // Clear input fields
    document.getElementById("userName").value = "";
    document.getElementById("comment").value = "";
}

// Function to create the reply section for each comment
function createReplySection(commentBox) {
    const replyForm = document.createElement("div");
    replyForm.className = "reply-form";

    const replyNameInput = document.createElement("input");
    replyNameInput.type = "text";
    replyNameInput.placeholder = "Enter your first name";
    replyNameInput.className = "reply-name";

    const replyTextarea = document.createElement("textarea");
    replyTextarea.rows = "2";
    replyTextarea.placeholder = "Enter your reply";
    replyTextarea.className = "reply-textarea";

    const submitReplyButton = document.createElement("button");
    submitReplyButton.textContent = "Submit Reply";
    submitReplyButton.onclick = function() {
        submitReply(replyNameInput.value, replyTextarea.value, commentBox);
        replyForm.remove(); // Remove reply form after submitting
    };

    replyForm.appendChild(replyNameInput);
    replyForm.appendChild(replyTextarea);
    replyForm.appendChild(submitReplyButton);

    commentBox.appendChild(replyForm);
}

// Function to submit the reply
function submitReply(replyName, replyText, commentBox) {
    if (replyName.trim() === "" || replyText.trim() === "") {
        alert("Please enter your name and reply before submitting.");
        return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();

    const replyBox = document.createElement("div");
    replyBox.className = "reply-box";

    const replyDetails = document.createElement("div");
    replyDetails.className = "reply-details";
    replyDetails.textContent = `Replied by ${replyName} on ${formattedDate}`;

    const replyContent = document.createElement("p");
    replyContent.textContent = replyText;

    replyBox.appendChild(replyDetails);
    replyBox.appendChild(replyContent);

    const repliesContainer = commentBox.querySelector(".replies-container");
    repliesContainer.appendChild(replyBox);
}

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

function copyScript() {
  const codeElement = document.getElementById('script-code').textContent;
  const tempInput = document.createElement('textarea');
  tempInput.value = codeElement;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  const message = document.getElementById('copy-message');
  message.style.display = 'block';
  setTimeout(() => {
      message.style.display = 'none';
  }, 2000);  // Message disappears after 2 seconds
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Function to show the active slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = 'none'; // Hide all slides initially
        slide.classList.remove('slide-active'); // Remove active class from all slides
    });
    slides[index].style.display = 'flex'; // Show the current slide
    slides[index].classList.add('slide-active'); // Add active class to the current slide
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop to next slide
    showSlide(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop to previous slide
    showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

// Automatically move to the next slide every 5 seconds
setInterval(nextSlide, 5000);

// Manual controls for next/prev buttons
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

function handleLinkActivation() {
  const link = document.getElementById('articlesLink');
  if (window.innerWidth <= 550) {
      link.classList.remove('inactive');  // Make link active
  } else {
      link.classList.add('inactive');  // Make link inactive
  }
}

// Run the function on page load and on window resize
window.addEventListener('resize', handleLinkActivation);
window.addEventListener('load', handleLinkActivation);