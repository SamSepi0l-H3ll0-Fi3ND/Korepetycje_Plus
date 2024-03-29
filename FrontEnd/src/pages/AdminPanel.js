import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect } from "react";
import { useState } from "react";
import API from "../env";
import ReviewWithDelete from "../components/ReviewWithDelete";
import AdWithDelete from "../components/AdWithDelete";
import UserCard from "../components/UserCard"
const AdminPanel = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [announcements, setAnnouncements] = useState();
  const [reviews, setReviews] = useState();

  const deleteUser = (id) => setUsers(users.filter(user => user.id !== id));
  const deleteAnnouncement = (id) => setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  const deleteReview = (id) => setReviews(reviews.filter(review => review.id !== id));


    useEffect(() => {
      try {
      fetch(`${API}/User/myaccount`, {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Tajny numerek"),
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));

      fetch(`${API}/Announcements`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setAnnouncements(data));

      fetch(`${API}/User`, {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Tajny numerek"),
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {setUsers(data); console.log(users);});

      fetch(`${API}/Review`, {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Tajny numerek"),
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {setReviews(data)});
    } catch (error) {
      console.log(error, error.message);
    }
    }, []);


  return (
    <div className="bg-white h-screen">
      <Nav></Nav>
      <div className="flex flex-wrap justify-center h-62 bg-dark-blue text-light-blue border-solid border-8 border-white w-full">
        <div className="bg-dark-blue text-light-blue w-full">
          <Link state={user} to="/useredit">
            <SettingsIcon />
          </Link>
        </div>
        <div className="text-4xl text-white justify-center mb-8">
          Panel administracyjny
        </div>
      </div>

      <div className="w-full bg-light-blue h-fit text-dark-blue p-10  border-solid border-8 border-white">
        <p className="text-3xl mb-2">Użytkownicy:</p>
        <div className="grid grid-cols-7 gap-4 mt-8 rounded-md text-center bg-dark-blue text-white m-10">
          <div className="flex flex-col space-y-2 ">
            <p className="text-white text-2xl"> Imię </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-white text-2xl"> Nazwisko </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-white text-2xl"> Miasto </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-white text-2xl"> Ocena  </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-white text-2xl"> Email </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-white text-2xl"> Telefon </p>
          </div>
        </div>
        <div className="max-h-96 overflow-y-scroll">
          {users?.map(user => <UserCard key={"user" + user.id} user={user} delete={deleteUser} />)}
        </div>
      </div>
      <div className="w-full bg-light-blue h-fit text-dark-blue p-10  border-solid border-8 border-white">
        <p className="text-3xl mb-2">Ogłoszenia:</p>
        <div className="max-h-96 overflow-y-scroll">
          {announcements?.map((item) => <AdWithDelete key={"ad" + item.id} adData={item} deleteAnnouncement={deleteAnnouncement}/>)}
        </div>

      </div>
      <div className="w-full bg-light-blue h-fit text-dark-blue p-10  border-solid border-8 border-white">
        <p className="text-3xl mb-2">Opinie:</p>
        <div className="max-h-96 overflow-y-scroll">
          {reviews?.map(review => <ReviewWithDelete key={"rev" + review.id} review={review} delete={deleteReview} />)}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
