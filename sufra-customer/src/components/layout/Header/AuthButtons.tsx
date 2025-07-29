import { lazy ,Suspense , useState } from 'react';
import { HashLoader } from 'react-spinners';

const LoginModal = lazy(() => import("@components/auth/LoginModal"));
const RegisterModal = lazy(()=> import("@components/auth/RegisterModal"))

function AuthButtons() {
  const [activeModal, setActiveModal] = useState<null | "login" | "register">(null);

  return (
    <div id='guest' className="flex space-x-2 lg:space-x-4 font-[caughe] text-xs lg:text-lg">
      <button onClick={() => setActiveModal("login")} className="rounded-4xl bg-transparent border text-[#A07E5D] border-[#B68D67] px-2 lg:px-4 py-1 lg:py-2  hover:bg-[#B68D67] hover:text-white transition">
        Login
      </button>
      <button onClick={() => setActiveModal("register")} className="rounded-4xl bg-[#B68D67] border border-[#B68D67] px-2 lg:px-4 py-1 lg:py-2 hover:bg-transparent transition">
        Register
      </button>

      {activeModal === "login" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <LoginModal onClose={() => setActiveModal(null)} onSwitch={()=> setActiveModal("register")} />
        </Suspense>
      )}

      {activeModal === "register" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <RegisterModal onClose={() => setActiveModal(null)} onSwitch={()=> setActiveModal("login")} />
        </Suspense>
      )}
    </div>
  )
}

export default AuthButtons