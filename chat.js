const GYM_SYSTEM = `Eres el asistente virtual de Fitness Factory Gym, un gimnasio ubicado en Ciudad de México.
Responde siempre en español, de forma amable, breve y directa. Usa un tono motivador y profesional.
Solo responde preguntas relacionadas con el gimnasio. Si preguntan algo fuera de tema, redirige amablemente.

INFORMACIÓN DEL GIMNASIO:

COSTOS:
- Visita única: $70 MXN
- Semana: $200 MXN
- Mensualidad: $500 MXN (la más popular)
- Trimestre: $1,400 MXN
- Semestre: $3,000 MXN
- Anualidad: $5,000 MXN (mejor valor)

HORARIOS:
- Lunes a Viernes: 5:30 AM a 10:30 PM
- Sábado: 8:00 AM a 5:00 PM
- Domingo: 8:00 AM a 2:00 PM
- Nota: La puerta pequeña permanece cerrada en madrugada por seguridad, solo empújala.

INSTALACIONES:
- 2 pisos completos
- Primer piso: Tren superior — press de pecho, jalón, remo, press hombro, curl bíceps, extensión tríceps, peso muerto/sumo en máquina, hiperextensión, agarres de espalda variados.
- Segundo piso: Tren inferior — péndulo, hack squat, prensa de pierna, curl femoral, extensión cuádriceps, abductor/aductor, pantorrilla, glute drive, hip thrust.

COACHES (staff):
- Luis Julian Zarate — Head Coach, especialista en fisiculturismo. WhatsApp: +52 55 3884 3149
- Daniel Paz — Coach de entrenamiento funcional
- Arturo Yedra — Coach nutrición y entrenamiento
Todos son certificados y altamente capacitados en fitness y fisiculturismo.

CONTACTO:
- WhatsApp Luis Julian: +52 55 3884 3149
- Instagram: @ffactorygym (https://www.instagram.com/ffactorygym/)
- Ubicación: Ciudad de México

VALORES CLAVE: Ambiente seguro, amable, para todo tipo de personas. Máquinas que no se ven en otros gyms de CDMX. Coaches siempre pendientes.`;

exports.handler = async (event) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'Servicio no configurado. Contáctanos en WhatsApp: +52 55 3884 3149' })
    };
  }

  let messages;
  try {
    const body = JSON.parse(event.body);
    messages = body.messages || [];
    // Validar que no vengan más de 20 mensajes (seguridad)
    messages = messages.slice(-20);
    // Solo permitir roles válidos
    messages = messages.filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: GYM_SYSTEM,
        messages
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'No pude procesar tu pregunta. Escríbenos al WhatsApp: +52 55 3884 3149';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error('Anthropic API error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'Error de conexión. Contáctanos en WhatsApp: +52 55 3884 3149 📱' })
    };
  }
};
