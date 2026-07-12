import { useAuth } from "../context/AuthContext";


export default function Dashboard() {

  const {
    user,
    logout,
  } = useAuth();


  return (
    <div
      className="
        min-h-screen
        bg-background
        p-10
      "
    >

      <div
        className="
          bg-surface
          rounded-2xl
          shadow-lg
          p-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-primary
          "
        >
          Dashboard
        </h1>


        <p
          className="
            mt-4
            text-text
          "
        >
          Welcome {user?.firstName}
        </p>


        <button
          onClick={logout}
          className="
            mt-6
            bg-primary
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Logout
        </button>


      </div>

    </div>
  );
}
