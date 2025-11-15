import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  
  return res.json();
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  // Protect route - server side
  if (!session) {
    redirect("/signin");
  }

  const post = await getPost(params.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dynamic Page</h1>
        <p className="text-gray-600 mb-6">
          Welcome, {session.user?.name}! This is a dynamic server-rendered page for ID: {params.id}
        </p>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Fetched Post:</h2>
          <div className="space-y-4">
            <h3 className="font-medium text-2xl text-gray-900">{post.title}</h3>
            <p className="text-gray-600 mt-2 text-lg">{post.body}</p>
            <div className="text-sm text-gray-500 mt-4">
              <p>Post ID: {post.id}</p>
              <p>User ID: {post.userId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}