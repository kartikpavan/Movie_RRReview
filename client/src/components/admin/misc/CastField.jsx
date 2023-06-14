import { useState } from "react";
import LiveSearch from "./LiveSearch";
import { results } from "../../../data/data";
import { useNotificationContext } from "../../../context/NotificationContext";

// cast = [{actor:id,roleAs:" ",leadActor:true}]
const defaultCast = {
  profile: {},
  roleAs: "",
  leadActor: false,
};
const CastField = ({ onSubmit }) => {
  const { updateNotification } = useNotificationContext();
  const [castInfo, setCastInfo] = useState({ ...defaultCast });

  const handleChange = ({ target }) => {
    const { name, value, checked } = target;
    if (name === "leadActor") return setCastInfo({ ...castInfo, leadActor: true });
    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name) return updateNotification("error", "Cast Profile is missing");
    if (!roleAs.trim()) return updateNotification("error", "Cast Role is missing");
    onSubmit(castInfo);
    setCastInfo({ ...defaultCast });
    updateNotification("info", "Cast Updated ");
  };

  const { leadActor, profile, roleAs } = castInfo;
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex space-x-2 items-center font-semibold">
        <input
          type="checkbox"
          name="leadActor"
          checked={leadActor}
          className="checkbox"
          onChange={handleChange}
        />
        <span className="label-text">Lead Actor </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-x-2">
        <LiveSearch
          placeholder="Search Profile"
          value={profile.name}
          results={results}
          onSelect={handleProfileSelect}
          renderItem={(result) => {
            const { name, avatar, id } = result;
            return (
              <div key={id} className="flex items-center space-x-2">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                <p className="font-semibold">{result.name}</p>
              </div>
            );
          }}
        />
        <span>as</span>
        <input
          value={roleAs}
          onChange={handleChange}
          name="roleAs"
          type="text"
          placeholder="Type here"
          className="input input-bordered "
        />
      </div>
      <button
        type="button"
        className="btn btn-neutral btn-sm mt-2 w-full sm:max-w-[20%]"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default CastField;
