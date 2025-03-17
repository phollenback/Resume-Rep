export async function getResumes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes`);
  return res.json();
} 