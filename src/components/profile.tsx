"use client";
import { editUserData } from "@/lib/account";
import { Account, Payload } from "@models/authmodel";
import { useEffect, useState, useRef, FormEvent } from "react";

interface ProfileProps {
  payload: Payload;
  userInfo: Account;
}

const Profile: React.FC<ProfileProps> = ({ payload, userInfo }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form state to track changes
  const [formData, setFormData] = useState({
    name: userInfo.name || "",
    email: payload.email || "",
    city: userInfo.city || "",
    country: userInfo.country || "",
    gender: userInfo.gender || "Non specified",
    birthdate: userInfo.birthdate || undefined,
  });

  useEffect(() => {
    console.log("User info changed:", userInfo);

    // Reset form data when userInfo changes
    setFormData({
      name: userInfo.name || "",
      email: payload.email || "",
      city: userInfo.city || "",
      country: userInfo.country || "",
      gender: userInfo.gender || "Non specified",
      birthdate: userInfo.birthdate || undefined,
    });
  }, [userInfo, payload]);

  // Set up the beforeunload event handler when in editing mode with modifications
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (editingProfile && isFormModified) {
        event.preventDefault();
        event.returnValue = ""; // Required for Chrome
        return ""; // Required for legacy browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editingProfile, isFormModified]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Special handling for birthdate
    if (name === "birthdate") {
      setFormData((prev) => ({
        ...prev,
        birthdate: value ? new Date(value) : undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setIsFormModified(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "editAccount",
          data: { ...formData, id: payload.id },
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");

        // Set flags to prevent the "unsaved changes" warning
        setIsFormModified(false);
        setEditingProfile(false);

        // Use a small timeout to ensure React state updates before reload
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        console.error("Error updating profile:", response.statusText);
        // Handle specific error cases here if needed
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    if (isFormModified) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?",
      );
      if (confirmed) {
        // Reset form data to original values
        setFormData({
          name: userInfo.name || "",
          email: payload.email || "",
          city: userInfo.city || "",
          country: userInfo.country || "",
          gender: userInfo.gender || "Non specified",
          birthdate: userInfo.birthdate || undefined,
        });
        setIsFormModified(false);
        setEditingProfile(false);
      }
    } else {
      setEditingProfile(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmed) {
      // Call delete account function
      // await deleteAccount(payload.id);
      console.log("Deleting account", payload.id);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="center-flex mt-1 flex w-full flex-col gap-6">
      {!editingProfile ? (
        <div className="center-flex w-full flex-col gap-2">
          <input
            className={`"input-ghost cursor-text text-center text-3xl ${(userInfo.name ?? "") !== "" ? "" : "text-gray-300/50 italic"}`}
            type="text"
            placeholder="Name"
            defaultValue={
              (userInfo.name ?? "") !== "" ? userInfo.name : "No name yet"
            }
            disabled
          ></input>
          <p className="text-light">{payload.email}</p>
          <div className="divider bg-light/20 my-2 h-0.5 w-2/3 self-center" />
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">City</span>
            <input
              className={`"input-ghost ${(userInfo.city ?? "") !== "" ? "" : "text-gray-300/50 italic"}`}
              type="text"
              placeholder="City"
              defaultValue={
                (userInfo.city ?? "") !== "" ? userInfo.city : "Missing"
              }
              disabled
            />
          </label>
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Country</span>
            <input
              className={`"input-ghost ${(userInfo.country ?? "") !== "" ? "" : "text-gray-300/50 italic"}`}
              type="text"
              placeholder="Country"
              defaultValue={
                (userInfo.country ?? "") !== "" ? userInfo.country : "Missing"
              }
              disabled
            />
          </label>
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Gender</span>
            <input
              className={`"input-ghost ${(userInfo.gender ?? "") !== "" ? "" : "text-gray-300/50 italic"}`}
              type="text"
              placeholder="Gender"
              defaultValue={
                (userInfo.gender ?? "") !== "" ? userInfo.gender : "Missing"
              }
              disabled
            />
          </label>
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Birth date</span>
            <input
              className={`"input-ghost ${(userInfo.birthdate ?? "") !== "" ? "" : "text-gray-300/50 italic"}`}
              type="text"
              defaultValue={
                (userInfo.birthdate ?? "") !== ""
                  ? userInfo.birthdate?.toLocaleDateString()
                  : "Missing"
              }
              disabled
            />
          </label>
          <p className="text-light/60 mt-2">
            Account created : {userInfo.createdAt?.toLocaleDateString()}
          </p>
          <p className="text-light/60">
            Last updated : {userInfo.createdAt?.toLocaleDateString()}
          </p>
          <div className="divider bg-light/20 my-2 h-0.5 w-2/3 self-center" />
          <button
            className="btn-primary bg-main-lighter hover:bg-main w-2/3"
            onClick={() => setEditingProfile(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="center-flex w-full flex-col gap-2"
        >
          <input
            className="input-ghost text-center text-3xl"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          ></input>
          <p className="text-light">
            {payload.email ? payload.email : "No Email"}
          </p>
          <div className="divider bg-light/20 my-2 h-0.5 w-2/3 self-center" />
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">City</span>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              maxLength={30}
            />
          </label>
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Country</span>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              maxLength={30}
            />
          </label>
          <label className="select rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Gender</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Non specified</option>
            </select>
          </label>
          <label className="input rounded-md border-1 border-gray-500/70 pl-3">
            <span className="label">Birth date</span>
            <input
              type="date"
              name="birthdate"
              value={
                formData.birthdate
                  ? formData.birthdate.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              max={today}
            />
          </label>
          <p className="text-light/60 mt-2">
            Account created : {userInfo.createdAt?.toLocaleDateString()}
          </p>
          <p className="text-light/60">
            Last updated : {userInfo.createdAt?.toLocaleDateString()}
          </p>
          <div className="divider bg-light/20 my-2 h-0.5 w-2/3 self-center" />
          <div className="center-flex flex w-full flex-row gap-2">
            <button
              type="button"
              className="btn-primary bg-main hover:bg-main-darker w-1/3"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary w-1/3 bg-green-500 hover:bg-green-600"
            >
              Save
            </button>
          </div>
          <button
            type="button"
            className="btn-primary bg-main-darker hover:bg-main mt-5"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
