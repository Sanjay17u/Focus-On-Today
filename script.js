const inputs = document.querySelectorAll('input')
let count = 0

for(let x = 0; x < inputs.length; x++) {
    inputs[x].addEventListener('input', (e) => {
        // console.log(e)
        if(e.target.value.trim() != '') {
            console.log(true)
            count++
            console.log(count)
        } else {
            console.log(false)
            count--
            console.log(count)
        }

        if(count === inputs.length) {
            console.log("All inputs are filled: true")
        } else {
            console.log("All inputs are filled: false")
        }
    })
}