import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function NotFoundPage() {
  return (
    <MainLayout>
      <main className="flex flex-col items-center justify-center w-full max-w-xl mx-auto my-20 p-10 bg-[#061C1A] text-[#B68D67] text-center shadow-lg font-[Greethen]">
        <h1 className="text-5xl mb-6">404 - Page Not Found</h1>
        <p className="mb-8 text-xl">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-[#B68D67] text-[#061C1A] rounded-md font-semibold hover:bg-[#a87c52] transition">
          Go to Home
        </Link>
      </main>
    </MainLayout>
  );
}

export default NotFoundPage;
