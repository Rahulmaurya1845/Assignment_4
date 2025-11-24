import React, { use, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { setClasses } from "src/store/slices/schoolSlice";

function CorrespondanceForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  // const [classID, setclassID] = useState("");
  let {
    salutation,
    setsalutation,
    subject,
    setsubject,
    date,
    setdate,
    address,
    setaddress,
    loading,
    isEdit,
    handleFunc,
    name,
    setName,
    classID,
    setClassID,
  } = props;

  useEffect(() => {
    setIsLoading(true);
    axios.get("/students")
      .then((res) => {
        const capitalizedData = res.data.map(student => ({
          ...student,
          name: capitalizeFirstLetter(student.name),
        }));
        setStudents(capitalizedData);
      })
      .finally(() => setIsLoading(false));

  }, []);

  useEffect(() => {
    if (classID) {
      const filtered = students.filter(
        (student) => student.classID === classID
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [classID, students]);

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <form onSubmit={handleSubmit(handleFunc)} action="">
      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Address
        </label>
        <div className="col-sm-10">
          <textarea
            ref={register({ required: true })}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            name="address"
            rows="3"
            className="form-control"
          ></textarea>
          {errors.address && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
    <div className="mb-3">
  <label htmlFor="salutation" className="col-sm-2 col-form-label">
    Salutations
  </label>
  <div className="col-sm-10">
    <select
      value={salutation}
      onChange={(e) => setsalutation(e.target.value)}
      name="salutation"
      ref={register({ required: true })}
      className="form-control"
    >
      <option value="">Select...</option>
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Dr.">Dr.</option>
      <option value="Prof.">Prof.</option>
    </select>

    {errors.salutation && (
      <span className="form-error text-danger mb-2">
        This field is required
      </span>
    )}
  </div>
</div>


      <div className="mb-3">
        <label htmlFor="subject" className="col-sm-2 col-form-label">
          Subject
        </label>
        <div className="col-sm-10">
          <select
            ref={register({ required: true })}
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            className="form-control"
            name="subject"
          >
            <option value="">-- Select Certificate Type --</option>
            <option value="Bonafide Certificate">Bonafide Certificate</option>
            <option value="School Leaving Certificate">School Leaving Certificate</option>
            <option value="Transfer Certificate">Transfer Certificate</option>
            <option value="Character Certificate">Character Certificate</option>
          </select>
          {errors.subject && (
            <span className="form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>

      <div className=" mb-3">
        <label htmlFor="subject" className="col-sm-2 col-form-label">
          Class
        </label>
        <select className="col-sm-10 form-control py-2" value={classID}
          onChange={(e) => setClassID(e.target.value)}>
          <option hidden="">Select</option><option value="p-nur">Pre-Nursery</option><option value="nur">Nursery</option><option value="l.kg">L.KG</option><option value="u.kg">U.KG</option><option value="i-a">1st Section-A</option><option value="i-b">1st Section-B</option><option value="i-c">1st Section-C</option><option value="ii-a">2nd Section-A</option><option value="ii-b">2nd Section-B</option><option value="ii-c">2nd Section-C</option><option value="iii-a">3rd Section-A</option><option value="iii-b">3rd Section-B</option><option value="iii-c">3rd Section-C</option><option value="iv-a">4th Section-A</option><option value="iv-b">4th Section-B</option><option value="iv-c">4th Section-C</option><option value="v-a">5th Section-A</option><option value="v-b">5th Section-B</option><option value="v-c">5th Section-C</option><option value="vi-a">6th Section-A</option><option value="vi-b">6th Section-B</option><option value="vi-c">6th Section-C</option><option value="vii-a">7th Section-A</option><option value="vii-b">7th Section-B</option><option value="vii-c">7th Section-C</option><option value="viii-a">8th Section-A</option><option value="viii-b">8th Section-B</option><option value="viii-c">8th Section-C</option><option value="ix-a">9th Section-A</option><option value="ix-b">9th Section-B</option><option value="ix-c">9th Section-C</option><option value="x-a">10th Section-A</option><option value="x-b">10th Section-B</option><option value="x-c">10th Section-C</option></select>
      </div>

      <div className=" mb-3">
        <label htmlFor="subject" className="col-sm-2 col-form-label">
          Student
        </label>
        <select
          className="col-sm-10 form-control py-2"
          onChange={(e) => {
            const selectedData = JSON.parse(e.target.value);
            setName(selectedData); // `name` will now be an object
          }}
          value={JSON.stringify(name)} // Make sure this matches selected JSON string
        >

          <option hidden>Select</option>
          {filteredStudents.map((student) => {
            const studentData = {
              name: student.name,
              surname: student.surname,
              father_name: student.guadian?.[0]?.name || "N/A",
              mother_name: student.guadian?.[1]?.name || "N/A",
              years: student.years || "N/A",
            };

            return (
              <option key={student._id} value={JSON.stringify(studentData)}>
                {[
                  student.name,
                  " ",
                  student.surname,
                  " — Father's name: ",
                  student.guadian?.[0]?.name || "N/A",
                  ", Mother's name: ",
                  student.guadian?.[1]?.name || "N/A",
                ].join("")}
              </option>
            );
          })}
        </select>

      </div>

      <div className=" mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <input
            ref={register({ required: true })}
            value={date}
            onChange={(e) => setdate(e.target.value)}
            type="date"
            className="form-control"
            name="date"
          />
          {errors.date && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="">
        <div className="col-sm-10">
          <button disabled={loading} type="submit" className="btn blue__btn">
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CorrespondanceForm;
