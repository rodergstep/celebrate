export default async function ProfilePage() {
  const userData = await getData();

  return (
    <div>
      <h1>Hello, {userData.email}</h1>
    </div>
  );
}

async function getData() {
  const res = await fetch('http://localhost:3001/api/user/4');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
