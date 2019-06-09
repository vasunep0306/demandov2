import axios from "axios";

export const sendErrorReport = errorObject => {
  axios
    .post(`/api/users/getErrors`, errorObject)
    .then(res => {
      alert("Thank you! Our development team has been notified.");
      window.location.href = "/";
    })
    .catch(err => {
      alert("Something went wrong");
      window.location.href = "/";
    });
};
