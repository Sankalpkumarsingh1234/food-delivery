const url = 'http://localhost:4000';

async function postJson(path, body) {
  const resp = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json().catch(() => ({}));
  return { status: resp.status, data };
}

async function test() {
  try {
    console.log('Testing register...');
    const registerResp = await postJson('/api/user/register', {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('Register response:', registerResp.status, registerResp.data);

    console.log('Testing login...');
    const loginResp = await postJson('/api/user/login', {
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('Login response:', loginResp.status, loginResp.data);
  } catch (err) {
    console.error('Request error:', err?.message || err);
    process.exit(1);
  }
}

test();
