import add from "../img/addAvatar.png";
import "../style.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";



const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };


  return (
  <>
      <Loading />
      <div className="form_container">
        <div className="form">
          <h1> Sherif Altiby Chat </h1>
          <h2> Register </h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Emain" />
            <input type="password" placeholder="Password" />
            <div className="input">
              <label htmlFor="avatar">
                <img src={add} alt="" /> <p> Add Avatar </p>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="avatar"
                placeholder="Add Avatar"
              />
            </div>
            <input type="submit" value="Sign Up" className="btn" />
            {err && <span> Something went wrong </span>}
          </form>
          <p>
            You have an account? <Link to="/login"> Login </Link>
          </p>
        </div>
      </div>
  </>
  );
};

export default Register;





