type RegisterOptions = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type LoginOptions = {
  username: string;
  password: string;
};

export async function signup(data: RegisterOptions) {
  const res = await fetch('http://localhost:3000/api/v1/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const result = await res.json();
  return result;
}

export async function login(data: LoginOptions) {
  const res = await fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const result = await res.json();
  return result;
}

export function logout() {}
