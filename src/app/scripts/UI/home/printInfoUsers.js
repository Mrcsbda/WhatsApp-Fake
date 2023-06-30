import editInfoUser from "./editInfoUsers";
import signOff from "./signOff";


const container = document.getElementById('userProfile');
const containerImage = document.querySelector('.main__left-side__chats-container__user-picture-container');

const printInfoUsers = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user) return
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
                    <div class="edit-image">Cambiar imagen</div>
                </div>

                <p class="main__left-side__profile-container__profile-picture-container--change-picture edit-image">Cambiar
                    foto de perfil</p>
                <div class="main__left-side__profile-container__profile-picture-container__profile-picture-url" id="container__image-input">
                    <input
                        class="main__left-side__profile-container__profile-picture-container__profile-picture-url--input"
                        type="url" placeholder="URL de la nueva foto" id="input-url-image">
                    <button
                        class="main__left-side__profile-container__profile-picture-container__profile-picture-url--btn" id="btn-image" data-id=${user.id}>Cambiar</button>
                </div>
            </div>
            <div class="main__left-side__profile-container__name-container">
                <p class="main__left-side__profile-container__name-container__title">Tu nombre</p>
                <div class="main__left-side__profile-container__name-container__edit-name-container">
                    <p class="main__left-side__profile-container__name-container__edit-name-container--name">${user.name}</p>
                    <input type="text"
                        class="main__left-side__profile-container__name-container__edit-name-container--input" id="input-name">
                    <img src="https://www.svgrepo.com/show/501933/edit-major.svg" alt="edit icon"
                        class="main__left-side__profile-container__name-container__edit-name-container--icon-edit edit-name">
                </div>
                <button class="main__left-side__profile-container__name-container--save-changes" id="btn-name" data-id=${user.id}>Guardar
                    cambios</button>
            </div>
            <div class="main__left-side__profile-container__status-container">
                <p class="main__left-side__profile-container__status-container__title">Tu estado</p>
                <div class="main__left-side__profile-container__status-container__edit-status-container">
                    <p class="main__left-side__profile-container__status-container__edit-status-container--status">${user.info}</p>
                    <input type="text"
                        class="main__left-side__profile-container__status-container__edit-status-container--input" id="input-info">
                    <img src="https://www.svgrepo.com/show/501933/edit-major.svg" alt="edit icon"
                        class="main__left-side__profile-container__status-container__edit-status-container--icon-edit edit-info">
                </div>
                <button class="main__left-side__profile-container__status-container--save-changes" id="btn-info" data-id=${user.id}>Guardar
                    cambios</button>
            </div>
            <div class="main__left-side__profile-container__sign-off">
                <button id="btnSignOff">Cerrar sesión</button>
            </div>
    `;

    const editImage = document.querySelectorAll('.edit-image');
    const containerInputImage = document.getElementById('container__image-input');
    const editName = document.querySelector('.edit-name');
    const inputName = document.getElementById('input-name');
    const btnName = document.getElementById('btn-name');
    const editInfo = document.querySelector('.edit-info');
    const inputInfo = document.getElementById('input-info');
    const btnInfo = document.getElementById('btn-info');
    const closeUserProfileBtn = document.getElementById('closeProfile')
    const viewUserProfileBtn = document.getElementById('userProfilePicture')
    const btnSignOff = document.getElementById('btnSignOff');

    editImage.forEach(button => {
        button.addEventListener('click', () => {
            containerInputImage.classList.toggle('edit-active-view')
            const inputUrlImage = document.getElementById('input-url-image')
            const btnImage = document.getElementById('btn-image');
            btnImage.addEventListener('click', () => {
                const idUser = btnName.getAttribute('data-id');
                editInfoUser(inputUrlImage.value, idUser, 'image') 
            });
        });
    });

    editName.addEventListener('click', () =>{
        inputName.classList.toggle('active-view');
        btnName.classList.toggle('active-view');
        inputName.value = user.name;
        btnName.addEventListener('click', () => {

            const idUser = btnName.getAttribute('data-id');
            editInfoUser(inputName.value, idUser, 'name');
        });
    });

    editInfo.addEventListener('click', () => {
        inputInfo.classList.toggle('active-view');
        btnInfo.classList.toggle('active-view');
        inputInfo.value = user.info;
        btnInfo.addEventListener('click', () => {
            const idUser = btnName.getAttribute('data-id');
            editInfoUser(inputInfo.value, idUser, 'info');
        });
    });

    viewUserProfileBtn.addEventListener('click', () => {
        container.classList.add('active-view')
    })

    closeUserProfileBtn.addEventListener('click', () => {
        container.classList.remove('active-view')
    })

    signOff(btnSignOff)
}


export default printInfoUsers;