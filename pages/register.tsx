import { useRouter } from "next/router";
import Layout from "../layouts/Main";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7207/api/Users/Register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      if (response.status === 200) {
        router.push("/login");
        console.log(response.data, "user registered successfully");
      } else {
        console.log(response.data, "cannot register user");
      }
    } catch (error: any) {
      if (error.response.data.email) {
        console.log("cannot register user");
        alert(error.response.data.email[0]);
      } else {
        alert("cannot register user" + error.response.data[0]);
      }
    }
  };
  return (
    <Layout>
      <section className="form-page">
        <div className="container ">
          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            <p className="form-block__description"></p>

            <form className="form" onSubmit={registerUser}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p>I agree to the Service and Privacy Policy</p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">Are you already a member?</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
