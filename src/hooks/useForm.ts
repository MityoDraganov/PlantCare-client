import { ChangeEvent, useState } from "react";

// Define a type for the form data change event
export type FormDataChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | { id: string; value: any }
  | FileList;

// Define the hook with an additional function for setting entire form data
const useFormData = <T extends {}>(
  initialValues: T
): [
  T,
  (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { id: string; value: any }
      | FileList
  ) => void,
  (newValues: T) => void // New function to set the entire form data
] => {
  const [formData, setFormData] = useState(initialValues);

  // Handle individual field changes
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { id: string; value: any }
      | FileList
  ) => {
    if ("target" in e) {
      const { id, value, type } = e.target;
      if (type === "file") {
        // Handle file input
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          // Convert FileList to an array
          const filesArray: File[] = Array.from(files);
          setFormData((prevState) => ({
            ...prevState,
            [id]: filesArray, // Store files as an array
          }));
        }
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      }
    } else if ("id" in e && "value" in e) {
      const { id, value } = e;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  // Function to set the entire form data
  const setFormDataValue = (newValues: T) => {
    setFormData(newValues);
  };

  return [formData, handleChange, setFormDataValue];
};

export default useFormData;
