import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setFilters } from "../../redux/userBooks/slice";
import { fetchUserBooksThunk } from "../../redux/userBooks/operations";
import { AppDispatch } from "../../redux/store";
import { Icon } from "../index";
import s from "./FiltersStatus.module.css";

export const FiltersStatus = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All books");

  const toggleDropdown = (): void => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (): void => {
    setIsOpen(false);
  };

  const handleStatus = (status: string): void => {
    setSelectedStatus(status);
    closeDropdown();
  };

  const handleSetStatus = async (status: string): Promise<void> => {
    try {
      await dispatch(setFilters({ status }));
      await dispatch(fetchUserBooksThunk({ status }));
    } catch {
      toast.error("Something went wrong. Please, try again.");
    }
  };

  const handleClick = (displayStatus: string, filterStatus: string): void => {
    handleStatus(displayStatus);
    handleSetStatus(filterStatus);
  };

  return (
    <>
      <button className={s.dropdown} onClick={toggleDropdown}>
        {selectedStatus}
        <Icon id="dropdown" size={16} />
      </button>
      {isOpen && (
        <ul className={s.list}>
          <li
            className={`${selectedStatus === "Unread" ? s.active_item : ""}`}
            onClick={() => handleClick("Unread", "unread")}
          >
            Unread
          </li>
          <li
            className={`${
              selectedStatus === "In progress" ? s.active_item : ""
            }`}
            onClick={() => handleClick("In progress", "in-progress")}
          >
            In progress
          </li>
          <li
            className={`${selectedStatus === "Done" ? s.active_item : ""}`}
            onClick={() => handleClick("Done", "done")}
          >
            Done
          </li>
          <li
            className={`${selectedStatus === "All books" ? s.active_item : ""}`}
            onClick={() => handleClick("All books", "")}
          >
            All books
          </li>
        </ul>
      )}
    </>
  );
};
