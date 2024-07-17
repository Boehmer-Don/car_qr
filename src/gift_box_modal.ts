

function giftModalState() {
    const cartItems = document.querySelectorAll('.cart-item') as NodeListOf<HTMLDivElement>
    const plusButton = document.querySelectorAll('.plus-gift-box-item') as NodeListOf<HTMLButtonElement>
    const minusButton = document.querySelectorAll('.minus-gift-box-item') as NodeListOf<HTMLButtonElement>
    const form = document.querySelector('#gift-boxes-form') as HTMLFormElement
    const submitButton = document.querySelector('#gift-boxes-submit-form') as HTMLButtonElement

    let allowAmount = document.querySelector('#available-amount') as HTMLSpanElement

    const showCartItems = () => {
        cartItems.forEach((item) => {
            const input = item.querySelector('input') as HTMLInputElement
            const price = parseFloat(input.getAttribute('price') || '0')
            const isEnough =  price * 1


            if (Number(input.value) < 0) {
                return
            }

            if (item.classList.contains('hidden') && isEnough < parseFloat(allowAmount.innerText)) {
                item.classList.remove('hidden')
            }

        })
    }


    const hiddenCartItems = () => {
        cartItems.forEach((item) => {
            const input = item.querySelector('input') as HTMLInputElement
            const price = parseFloat(input.getAttribute('price') || '0')
            const isEnough = parseFloat(allowAmount.innerText) - price * 1

            if (Number(input.value) > 0) {
                return
            }
            if (isEnough < 0) {
                item.classList.add('hidden')
            }
        })
        
    }

    // click plus button
    function onClickPlus(e: Event) {
        const target = e.target as HTMLButtonElement
        const input = target.previousElementSibling as HTMLInputElement
        const maxQty = parseFloat(input.getAttribute('max-qty') || '0')
        const price = parseFloat(input.getAttribute('price') || '0')
        const value = parseFloat(input.value) + 1
        const newAmount =  parseFloat(allowAmount.innerText) - (price * 1)
        if (value > maxQty || newAmount < 0) {
            return
        }

        input.value = value.toString()
        allowAmount.innerText = newAmount.toFixed(1).toString()
        hiddenCartItems()
    }

    // click minus button
    function onClickMinus(e: Event) {
        const target = e.target as HTMLButtonElement
        const input = target.nextElementSibling as HTMLInputElement
        const price = parseFloat(input.getAttribute('price') || '0')
        const value = parseFloat(input.value) - 1

        if (value < 0) {
            return
        }
        input.value = value.toString()
        allowAmount.innerHTML = (parseFloat(allowAmount.innerText) + price * 1).toFixed(1).toString()
        showCartItems()
    }

    // submit form
    function handleSubmit() {
        if (!form.reportValidity()) {
            return
        }

        const formContentOne = document.querySelector('#gift-boxes-form-one') as HTMLDivElement
        const formContentTwo = document.querySelector('#gift-boxes-form-two') as HTMLDivElement
        const addCartContent = document.querySelector('#add-cart-content') as HTMLDivElement
        if (submitButton.innerHTML.includes('Next')) {
            const input = form.querySelector('input[name="gift_boxes"]') as HTMLInputElement
            const boxes = document.querySelectorAll('input[name="gift_box"]') as NodeListOf<HTMLElement>
            const boxesData = Array.from(boxes).map((box: HTMLInputElement) => {
                const id = box.getAttribute('box-item-id') || ''
                const qty = parseFloat(box.value || '0')
                const totalPrice = parseFloat(box.getAttribute('price' || '0')) * qty
                return {
                    dealerGiftItemId: id,
                    totalPrice:  totalPrice,
                    qty: qty
                }
            }).filter((box) => box.qty > 0)

            if (boxesData.length === 0) {
                alert('Please select at least one gift box')
                return
            }


            input.value = JSON.stringify(boxesData)
            form.classList.replace('w-1/2', 'w-full')
            addCartContent.classList.add('hidden')
            formContentOne.classList.add('hidden')
            formContentTwo.classList.remove('hidden')
            const disabledInputs = formContentTwo.querySelectorAll('input:disabled');
            disabledInputs.forEach(input => {
                input.removeAttribute('disabled');
            });

            submitButton.innerHTML = 'Submit'
            return
        }
        if (submitButton.innerHTML.includes('Submit')) {
            console.log('submit')
            form.submit()
            submitButton.disabled = true
            return
        }
    }

    submitButton.addEventListener('click', handleSubmit)

    plusButton.forEach((button) => {
    button.addEventListener('click', onClickPlus)
    })

    minusButton.forEach((button) => {
        button.addEventListener('click', onClickMinus)
    })
}


giftModalState()
