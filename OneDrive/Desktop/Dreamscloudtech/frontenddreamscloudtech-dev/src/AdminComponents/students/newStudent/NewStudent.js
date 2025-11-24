import React, { useEffect, useState } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import Academics from "./AcademicsDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import Guardian from "../../shared/Guadian";

function NewStudent() {
  //personal
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [secondName, setsecondName] = useState("");
  const [gender, setgender] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [email, setemail] = useState("");
  const [nationality, setnationality] = useState("");
  const [placeofBirth, setplaceofBirth] = useState("");
  const [religion, setreligion] = useState("");
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");
  const [loading, setloading] = useState("");

  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");

  //form verification
  const { register, handleSubmit, errors } = useForm();

  //academics
  const [autoID, setautoID] = useState(true);
  const [userID, setuserID] = useState("");
  const [classID, setclass] = useState("");
  const [section, setsection] = useState("");
  const [campus, setcampus] = useState("");
  const [status, setstatus] = useState(null);
  const [dormitory, setdormitory] = useState("");
  const [schoolarship, setschoolarship] = useState("");
  const [feesCategory, setfeesCategory] = useState("");
  const [lastSchool, setlastSchool] = useState("");
  const [division, setdivision] = useState("");
  const [reasonforTransfer, setreasonforTransfer] = useState("");

  //contact details
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  //guidan
  const [guadian, setguadian] = useState([]);

  // fathers info
  const [fatherName, setfatherName] = useState("");
  const [fatherLastName, setfatherLastName] = useState("");
  const [fatherMobile, setfatherMobile] = useState("");
  const [fatherEmail, setfatherEmail] = useState("");
  const [fatherOccupation, setfatherOccupation] = useState("");
  const [fatherAddress, setfatherAddress] = useState("");

  // mothers info
  const [motherName, setmotherName] = useState("");
  const [motherLastName, setmotherLastName] = useState("");
  const [motherMobile, setmotherMobile] = useState("");
  const [motherEmail, setmotherEmail] = useState("");
  const [motherOccupation, setmotherOccupation] = useState("");
  const [motherAddress, setmotherAddress] = useState("");

  // transport info
  const [villageName, setvillageName] = useState([]);
  const [transportFees, setTransportFees] = useState([]);
  const [villageId, setVillageId] = useState("");
  // const [tempvillageName, setTempvillageName] = useState("");
  useEffect(() => {
    const fetchTransportFees = async () => {
      try {
        const response = await axios.get("/transport/all-fees");
        console.log("Transport Fees:", response.data);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setTransportFees(response.data);
          const tempvillageName = [];
          for (let i = 0; i < response.data.length; i++) {
            const village = transportFees[i];        
            tempvillageName.push(village.village);
          }

          setvillageName(tempvillageName);

        } else {
          console.warn("Unexpected transport data format", response.data);
        }
        
      } catch (error) {
        console.error("Failed to fetch transport fees:", error);
      }
    };
    fetchTransportFees();
  }, []);
  
  
  
  const handleDeleteGuadian = (id) => {
    setguadian(guadian.filter((e) => e.id !== id));
  };
  
  console.log("Fetching transport fees...",villageName);
  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
    if (selected?.size > 2000000) {
      errorAlert("image is too large");
    } else if (selected) {
      setprofileUrl(selected);
      // setprofileimg(URL.createObjectURL(selected));
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onloadend = () => {
        setprofileimg(fileReader.result);
      };
    } else {
      console.log("no file selected");
    }
  };

  const handleReset = () => {
    setvillageName([]);
    setTransportFees([]);
    setVillageId("");
    setautoID(true);
    setstatus("");
    setclass("");
    setsection("");
    setdormitory("");
    setschoolarship("");
    setfeesCategory("");
    setuserID("");
    setdisease("");
    setguadian([]);
    setreasonforTransfer("");
    settelephone("");
    setpostalAddress("");
    setresidence("");
    setmobilenumber("");
    setlastSchool("");
    setallege("");
    sethealth();
    setdivision("");
    setcampus("");
    setname("");
    setsecondName("");
    setlastname("");
    setgender("");
    setdateofBirth("");
    setemail("");
    setnationality("");
    setplaceofBirth("");
    setreligion("");
    // clear fathers info
    setfatherName("");
    setfatherLastName("");
    setfatherMobile("");
    setfatherEmail("");
    setfatherOccupation("");
    setfatherAddress("");
    // clear mothers info
    setmotherName("");
    setmotherLastName("");
    setmotherMobile("");
    setmotherEmail("");
    setmotherOccupation("");
    setmotherAddress("");
  };

  const handleCreateSubmit = async () => {
    setloading(true);
    const fileData = new FormData();
    fileData.append("photo", profileUrl);
    var path;
    if (profileUrl) {
      path = await axios.post("/upload", { dataUrl: profileimg });
    }
    await axios
      .post("/students/create", {
        profileUrl: path?.data?.url,
        name,
        villageId,
        setuserID: autoID ? null : userID,
        middleName: secondName,
        surname: lastname,
        gender,
        dateofBirth,
        email,
        nationality,
        religion,
        placeOfBirth: placeofBirth,
        health,
        disease,
        allege,
        classID,
        division,
        dormitoryID: dormitory,
        section,
        status,
        campusID: campus,
        scholarship: schoolarship,
        fees: feesCategory,
        lastSchool: {
          school: lastSchool,
          reason: reasonforTransfer,
        },
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        guadian: [
          {
            name: fatherName,
            lastname: fatherLastName,
            mobile: fatherMobile,
            relationship: "Father",
            email: fatherEmail,
            occupation: fatherOccupation,
            address: fatherAddress,
          },
          {
            name: motherName,
            lastname: motherLastName,
            mobile: motherMobile,
            relationship: "Mother",
            email: motherEmail,
            occupation: motherOccupation,
            address: motherAddress,
          },
        ],
      })
      .then(async (response) => {
        setloading(false);
        if (response.data.error) {
          errorAlert(response.data.error);
          return 0;
        }
        await axios.post("/activitylog/create", {
          activity: `student  ${name} ${lastname} was created`,
          user: "admin",
        });
        successAlert(
          `stundent ${response.data.student.userID} successfully added`
        );
        handleReset();
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something went wrong");
      });
  };

  return (
    <div >
      <h2>Add New Students</h2>
      <div style={{ backgroundColor: "#EEF7FF" }}>
        <form className="content__container" style={{ backgroundColor: "#EEF7FF" }}>
          <div className="profile-picture-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px', // Adjust this value for more margin on the left
            marginRight: '10px', // Adding margin to the right for better centering
            width: '100%' // Ensuring the container takes up the full width
          }}>
            <ProfilePicture
              profileimg={profileimg}
              profileUrl={profileUrl}
              setprofileUrl={handleChangeFile}
            />
          </div>

          <br className="my-0" />
          <PersonalInfo
            register={register}
            errors={errors}
            name={name}
            setname={setname}
            secondName={secondName}
            setsecondName={setsecondName}
            lastname={lastname}
            setlastname={setlastname}
            gender={gender}
            setgender={setgender}
            dateofBirth={dateofBirth}
            setdateofBirth={setdateofBirth}
            email={email}
            setemail={setemail}
            nationality={nationality}
            setnationality={setnationality}
            placeofBirth={placeofBirth}
            setplaceofBirth={setplaceofBirth}
            religion={religion}
            setreligion={setreligion}
            healthCon={health}
            setHealthCon={sethealth}
            disease={disease}
            setDisease={setdisease}
            allerge={allege}
            setallerge={setallege}
          />
          <br className="my-5" />
          <Academics
            register={register}
            errors={errors}
            autoID={autoID}
            setautoID={setautoID}
            userID={userID}
            setuserID={setuserID}
            classID={classID}
            setclass={setclass}
            division={division}
            setdivision={setdivision}
            section={section}
            setsection={setsection}
            status={status}
            setstatus={setstatus}
            dormitory={dormitory}
            setdormitory={setdormitory}
            schoolarship={schoolarship}
            setschoolarship={setschoolarship}
            feesCategory={feesCategory}
            setfeesCategory={setfeesCategory}
            lastSchool={lastSchool}
            campus={campus}
            setcampus={setcampus}
            setlastSchool={setlastSchool}
            reasonforTransfer={reasonforTransfer}
            setreasonforTransfer={setreasonforTransfer}
          />
          <br className="my-5" />
          <ContactDetails
            register={register}
            errors={errors}
            mobilenumber={mobilenumber}
            setmobilenumber={setmobilenumber}
            residence={residence}
            setresidence={setresidence}
            settelephone={settelephone}
            telephone={telephone}
            setpostalAddress={setpostalAddress}
            postalAddress={postalAddress}
          />
          <br className="my-5" />
          <Guardian
            fatherName={fatherName}
            setFatherName={setfatherName}
            fatherOccupation={fatherOccupation}
            setFatherOccupation={setfatherOccupation}
            fatherContact={fatherMobile}
            setFatherContact={setfatherMobile}
            motherName={motherName}
            setMotherName={setmotherName}
            motherOccupation={motherOccupation}
            setMotherOccupation={setmotherOccupation}
            motherContact={motherMobile}
            setMotherContact={setmotherMobile}
            fatherAddress={fatherAddress}
            setFatherAddress={setfatherAddress}
            motherAddress={motherAddress}
            setMotherAddress={setmotherAddress}
            fatherLastName={fatherLastName}
            setFatherLastName={setfatherLastName}
            motherLastName={motherLastName}
            setMotherLastName={setmotherLastName}
          />
          {/*  <div className="row">
            {guadian &&
              guadian.map((e, i) => (
                <div className="col-xs-12 col-sm-6">
                  <GuadianCard
                    guadian={e}
                    key={i}
                    handleDeleteGuadian={handleDeleteGuadian}
                  />
                </div>
              ))}
          </div> */}

          {/* transport */}

          <div className="form-group">
            <label htmlFor="villageName">Village Name</label>
            <select
              id="villageName"
              className="form-control"
              value={villageName}
              onChange={(e) => {
                const selectedName = e.target.value;
                setvillageName(selectedName);

                const selectedVillage = transportFees.find(
                  (v) => v.village === selectedName
                );
                setVillageId(selectedVillage?.uniqueId || "");
              }}
            >
              <option value="">Select Village</option>
              {transportFees.map((item) => (
                <option key={item.uniqueId} value={item.village }>
                  {item.village} - ₹{item.amount}
                </option>
              ))}
            </select>
          </div>



          <br className="my-5" />
          <div className="row ">
            <button
              disabled={loading}
              type="submit"
              onClick={handleSubmit(handleCreateSubmit)}
              className="col btn orange__btn mr-5"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Create"
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className="col btn red__btn"
              style={{ width: "6px" }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewStudent;
