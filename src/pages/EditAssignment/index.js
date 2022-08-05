import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDropDownIcon } from "../../components/icon";
import { useParams } from "react-router-dom";
import assignmentService from "./../../api/assignmentService";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { toast } from "react-toastify";
import SelectUser from "../CreateAssignment/SelectUser";
import SelectAsset from "../CreateAssignment/SelectAsset";

const EditAssignment = () => {
  const navigate = useNavigate();
  const { assignmentCode } = useParams();

  const [user, setUser] = useState("user");
  const [asset, setAsset] = useState("asset");
  const [assignedDate, setAssignedDate] = useState("2022-08-05");
  const [note, setNote] = useState("bjdf");

  useEffect(() => {
    Loading.standard("Loading...");

    assignmentService
      .getAssignmentById(assignmentCode)
      .then((res) => {
        // setUser(res.data.user);
        // setAsset(res.data.asset);
        // setAssignedDate(res.data.assignedDate);
        // setNote(res.data.note);

        Loading.remove();
      })
      .catch((error) => {
        console.log(error);
        Loading.remove();
      });
  }, []);

  const handleEditAssignment = () => {
    if (user && asset && assignedDate && note) {
      const payload = {
        user,
        asset,
        assignedDate,
        note,
      };
      console.log(payload);

      Loading.hourglass("Editing assignment...");

      assignmentService
        .editAssignment(assignmentCode, payload)
        .then((res) => {
          if (res.status === 200) {
            toast.success("SUCCESSFULLY EDIT!!");
            localStorage.setItem("newAsset", res.data.id);
            navigate("/manage-assignment");
            Loading.remove();
          }
        })
        .catch((error) => {
          console.log(error);
          Loading.remove();
          toast.error("EDIT FAILED!!");
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleCancelAssignment = () => {
    navigate("/manage-assignment");
  };

  return (
    <>
      <div className="form-create-asset">
        <div className="form-create-asset__container">
          <h2 className="form-create-asset__title">Edit Assignment</h2>

          <div className="form-create-asset__input-wrapper">
            <label for="user">User</label>
            <div>
              <button
                id="user"
                className="btn border w-100 d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                data-bs-target="#selectUserModal"
              >
                {user}
                <ArrowDropDownIcon />
              </button>
              <SelectUser />
            </div>

            <label for="asset">Asset</label>
            <div>
              <button
                id="asset"
                className="btn border w-100 d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                data-bs-target="#selectUserModal"
              >
                {asset}
                <ArrowDropDownIcon />
              </button>
              <SelectAsset />
            </div>

            <label for="assignedDate">Assignment Date</label>
            <div>
              <input
                type="date"
                id="assignedDate"
                className="form-create-asset__input"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
              ></input>
            </div>

            <label for="note">Note</label>
            <div>
              <textarea
                type="text"
                id="note"
                className="form-create-asset__input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-create-asset__button-wrapper">
            <button
              id="save"
              className="form-create-asset__button-item"
              onClick={handleEditAssignment}
              disabled={!(user && asset && assignedDate && note)}
            >
              Save
            </button>
            <button
              id="cancel"
              className="form-create-asset__button-item"
              onClick={handleCancelAssignment}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAssignment;
