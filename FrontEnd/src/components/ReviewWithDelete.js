import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
import API from "../env";

const ReviewWithDelete = ({review, delete: del}) => {

  const deleteReview = () => {
    fetch(`${API}/Review/${review.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + localStorage.getItem("Tajny numerek"),
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) del(review.id);
      })
  };

  return (
    <div
    className="h-auto bg-dark-blue text-white rounded-md w-auto shadow-[0_0_16px_0_rgba(0,0,0,0.5)] text-dark-blue m-10"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col sm:basis-10/12">
          <div className="flex sm:justify-left mt-4">
          <AccountCircleIcon class="justify-center w-16 ml-12 fill-[#ffffff]"/><p className="text-2xl ml-6 mt-4">{review.author.firstName} {review.author.lastName}</p>
            <div className="">
            <button className="btn bg-light-blue hover:bg-rose-800 text-dark-blue btn-sm ml-4" onClick={deleteReview}>
              Usuń opinie
            </button>
            {/* <Link to="/editAnnouncements">
              <button className="btn bg-light-blue hover:bg-yellow-600 text-dark-blue btn-sm ml-4">
                Modyfikuj opinie
              </button>
            </Link> */}
            </div>
          </div>
          <div className="flex justify-left p-6">
            <p className="ml-10 mb-10">
                {review.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col mr-20 mt-6">
          <div className="flex flex-col mt-2 flex-end sm:basis-2/12">
            <div className="flex justify-center m-2 ml-10">
              <p className="text-2xl ml-6">Ocena</p>
            </div>
            <div className="flex justify-center m-2">
              <StarIcon class="justify-center w-8 ml-12 fill-[#ffffff]"></StarIcon><p className="text-2xl ml-6">{review.rate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWithDelete;
