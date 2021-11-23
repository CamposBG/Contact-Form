//selecionar elementos 
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const subject = document.querySelector('select');
const message = document.querySelector('#messageArea')
const file = document.querySelector("inputFile")
const form = document.querySelector("#contactForm")
const btn = document.querySelector(".submitButton")
// //deixei file de fora para depois ver como faz 
const allInputs = [firstName, lastName, email, subject, message]

function isEmailValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getEmailData() {
  const formData = {};
  allInputs.forEach(({ name, value }) => {
    formData[name] = value
  });
  return formData;
}

function resetInputFields() {
  allInputs.forEach(input => {
    if (input.type === "select-one") {
      input.value = "Choose an option";
    } else {
      input.value = "";
    }
  });
}

async function fetchEmail() {
  const emailData = getEmailData()
  const options = {
    method: "POST",
    body: JSON.stringify(emailData),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch("/", options)
  if (!response.ok) {
    throw new Error(`fetch ERROR, status: ${response.status}`)
  } else {
    const EmailServerResponse = await response.text()
    alert(EmailServerResponse)
    resetInputFields()
  }
}

// eventos
email.addEventListener("input", ({ target }) => {
  if (!isEmailValid(target.value)) {
    email.style.color = "red"
    email.classList.toggle("isInvalid", true)
  } else {
    email.style.color = "green"
    email.classList.toggle("isInvalid", false)
  }
  console.log(Array.from(email.classList).includes("isInvalid"))
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const isValid = Array.from(email.classList).includes("isInvalid")
  if (isValid)
    alert("Invalid E-mail")
  else
    fetchEmail().catch((e) => {
      console.log("Error to communicate with server:", e)
      alert("Error to communicate with server")
    })
})
