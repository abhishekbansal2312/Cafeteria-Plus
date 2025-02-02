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
        "http://localhost:3000/api/users/profile",
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
        "http://localhost:3000/api/users/profile",
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

  if (loading)
    return (
      <div className="text-center text-xl">
        <ProfileSkeleton />
      </div>
    );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen pb-20`}
    >
      <div className="container mx-auto p-6 pt-12">
        <Profile profile={profile} />

        <div className="text-center mt-6">
          <button
            onClick={handleEdit}
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>

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
