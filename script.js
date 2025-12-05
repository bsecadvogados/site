document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DADOS GEOGRÁFICOS DAS UNIDADES BSC ---
    const headquarters = { name: "Palmas (Matriz)", lat: -10.2491, lng: -48.3243, color: "#00ff00" }; // Verde Neon

    const branches = [
        { name: "Arraias-TO", lat: -12.9287, lng: -46.9437 },
        { name: "Porto Alegre-RS", lat: -30.0346, lng: -51.2177 },
        { name: "Ibirubá-RS", lat: -28.6275, lng: -53.0897 },
        { name: "Salvador-BA", lat: -12.9777, lng: -38.5016 },
        { name: "LEM-BA", lat: -12.0933, lng: -45.7725 }, // Luís Eduardo Magalhães
        { name: "Sinop-MT", lat: -11.8642, lng: -55.5056 },
        { name: "Rondonópolis-MT", lat: -16.4674, lng: -54.6368 },
        { name: "Sonora-MS", lat: -17.5746, lng: -54.7478 },
        { name: "Brasília-DF", lat: -15.7975, lng: -47.8919 },
        { name: "Belo Horizonte-MG", lat: -19.9167, lng: -43.9345 },
        { name: "Joinville-SC", lat: -26.3045, lng: -48.8487 },
        { name: "Orlando-USA", lat: 28.5383, lng: -81.3792, isIntl: true }
    ];

    // --- 2. CONFIGURAR O GLOBO 3D ---
    // Usamos a biblioteca Globe.gl injetada no HTML
    const world = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Textura "Earth at Night"
        .backgroundColor('#05100e') // Cor de fundo (Espaço)
        .arcColor(() => '#d4af37') // Cor das linhas (Dourado)
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(2000) // Velocidade da animação das linhas
        .arcStroke(0.5)
        .labelsData([headquarters, ...branches]) // Cidades
        .labelLat(d => d.lat)
        .labelLng(d => d.lng)
        .labelText(d => d.name)
        .labelSize(d => d.name.includes("Matriz") ? 2.5 : 1.5)
        .labelDotRadius(d => d.name.includes("Matriz") ? 1.2 : 0.6)
        .labelColor(d => d.name.includes("Matriz") ? '#00ff00' : '#ffffff')
        .labelResolution(2)
        .arcsData(branches.map(branch => ({
            startLat: headquarters.lat,
            startLng: headquarters.lng,
            endLat: branch.lat,
            endLng: branch.lng
        })))
        (document.getElementById('globeViz'));

    // --- 3. AJUSTES DE CÂMERA E CONTROLES ---
    // Posicionar a câmera sobre a América do Sul/Central
    world.pointOfView({ lat: -10, lng: -55, altitude: 1.8 });

    // Habilitar rotação automática suave
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;

    // Ajustar tamanho ao redimensionar a janela
    window.addEventListener('resize', () => {
        world.width(document.getElementById('globeViz').offsetWidth);
        world.height(700);
    });
});
