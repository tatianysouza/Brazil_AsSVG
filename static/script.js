
document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estado');
    const municipioSelect = document.getElementById('municipio');
    const mapa = document.getElementById('mapa');

    fetch('/estados')
        .then(res => res.json())
        .then(estados => {
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        });

    estadoSelect.addEventListener('change', () => {
        municipioSelect.innerHTML = '<option value="">Selecione um município</option>';
        const estadoId = estadoSelect.value;

        if (estadoId) {
            fetch(`/municipios/${estadoId}`)
                .then(res => res.json())
                .then(municipios => {
                    municipioSelect.disabled = false;
                    municipios.forEach(municipio => {
                        const option = document.createElement('option');
                        option.value = municipio.nome;
                        option.textContent = municipio.nome;
                        municipioSelect.appendChild(option);
                    });
                });
        } else {
            municipioSelect.disabled = true;
        }
    });

    municipioSelect.addEventListener('change', () => {
        const estadoNome = estadoSelect.options[estadoSelect.selectedIndex].text;
        const municipioNome = municipioSelect.value;

        if (estadoNome && municipioNome) {
            fetch(`/svg/${estadoNome}/${municipioNome}`)
                .then(res => res.json())
                .then(data => {
                    mapa.setAttribute('viewBox', data.viewBox);
                    mapa.querySelectorAll('path')[0].setAttribute('d', data.pathestado);
                    mapa.querySelectorAll('path')[1].setAttribute('d', data.pathmunicipios);
                });
        }
    });
});
