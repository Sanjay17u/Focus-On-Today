const inputs = document.querySelectorAll('input');
const inputsArray = Array.from(inputs);
const checkBox = document.querySelectorAll('.input__checkBox');
const errorLabel = document.querySelector('.error__message')
const progressBar = document.querySelector('.progressBar');
const progressBarValue = document.querySelector('.progressBar__Value');


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

inputsArray.forEach((input, index) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name;
        if (allGoals[input.id].completed) {
            checkBox[index].classList.add('Green__Tick');
            checkBox[index].nextElementSibling.classList.add('Green__Text');
            input.disabled = true;


            const existingImg = checkBox[index].querySelector('.right__check');
            if (!existingImg) {
                const imgElement = document.createElement('img');
                imgElement.classList.add('right__check');
                imgElement.src = './images/Vector 1.svg';
                checkBox[index].append(imgElement);
            }
        }
    }


    input.addEventListener('paste', (e) => {
        e.preventDefault(); 
    });
    input.addEventListener('copy', (e) => {
        e.preventDefault(); 
    });
});




checkBox.forEach((checkBox, index) => {
    checkBox.addEventListener('click', () => {

        const inputFields = inputsArray.every((input) => {
            console.log(input.value)
            return input.value.trim() !== ''
        })

        if(!inputFields) {
            errorLabel.style.transition = 'opacity 1s ease'
            errorLabel.style.opacity = 100
        }

        inputs.forEach((input) => {
            input.addEventListener('focus', () => {
                errorLabel.style.transition = 'opacity 2s ease'
                errorLabel.style.opacity = 0
            })
        })

        if(inputFields) {
            console.log('checked')
            checkBox.nextElementSibling.classList.toggle('Green__Text')
            checkBox.classList.toggle('Green__Tick')

            if(checkBox.classList.contains('Green__Tick')) {
                inputs[index].disabled = true
            } else {
                inputs[index].disabled = false
            }

            const existingImg = checkBox.querySelector('.right__check')

            if(!existingImg) {
                const imgElement = document.createElement('img')
                imgElement.classList.add('right__check')
                imgElement.src = './images/Vector 1.svg'

                checkBox.append(imgElement)
            } else {
                checkBox.removeChild(existingImg)
            }

            const inputId = checkBox.nextElementSibling.id
            if(allGoals[inputId]) {
                allGoals[inputId].completed = !allGoals[inputId].completed
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }

    })


    inputsArray.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            allGoals[e.target.id] = {
                name: e.target.value,
                completed: false,
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        })
    })
})