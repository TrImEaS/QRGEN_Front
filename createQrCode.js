import qrcode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'

export async function createCode() {
  try {
    const htmlName = uuidv4().replace(/-/g, '').slice(0, 16);
    const randomCode = getRandomInt()

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <div class="container">
          <span id="randomCode"></span>
          <span id="id">${randomCode}</span>
        </div>
        <script type="module" src="app.js"></script>
      </body>
    </html>
  `;
    return { validationCode: randomCode, htmlContent: htmlContent, name: htmlName };
  } catch (error) {
    console.error('Error al generar HTMLCode:', error);
    throw error;
  }
}

export async function createQR({ name }) {
  try {
    const QR = await qrcode.toDataURL(`https://technologyline.com.ar/admin/QRGen-App/api/${name}.html`)
    return {QR, htmlLink: `https://technologyline.com.ar/admin/QRGen-App/api/${name}.html`};
  } 
  catch (error) {
    console.error('Error al generar QR:', error);
    throw error;
  }
}

function getRandomInt() {
  try {
    const min = 100000; // Mínimo valor de un número de 6 dígitos
    const max = 999999; // Máximo valor de un número de 6 dígitos
    const generatedNumbers = new Set(); // Conjunto para almacenar números generados

    while (true) {
      const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

      // Verificar si el número ya fue generado previamente
      if (!generatedNumbers.has(randomInt)) {
        generatedNumbers.add(randomInt); // Agregar el número al conjunto de números generados
        return randomInt; // Devolver el número único
      }
    }
  } catch (error) {
    console.error('Error al generar número aleatorio único:', error);
    throw error;
  }
}