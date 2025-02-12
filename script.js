const inputs = document.querySelectorAll('input');
const inputsArray = Array.from(inputs);
const checkBox = document.querySelectorAll('.input__checkBox');
const errorLabel = document.querySelector('.error__message')
const progressBar = document.querySelector('.progressBar');
const progressBarValue = document.querySelector('.progressBar__Value');
const titlePara = document.querySelector('.title__para')
const IamOneStepAheadToday = document.querySelector('.I__am__One__Step__ahead__Today')


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


function updateProgressBar() {
    const totalGoals = Object.keys(allGoals).length
    const completedGoals = Object.values(allGoals).filter(goal => goal.completed).length
    
    const progressPercentage = (completedGoals / totalGoals) * 100
    progressBar.style.width = `${progressPercentage}%`

    if(completedGoals === 0) {
        progressBarValue.textContent = `${completedGoals}/${totalGoals}`
    } else if(completedGoals >= 2) {
        progressBarValue.textContent = `${completedGoals}/${totalGoals} Completed`
        titlePara.classList.add('title__para')
        titlePara.innerText = 'Just a step away, keep going!'
        IamOneStepAheadToday.classList.add('I__am__One__Step__ahead__Today')
        IamOneStepAheadToday.innerText = `“Keep Going, You’re making great progress!”`

    } else {
        progressBarValue.textContent = `${completedGoals}/${totalGoals} Completed`
        titlePara.innerText = 'Raise the bar by completing your goals!'
        IamOneStepAheadToday.innerText = `“Move one step ahead, today!”`
    }
}


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

            updateProgressBar()
        }

    })


    inputsArray.forEach((input) => {
        input.addEventListener('input', (e) => {
            allGoals[e.target.id] = {
                name: e.target.value,
                completed: false,
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

            updateProgressBar()
        })
    })
})
updateProgressBar()