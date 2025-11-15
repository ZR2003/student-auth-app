import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
}

export default async function MainPage() {
  const session = await getServerSession(authOptions);

  // Protect route - server side
  if (!session) {
    redirect("/signin");
  }

  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Main Page</h1>
        <p className="text-gray-600 mb-6">
          Welcome, {session.user?.name}! This is a protected server-rendered page.
        </p>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Fetched Data from API:</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium text-lg text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}