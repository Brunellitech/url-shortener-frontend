document.getElementById('btnEncurtar').addEventListener('click', async () => {
    const urlOriginal = document.getElementById('inslink').value;
    const resultado = document.getElementById('resultado');

    if (!urlOriginal.trim()) {
        resultado.textContent = "X Digite uma URL antes de encurtar!";
        resultado.style.color = "red";
        return;
    }

    try {
        const response = await fetch('https://incurta.onrender.com/encurtar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url_original: urlOriginal })
        });

        const data = await response.json();

        if (!response.ok) {
            resultado.textContent = "X" + data.erro;
            resultado.style.color = "red";
            return;
        }

        const shortUrl = `https://incurta.onrender.com/${data.short}`;

        resultado.style.color = "black";
        resultado.innerHTML = `
            <p><strong>URL inCurtada:</strong></p>
            <a href="${shortUrl}" target="_blank" class="link-final">${shortUrl}</a>
            <button id="copiarBtn">Copiar link</button>
        `;

        document.getElementById('copiarBtn').addEventListener('click', () => {
            navigator.clipboard.writeText(shortUrl);
            document.getElementById('copiarBtn').textContent = "Copiado! ✔️";
        });

    } catch (e) {
        resultado.textContent = "X Erro de conexão com o servidor.";
        resultado.style.color = "red";
    }
});
