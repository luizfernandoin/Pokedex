async function getImage(username) {
    const githubUrl = `https://api.github.com/users/${username.usuario}`;
    const response = await fetch(githubUrl);
    const image = await response.json();
    
    createCard(username.nome, image.avatar_url);
}

function createCard(nome, url) {
    const cardContainer = document.querySelector('.footer-aboult');

    const card = document.createElement('div');
    card.className = 'footer-aboult-main';

    const img = document.createElement('img');
    img.src = url;
    img.alt = nome;

    const details = document.createElement('div');
    details.className = 'details';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = nome;

    const jobSpan = document.createElement('span');
    jobSpan.className = 'job';
    jobSpan.textContent = "Idealizador e Desenvolvedor";

    const detailsText = document.createElement('div');
    detailsText.className = 'details-text';

    const p = document.createElement('p');
    p.textContent = "Estudante de Análise e Desenvolvimento de Sistemas e Técnico em Informática pelo Instituto Federal de Educação, Ciência e Tecnologia da Paraíba - IFPB, Campus Cajazeiras (2022).";

    detailsText.appendChild(p);
    details.appendChild(nameSpan);
    details.appendChild(jobSpan);
    details.appendChild(detailsText);

    card.appendChild(img);
    card.appendChild(details);

    cardContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', function () {
    const usernames = [
        {usuario: 'luizfernandoin', nome: "Luiz Fernando"},
        {usuario: 'JAndersonArruda', nome: "Anderson Arruda"}
    ];

    usernames.forEach(username => {
        getImage(username);
    });
});