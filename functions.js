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


function calculateROI() {
  const invested = parseFloat(document.getElementById('invested').value);
  const returned = parseFloat(document.getElementById('returned').value);
  const duration = parseFloat(document.getElementById('duration').value);
  
  if (isNaN(invested) || isNaN(returned) || isNaN(duration) || invested < 0 || returned < 0 || duration < 0.1) {
      alert('Please enter valid numbers for all fields. Investment time should be at least 0.1 years.');
      return;
  }
  
  const profit = returned - invested;
  const roi = (profit / invested) * 100;
  const annualROI = roi / duration;
  
  document.getElementById('profit').textContent = `GHS ${profit.toFixed(2)}`;
  document.getElementById('roi').textContent = `${roi.toFixed(2)}%`;
  document.getElementById('annualRoi').textContent = `${annualROI.toFixed(2)}%`;
  document.getElementById('investmentLength').textContent = `${duration.toFixed(1)} years`;

  // Calculate percentages for the chart
  const totalAmount = Math.abs(invested) + Math.abs(profit);
  const investedPercent = (Math.abs(invested) / totalAmount) * 100;
  const profitLossPercent = (Math.abs(profit) / totalAmount) * 100;

  // Update the chart
  document.getElementById('investedBar').style.width = `${investedPercent}%`;
  document.getElementById('profitLossBar').style.width = `${profitLossPercent}%`;
  
  // Set color for profit/loss bar
  const profitLossColor = profit >= 0 ? '#2ecc71' : '#e74c3c';
  document.getElementById('profitLossBar').style.backgroundColor = profitLossColor;
  document.getElementById('profitLossColor').style.backgroundColor = profitLossColor;

  document.getElementById('investedPercent').textContent = `Invested: ${investedPercent.toFixed(1)}%`;
  document.getElementById('profitLossPercent').textContent = `${profit >= 0 ? 'Profit' : 'Loss'}: ${profitLossPercent.toFixed(1)}%`;
}

function resetFields() {
  document.getElementById('invested').value = '';
  document.getElementById('returned').value = '';
  document.getElementById('duration').value = '';
  document.getElementById('profit').textContent = 'GHS 0.00';
  document.getElementById('roi').textContent = '0.00%';
  document.getElementById('annualRoi').textContent = '0.00%';
  document.getElementById('investmentLength').textContent = '0 years';
  document.getElementById('investedBar').style.width = '100%';
  document.getElementById('profitLossBar').style.width = '0%';
  document.getElementById('investedPercent').textContent = 'Invested: 100%';
  document.getElementById('profitLossPercent').textContent = 'Profit/Loss: 0%';
  document.getElementById('profitLossColor').style.backgroundColor = '#e0e0e0';
}


function calculateYield() {
  const amountInvested = parseFloat(document.getElementById('amountInvested').value);
  const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;
  const daysToMaturity = parseInt(document.getElementById('daysToMaturity').value);
  
  if (isNaN(amountInvested) || isNaN(discountRate) || isNaN(daysToMaturity)) {
      alert('Please enter valid numbers for all fields.');
      return;
  }
  
  const faceValue = amountInvested / (1 - (discountRate * daysToMaturity / 365));
  const interestEarned = faceValue - amountInvested;
  const yield = (interestEarned / amountInvested) * (365 / daysToMaturity) * 100;
  
  document.getElementById('amountInvestedResult').textContent = `GHS ${amountInvested.toFixed(2)}`;
  document.getElementById('interestEarnedResult').textContent = `GHS ${interestEarned.toFixed(2)}`;
  document.getElementById('totalReturnResult').textContent = `GHS ${faceValue.toFixed(2)}`;
  document.getElementById('annualizedYieldResult').textContent = `${yield.toFixed(2)}%`;
}

function refreshCalculator() {
  document.getElementById('amountInvested').value = '';
  document.getElementById('discountRate').value = '';
  document.getElementById('daysToMaturity').value = '';
  document.getElementById('amountInvestedResult').textContent = 'GHS 0.00';
  document.getElementById('interestEarnedResult').textContent = 'GHS 0.00';
  document.getElementById('totalReturnResult').textContent = 'GHS 0.00';
  document.getElementById('annualizedYieldResult').textContent = '0.00%';
}
