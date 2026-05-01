exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: 'Error: API Key no configurada. Contáctanos: +52 55 3884 3149' })
    };
  }

  let messages;
  try {
    const body = JSON.parse(event.body);
    messages = (body.messages || []).slice(-10).filter(
      m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string'
    );
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ reply: 'Error al procesar tu mensaje.' }) };
  }

  const GYM_SYSTEM = `Eres el asistente virtual de Fitness Factory Gym en Ciudad de Mexico. Responde en español, breve y amable. COSTOS: Visita $70 | Semana $200 | Mensualidad $500 | Trimestre $1,400 | Semestre $3,000 | Anualidad $5,000 MXN. HORARIOS: Lun-Vie 5:30am-10:30pm | Sabado 8am-5pm | Domingo 8am-2pm. COACHES: Luis Julian Zarate WhatsApp +52 55 3884 3149, Daniel Paz, Arturo Yedra.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: GYM_SYSTEM,
        messages: messages
      })
    });

    const data = await response.json();
    if (data.error) {
      return { statusCode: 200, body: JSON.stringify({ reply: 'Error: ' + data.error.message }) };
    }
    const reply = data.content && data.content[0] ? data.content[0].text : 'WhatsApp: +52 55 3884 3149';
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reply }) };
  } catch (err) {
    return { statusCode: 200, body: JSON.stringify({ reply: 'Error de conexion. WhatsApp: +52 55 3884 3149' }) };
  }
};
