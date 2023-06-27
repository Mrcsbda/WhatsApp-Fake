
const user = JSON.parse(localStorage.getItem('currentUser'));
const container = document.getElementById('userProfile');
const containerImage = document.querySelector('.main__left-side__chats-container__user-picture-container');

const printInfoUsers = () => {

    containerImage.innerHTML = `
    <img class="main__left-side__chats-container__user-picture-container--picture" src="${user.image}" alt="profile picture" id="userProfilePicture">
    `;

    container.innerHTML = `
    <div class="main__left-side__profile-container__header">
                <img class="main__left-side__profile-container__header--icon-return"
                    src="https://www.svgrepo.com/show/511383/arrow-left-350.svg" alt="return icon" id="closeProfile">
                <p class="main__left-side__profile-container__header--title-header">Perfil</p>
            </div>
            <div class="main__left-side__profile-container__profile-picture-container">
                <div class="main__left-side__profile-container__profile-picture-container__profile-picture">
                    <img class="main__left-side__profile-container__profile-picture-container__profile-picture--img"
                        src="${user.image}" alt="profile picture">
                    <div>Cambiar imagen</div>
                </div>

                <p class="main__left-side__profile-container__profile-picture-container--change-picture">Cambiar
                    foto de perfil</p>
                <div class="main__left-side__profile-container__profile-picture-container__profile-picture-url">
                    <input
                        class="main__left-side__profile-container__profile-picture-container__profile-picture-url--input"
                        type="url" placeholder="URL de la nueva foto">
                    <button
                        class="main__left-side__profile-container__profile-picture-container__profile-picture-url--btn">Cambiar</button>
                </div>
            </div>
            <div class="main__left-side__profile-container__name-container">
                <p class="main__left-side__profile-container__name-container__title">Tu nombre</p>
                <div class="main__left-side__profile-container__name-container__edit-name-container">
                    <p class="main__left-side__profile-container__name-container__edit-name-container--name">${user.name}</p>
                    <input type="text"
                        class="main__left-side__profile-container__name-container__edit-name-container--input">
                    <img src="https://www.svgrepo.com/show/501933/edit-major.svg" alt="edit icon"
                        class="main__left-side__profile-container__name-container__edit-name-container--icon-edit edit-nombre">
                </div>
                <button class="main__left-side__profile-container__name-container--save-changes">Guardar
                    cambios</button>
            </div>
            <div class="main__left-side__profile-container__status-container">
                <p class="main__left-side__profile-container__status-container__title">Tu estado</p>
                <div class="main__left-side__profile-container__status-container__edit-status-container">
                    <p class="main__left-side__profile-container__status-container__edit-status-container--status">${user.info}</p>
                    <input type="text"
                        class="main__left-side__profile-container__status-container__edit-status-container--input">
                    <img src="https://www.svgrepo.com/show/501933/edit-major.svg" alt="edit icon"
                        class="main__left-side__profile-container__status-container__edit-status-container--icon-edit">
                </div>
                <button class="main__left-side__profile-container__status-container--save-changes">Guardar
                    cambios</button>
            </div>
            <div class="main__left-side__profile-container__sign-off">
                <button id="btnSignOff">Cerrar sesión</button>
            </div>
    `;

    const closeUserProfileBtn = document.getElementById('closeProfile')
    const viewUserProfileBtn = document.getElementById('userProfilePicture')

    viewUserProfileBtn.addEventListener('click', () => {
        container.classList.add('active-view')
    })

    closeUserProfileBtn.addEventListener('click', () => {
        container.classList.remove('active-view')
    })
}

export default printInfoUsers;