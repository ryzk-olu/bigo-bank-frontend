import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};


const INPUT_STYLES = `
  w-full
  border
  border-gray-200
  rounded-lg
  p-3
  mb-4
  bg-surface
  text-text
  focus:outline-none
  focus:ring-2
  focus:ring-primary
`;


export default function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();


  const [form, setForm] =
    useState(INITIAL_FORM_STATE);


  const [error, setError] =
    useState<string | null>(null);


  const [isLoading, setIsLoading] =
    useState(false);



  const redirectPath =
    location.state?.from?.pathname
    ?? "/dashboard";



  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {

    const {
      name,
      value,
    } = event.target;


    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }



  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    if (!form.username || !form.password) {

      setError(
        "Username and password are required."
      );

      return;
    }


    setError(null);

    setIsLoading(true);



    try {

      await login(form);


      navigate(
        redirectPath,
        {
          replace: true,
        }
      );


    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Unable to login."
      );


    } finally {

      setIsLoading(false);

    }

  }



  return (

    <main
      className="
        min-h-screen
        bg-background
        flex
        items-start
        justify-start
        p-4
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-surface
          rounded-2xl
          shadow-lg
          p-8
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-primary
            text-center
            mb-6
          "
        >
          BigO-Bank
        </h1>



        {error && (

          <div
            role="alert"
            className="
              text-error
              bg-error-background
              rounded-lg
              p-3
              mb-4
            "
          >
            {error}
          </div>

        )}



        <label
          htmlFor="username"
          className="
            block
            mb-2
            text-sm
            font-medium
            text-text
          "
        >
          Username
        </label>


        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter username"
          className={INPUT_STYLES}
        />



        <label
          htmlFor="password"
          className="
            block
            mb-2
            text-sm
            font-medium
            text-text
          "
        >
          Password
        </label>


        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          className={INPUT_STYLES}
        />



        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            bg-primary
            hover:bg-primary-dark
            text-white
            rounded-lg
            p-3
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          {isLoading
            ? "Signing in..."
            : "Login"}

        </button>


      </form>

    </main>

  );
}
