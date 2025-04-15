(function() {
  const API_URL = 'https://[nombre].vercel.app/api/status';
  
  function createOverlay(message) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      max-width: 600px;
      padding: 2rem;
    `;
    
    const title = document.createElement('h1');
    title.textContent = 'Sitio Suspendido';
    title.style.cssText = `
      font-size: 2rem;
      margin-bottom: 1rem;
    `;
    
    const text = document.createElement('p');
    text.textContent = message || 'Este sitio se encuentra temporalmente suspendido. Por favor, contacte al administrador.';
    text.style.cssText = `
      font-size: 1.2rem;
      line-height: 1.5;
    `;
    
    content.appendChild(title);
    content.appendChild(text);
    overlay.appendChild(content);
    
    return overlay;
  }

  async function checkPaymentStatus() {
    try {
      const response = await fetch(API_URL, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-store'
        }
      });
      
      const data = await response.json();
      
      if (data.paymentStatus !== 'completed') {
        const overlay = createOverlay(data.message);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }

  // Ejecutar la verificación cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkPaymentStatus);
  } else {
    checkPaymentStatus();
  }
})(); 