import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import Modal from "../components/Modal";
import { setIsEditing, setIsModalOpen } from "../slices/formSlice";
import Profile from "../components/profile/Profile";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";

export default function ProfilePage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isEditing, isModalOpen } = useSelector((state) => state.form);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await makeRequest(
        "https://dinesync-seamlessdining.onrender.com/api/users/profile",
        "GET",
        null,
        true
      );
      setProfile(response);
      setFormData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    dispatch(setIsModalOpen(true));
    setFormData(profile);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeRequest(
        "https://dinesync-seamlessdining.onrender.com/api/users/profile",
        "PUT",
        formData,
        true
      );
      dispatch(setIsModalOpen(false));
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen pb-20`}
    >
      <div className="text-end mr-6 pt-6 text-white">
        <button
          onClick={handleEdit}
          className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Edit Profile
        </button>
      </div>
      <div className="container mx-auto p-6 pt-4">
        {loading ? (
          <div className="text-center text-xl">
            <ProfileSkeleton />
          </div>
        ) : (
          <Profile profile={profile} />
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => dispatch(setIsModalOpen(false))}
            title="Update Profile"
          >
            <ProfileForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
