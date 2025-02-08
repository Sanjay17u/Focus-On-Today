const inputs = document.querySelectorAll('input');
const inputsArray = Array.from(inputs);
const checkBox = document.querySelectorAll('.input__checkBox');


checkBox.forEach((checkBox) => {
    checkBox.addEventListener('click', () => {
        
        const inputFields = inputsArray.every((input) => {
            console.log(input.value)
            return input.value
        })
        
        if(inputFields) {
            console.log('checked')
            checkBox.nextElementSibling.classList.toggle('Green__Text')
            checkBox.classList.toggle('Green__Tick')

            const existingImg = checkBox.querySelector('.right__check')

            if(!existingImg) {
                const imgElement = document.createElement('img')
                imgElement.classList.add('right__check')
                imgElement.src = './images/Vector 1.svg'

                checkBox.append(imgElement)
            } else {
                checkBox.removeChild(existingImg)
            }
        }

    })
})