

const deleteMessage = () => {

}

export const getDeleteButtons = (buttons, options) => {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.getAttribute("data-id");
            const optionsContainer = Array.from(options)
            const optionContainer = optionsContainer.find(container => {
                const containerId = container.getAttribute("data-id");
                return containerId === buttonId;
            })
            optionContainer.classList.remove('active-view')
            return buttonId;
        })
    })
}