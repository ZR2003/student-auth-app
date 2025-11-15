import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Auth App
          </h1>
          {session ? (
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                Hello, {session.user?.name}! You are successfully signed in.
              </p>
              <div className="space-x-4">
                <Link
                  href="/main"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
                >
                  Go to Main Page
                </Link>
                <Link
                  href="/dynamic/1"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
                >
                  Go to Dynamic Page
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                Please sign in to access protected pages.
              </p>
              <Link
                href="/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
