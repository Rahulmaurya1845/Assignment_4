import React, { useState, useEffect } from "react";
import SearchStudent from "./SearchStudent";
import PaymentForm from "./PaymentForm";
import ViewStudent from "./ViewStudent";
import axios from "../../../store/axios";
import Loading from "../../../Loading";
import { errorAlert, successAlert } from "../../../utils";

function BillPayment() {
  const [year, setyear] = useState("");
  const [terms, setterms] = useState([]);
  const [classID, setclassID] = useState("");
  const [village, setvillage] = useState("");
  const [villageAmount, setVillageAmount] = useState(0);
  const [studentID, setstudentID] = useState("");
  const [studentOptions, setstudentOptions] = useState([]);
  const [amount, setamount] = useState("");
  const [discount, setdiscount] = useState("");
  const [date, setdate] = useState("");
  const [bank, setbank] = useState("");
  const [chequeNo, setchequeNo] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [applyTo, setapplyTo] = useState({
    all: false,
    tuition: false,
    examination: false,
    transport: false,
    maintenance: false,
    admission: false,
  });
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [loadingStudents, setloadingStudents] = useState(false);
  const [user, setuser] = useState({});
  const [feetype, setfeetype] = useState({});
  const [balance, setbalance] = useState(null);
  const [totalBill, settotalBill] = useState(null);
  const [totalPaid, settotalPaid] = useState(0);
  const [scholarshipAmount, setscholarshipAmount] = useState(0);
  const [show, setshow] = useState(false);
  const [scholarship, setscholarship] = useState(null);
  const [error, seterror] = useState("");
  const [monthlyFees, setmonthlyFees] = useState([]);
  const [villageOptions, setvillageOptions] = useState([]);
  const [monthlyDiscounts, setmonthlyDiscounts] = useState([]);

  // useEffect(() => {
  //   axios.get("/transport/all-fees").then((res) => {
  //     if (res.data.error) {
  //       errorAlert(res.data.error);
  //       return;
  //     }
  //     setvillageOptions(res.data);
  //   }).catch((err) => {
  //     console.error("Error fetching villages:", err);
  //     errorAlert("Failed to fetch villages.");
  //   });
  // }, []);

  useEffect(() => {
    axios.get("/transport/all-fees").then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return;
      }

      const optionsWithOther = [
        ...(res.data || []),
        { village: "Without transport", amount: 0 },
      ];

      setvillageOptions(optionsWithOther);
    }).catch((err) => {
      console.error("Error fetching villages:", err);
      errorAlert("Failed to fetch villages.");
    });
  }, []);


  const calculateMonthlyFee = (month, feeStructure, villageAmount, admissionDate, academicYear) => {
    const isApril = month === "April";
    const isJune = month === "June";
    const admissionYear = new Date(admissionDate).getFullYear();
    const isNewStudent = admissionYear === parseInt(academicYear);
    const admissionDateObj = new Date(admissionDate);
    const cutoffDate = new Date("2025-04-01T00:00:00.000Z");
    const isAfterCutoff = admissionDateObj >= cutoffDate;

    let fees = {
      tution: Number(feeStructure?.tution) || 0,
      maintenance: Number(feeStructure?.maintenance) || 0,
      transport: 0,
      exam: 0,
      admission: 0,
    };

    const isNoTransport = village === "No Transport";
    fees.transport = (isNoTransport || isJune) ? 0 : Number(villageAmount) || 0;

    if (isApril) {
      fees.exam = Number(feeStructure?.exam) || 0;
      if (isNewStudent && !isAfterCutoff) {
        fees.exam = Number(feeStructure?.exam) || 0;
      } else if (isNewStudent && isAfterCutoff) {
        fees.admission = Number(feeStructure?.admission) || 0;
        fees.exam = Number(feeStructure?.exam) || 0;
      }
    }

    const total = Object.values(fees).reduce((sum, val) => sum + val, 0);
    return { month, fees, total };
  };

  const recalculateBalance = (updatedTransactions, feeStructure, villageAmount, scholarship, admissionDate) => {
    if (!feeStructure || !terms.length || villageAmount === undefined) {
      seterror("Invalid fee structure, village, or months selected.");
      settotalBill(null);
      setbalance(null);
      setscholarshipAmount(0);
      settotalPaid(0);
      setmonthlyFees([]);
      setmonthlyDiscounts([]);
      return;
    }

    const monthlyFeeDetails = terms.map((month) =>
      calculateMonthlyFee(month, feeStructure, villageAmount, admissionDate, year)
    );

    const totalBill = monthlyFeeDetails.reduce((sum, detail) => sum + detail.total, 0);

    const paid = updatedTransactions?.reduce((accumulator, element) => {
      if (terms.includes(element?.fees?.term) && element?.fees?.academicYear === year) {
        return accumulator + (Number(element?.amount) || 0);
      }
      return accumulator;
    }, 0) || 0;

    const totalDiscount = updatedTransactions?.reduce((accumulator, element) => {
      if (terms.includes(element?.fees?.term) && element?.fees?.academicYear === year) {
        return accumulator + (Number(element?.Discount) || 0);
      }
      return accumulator;
    }, 0) || 0;

    const scholarshipDeduction = scholarship?.percentage
      ? (Number(scholarship.percentage) / 100) *
      monthlyFeeDetails.reduce((sum, detail) => {
        return sum + detail.total - (detail.fees.admission || 0);
      }, 0)
      : 0;

    let newBalance = totalBill - paid - scholarshipDeduction - totalDiscount;
    if (newBalance < 0) newBalance = 0;

    setmonthlyFees(monthlyFeeDetails);
    setscholarshipAmount(scholarshipDeduction);
    settotalPaid(paid);
    setbalance(newBalance);
    settotalBill(totalBill);
    seterror("");

    if (totalDiscount > 0) {
      const perMonthDiscount = totalDiscount / terms.length;
      const discounts = terms.map((month) => ({
        month,
        discount: perMonthDiscount,
      }));
      setmonthlyDiscounts(discounts);
    } else {
      setmonthlyDiscounts([]);
    }
  };

  const handleSelectStudent = async (e) => {
    e.preventDefault();
    if (!terms.length) return errorAlert("Please select at least one month");
    if (!year) return errorAlert("Please select year");
    if (!studentID) return errorAlert("Please select student");
    // if (!village) return errorAlert("Please select village");

    setshow(false);
    setloading(true);
    seterror("");

    try {
      const transactionResponse = await axios.get(`/transactions/student/${studentID}`);
      if (transactionResponse.data.error) {
        throw new Error(`Transactions fetch failed: ${transactionResponse.data.error}`);
      }
      const thisYearTrans = transactionResponse.data.filter(
        (e) => e.fees?.academicYear === year
      );

      const studentResponse = await axios.get(`/students/student/${studentID}`);
      if (!studentResponse.data?.student) {
        throw new Error("Student data not found.");
      }
      const student = studentResponse.data.student;
      setuser(student);

      let scholarshipDoc = null;
      if (student?.scholarship && student.scholarship !== "None") {
        const scholarshipResponse = await axios.get(`/scholarships/${student.scholarship}`);
        if (scholarshipResponse.data.error) {
          console.warn(`Scholarship fetch failed: ${scholarshipResponse.data.error}`);
        } else {
          scholarshipDoc = scholarshipResponse.data?.doc || null;
        }
      }
      setscholarship(scholarshipDoc);

      const classIDLower = student?.classID?.toLowerCase();
      if (!classIDLower) {
        throw new Error("Student classID is missing.");
      }
      const feesResponse = await axios.get(`/fees/type/${classIDLower}/day`);
      if (!feesResponse.data || !feesResponse.data.tution) {
        throw new Error("Fee structure not found for this class.");
      }
      const feeStructure = feesResponse.data;
      setfeetype(feeStructure);

      const selectedVillage = villageOptions.find((v) => v.village === village);
      const villageAmt = selectedVillage ? Number(selectedVillage.amount) : 0;
      setVillageAmount(villageAmt);

      recalculateBalance(thisYearTrans, feeStructure, villageAmt, scholarshipDoc, student.date);

      settransactions(thisYearTrans);
      setshow(true);
    } catch (err) {
      console.error("Error in handleSelectStudent:", err.message);
      seterror(`Failed to fetch student or fee data: ${err.message}`);
    } finally {
      setloading(false);
    }
  };

  // const handleSelectClass = (id) => {
  //   setloadingStudents(true);
  //   setstudentOptions([]);
  //   setstudentID("");
  //   setclassID(id);
  //   axios
  //     .get(`/students/class/${id}`)
  //     .then((res) => {
  //       setloadingStudents(false);
  //       if (res.data.error) {
  //         errorAlert(res.data.error);
  //         return;
  //       }
  //       setstudentOptions(res.data.users);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching students:", err);
  //       setloadingStudents(false);
  //       errorAlert("Failed to fetch students.");
  //     });
  // };

  const handleSelectClass = (id) => {
    setloadingStudents(true);
    setstudentOptions([]);
    setstudentID("");
    setclassID(id);

    axios
      .get(`/students/class/${id}`)
      .then((res) => {
        setloadingStudents(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }

        let filteredStudents = res.data.users;

        // 👉 Apply filter ONLY when village is "Without transport"
        if (village === "Without transport") {
          filteredStudents = filteredStudents.filter(
            (student) => !student.villageId || student.villageId.trim() === ""
          );

        }

        setstudentOptions(filteredStudents);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setloadingStudents(false);
        errorAlert("Failed to fetch students.");
      });
  };


  const handlePayement = async () => {
    if (!amount || Number(amount) <= 0) {
      errorAlert("Please enter a valid payment amount.");
      return;
    }
    if (!date) {
      errorAlert("Please select a payment date.");
      return;
    }
    if (!paymentType) {
      errorAlert("Please select a payment method.");
      return;
    }

    const totalDiscount = Number(discount) || 0;
    const amountPaid = Number(amount);
    const effectiveBalance = balance + totalDiscount;
    if (amountPaid > effectiveBalance) {
      errorAlert("Payment amount exceeds balance after discount.");
      return;
    }

    setloading(true);
    try {

      const monthOrder = [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March"
      ];

      const sortedTerms = [...terms].sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

      let remainingPayment = amountPaid;
      let remainingDiscount = totalDiscount;

      for (const month of sortedTerms) {
        const monthlyFee = monthlyFees.find((mf) => mf.month === month);
        if (!monthlyFee) continue;

        const monthlyBill = monthlyFee.total;
        let paymentForMonth = 0;
        let discountForMonth = 0;

        // Apply payment first
        if (remainingPayment > 0) {
          if (remainingPayment >= monthlyBill) {
            paymentForMonth = monthlyBill;
            remainingPayment -= monthlyBill;
          } else {
            paymentForMonth = remainingPayment;
            remainingPayment = 0;
          }
        }

        // If payment doesn't cover the full bill, apply discount
        const remainingBill = monthlyBill - paymentForMonth;
        if (remainingBill > 0 && remainingDiscount > 0) {
          if (remainingDiscount >= remainingBill) {
            discountForMonth = remainingBill;
            remainingDiscount -= remainingBill;
          } else {
            discountForMonth = remainingDiscount;
            remainingDiscount = 0;
          }
        }

        if (paymentForMonth > 0 || discountForMonth > 0) {
          await axios.post("/transactions/create", {
            date,
            amount: paymentForMonth.toString(),
            paymentMethod: paymentType,
            type: "income",
            description: remarks,
            bank,
            chequeNumber: chequeNo,
            category: "fees",
            fees: {
              userID: studentID,
              term: month,
              academicYear: year,
              applyTo,
            },
            transportFee: villageAmount.toString(),
            Discount: discountForMonth.toString(),
          });
        }

        if (remainingPayment <= 0 && remainingDiscount <= 0) break;
      }

      const transactionData = await axios.get(`/transactions/student/${studentID}`);
      const thisYearTrans = transactionData.data.filter(
        (e) => e.fees.academicYear === year
      );

      recalculateBalance(thisYearTrans, feetype, villageAmount, scholarship, user.date);

      settransactions(thisYearTrans);
      successAlert("Payment successfully made for selected months");
      setdate("");
      setamount("");
      setdiscount("");
      setremarks("");
      setchequeNo("");
      setbank("");
      setpaymentType("");
      setapplyTo({
        all: false,
        tuition: false,
        examination: false,
        transport: false,
        maintenance: false,
        admission: false,
      });
    } catch (err) {
      console.error("Error in handlePayement:", err);
      errorAlert("Transaction failed.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <h3 className="ml-3 mb-2">Student Fee Payment</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-sm-5">
          <SearchStudent
            loading={loadingStudents}
            studentID={studentID}
            setstudentID={setstudentID}
            setclassID={handleSelectClass}
            handleSearch={handleSelectStudent}
            classID={classID}
            year={year}
            terms={terms}
            setterms={setterms}
            setyear={setyear}
            studentOptions={studentOptions}
            village={village}
            setvillage={setvillage}
            villageOptions={villageOptions}
          />
          {show && (
            <div className="content__container mb-5" style={{ backgroundColor: "#EEF7FF" }}>
              {scholarship?.percentage > 0 && (
                <div style={{ backgroundColor: "#EEF7FF" }}>
                  <strong style={{ marginLeft: "33px" }}>
                    Student granted {scholarship?.name} covering -{scholarship?.percentage}% of the fees (excluding admission)
                  </strong>
                </div>
              )}
              {totalBill === null || error ? (
                <div className="content__container text-center">
                  <h5 className="text-danger">{error || "Fees not set yet"}</h5>
                </div>
              ) : (
                <>
                  {balance > 0 ? (
                    <PaymentForm
                      balance={balance}
                      amount={amount}
                      year={year}
                      scholarship={scholarship}
                      scholarshipAmount={-scholarshipAmount}
                      terms={terms}
                      setterms={setterms}
                      setyear={setyear}
                      chequeNo={chequeNo}
                      setchequeNo={setchequeNo}
                      bank={bank}
                      setbank={setbank}
                      setamount={setamount}
                      discount={discount}
                      setdiscount={setdiscount}
                      date={date}
                      applyTo={applyTo}
                      setapplyTo={setapplyTo}
                      setdate={setdate}
                      paymentType={paymentType}
                      setpaymentType={setpaymentType}
                      remarks={remarks}
                      setremarks={setremarks}
                      handlePayement={handlePayement}
                      loading={loading}
                    />
                  ) : (
                    <div className="content__container text-center">
                      <h5 className="text-info">Fees fully paid for selected months</h5>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="col-sm-7">
          {show && (
            <ViewStudent
              transactions={transactions}
              scholarship={scholarship}
              scholarshipAmount={-scholarshipAmount}
              user={user}
              balance={balance ?? 0}
              feetype={feetype}
              totalBill={totalBill ?? 0}
              total={totalPaid}
              id={studentID}
              monthlyFees={monthlyFees}
              village={village}
              monthlyDiscounts={monthlyDiscounts}
              totalDiscount={Number(discount) || 0}
            />
          )}
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default BillPayment;


// import React, { useState, useEffect } from "react";
// import SearchStudent from "./SearchStudent";
// import PaymentForm from "./PaymentForm";
// import ViewStudent from "./ViewStudent";
// import axios from "../../../store/axios";
// import Loading from "../../../Loading";
// import { errorAlert, successAlert } from "../../../utils";

// function BillPayment() {
//   const [year, setyear] = useState("");
//   const [terms, setterms] = useState([]);
//   const [classID, setclassID] = useState("");
//   const [village, setvillage] = useState("");
//   const [villageAmount, setVillageAmount] = useState(0);
//   const [studentID, setstudentID] = useState("");
//   const [studentOptions, setstudentOptions] = useState([]);
//   const [amount, setamount] = useState("");
//   const [discount, setdiscount] = useState("");
//   const [date, setdate] = useState("");
//   const [bank, setbank] = useState("");
//   const [chequeNo, setchequeNo] = useState("");
//   const [paymentType, setpaymentType] = useState("");
//   const [applyTo, setapplyTo] = useState({
//     all: false,
//     tuition: false,
//     examination: false,
//     transport: false,
//     maintenance: false,
//     admission: false,
//   });
//   const [remarks, setremarks] = useState("");
//   const [loading, setloading] = useState(false);
//   const [transactions, settransactions] = useState([]);
//   const [loadingStudents, setloadingStudents] = useState(false);
//   const [user, setuser] = useState({});
//   const [feetype, setfeetype] = useState({});
//   const [balance, setbalance] = useState(null);
//   const [totalBill, settotalBill] = useState(null);
//   const [totalPaid, settotalPaid] = useState(0);
//   const [scholarshipAmount, setscholarshipAmount] = useState(0);
//   const [show, setshow] = useState(false);
//   const [scholarship, setscholarship] = useState(null);
//   const [error, seterror] = useState("");
//   const [monthlyFees, setmonthlyFees] = useState([]);
//   const [villageOptions, setvillageOptions] = useState([]);
//   const [monthlyDiscounts, setmonthlyDiscounts] = useState([]);

//   useEffect(() => {
//     axios.get("/transport/all-fees").then((res) => {
//       if (res.data.error) {
//         errorAlert(res.data.error);
//         return;
//       }
//       setvillageOptions(res.data);
//     }).catch((err) => {
//       console.error("Error fetching villages:", err);
//       errorAlert("Failed to fetch villages.");
//     });
//   }, []);

//   const calculateMonthlyFee = (month, feeStructure, villageAmount, admissionDate, academicYear) => {
//     const isApril = month === "April";
//     const isJune = month === "June";
//     const admissionYear = new Date(admissionDate).getFullYear();
//     const isNewStudent = admissionYear === parseInt(academicYear);
//     const admissionDateObj = new Date(admissionDate);
//     const cutoffDate = new Date("2025-05-10T00:00:00.000Z");
//     const isAfterCutoff = admissionDateObj >= cutoffDate;

//     let fees = {
//       tution: Number(feeStructure?.tution) || 0,
//       maintenance: Number(feeStructure?.maintenance) || 0,
//       transport: 0,
//       exam: 0,
//       admission: 0,
//     };

//     const isNoTransport = village === "No Transport";
//     fees.transport = (isNoTransport || isJune) ? 0 : Number(villageAmount) || 0;

//     if (isApril) {
//       fees.exam = Number(feeStructure?.exam) || 0;
//       if (isNewStudent && !isAfterCutoff) {
//         fees.exam = Number(feeStructure?.exam) || 0;
//       } else if (isNewStudent && isAfterCutoff) {
//         fees.admission = Number(feeStructure?.admission) || 0;
//         fees.exam = Number(feeStructure?.exam) || 0;
//       }
//     }

//     const total = Object.values(fees).reduce((sum, val) => sum + val, 0);
//     return { month, fees, total };
//   };

//   const recalculateBalance = (updatedTransactions, feeStructure, villageAmount, scholarship, admissionDate) => {
//     if (!feeStructure || !terms.length || villageAmount === undefined) {
//       seterror("Invalid fee structure, village, or months selected.");
//       settotalBill(null);
//       setbalance(null);
//       setscholarshipAmount(0);
//       settotalPaid(0);
//       setmonthlyFees([]);
//       setmonthlyDiscounts([]);
//       return;
//     }

//     // Determine the years to fetch transactions for
//     const allMonths = [
//       "April", "May", "June", "July", "August", "September",
//       "October", "November", "December", "January", "February", "March"
//     ];
//     const isAllMonthsSelected = allMonths.every(month => terms.includes(month));
//     const yearsToFetch = isAllMonthsSelected ? [year, String(Number(year) + 1)] : [year];

//     // Filter transactions for the selected terms and years
//     const filteredTransactions = updatedTransactions?.filter((element) => {
//       const transactionMonth = element?.fees?.term;
//       const transactionYear = element?.fees?.academicYear;
//       if (!terms.includes(transactionMonth)) return false;

//       if (isAllMonthsSelected) {
//         if (["April", "May", "June", "July", "August", "September", "October", "November", "December"].includes(transactionMonth)) {
//           return transactionYear === year;
//         } else {
//           return transactionYear === String(Number(year) + 1);
//         }
//       }
//       return transactionYear === year;
//     }) || [];

//     // Calculate monthly fees for selected terms
//     const monthlyFeeDetails = terms.map((month) => {
//       const effectiveYear = isAllMonthsSelected && ["January", "February", "March"].includes(month)
//         ? String(Number(year) + 1)
//         : year;
//       return calculateMonthlyFee(month, feeStructure, villageAmount, admissionDate, effectiveYear);
//     });

//     const totalBill = monthlyFeeDetails.reduce((sum, detail) => sum + detail.total, 0);

//     const paid = filteredTransactions.reduce((accumulator, element) => {
//       return accumulator + (Number(element?.amount) || 0);
//     }, 0) || 0;

//     const totalDiscount = filteredTransactions.reduce((accumulator, element) => {
//       return accumulator + (Number(element?.Discount) || 0);
//     }, 0) || 0;

//     const scholarshipDeduction = scholarship?.percentage
//       ? (Number(scholarship.percentage) / 100) *
//         monthlyFeeDetails.reduce((sum, detail) => {
//           return sum + detail.total - (detail.fees.admission || 0);
//         }, 0)
//       : 0;

//     let newBalance = totalBill - paid - scholarshipDeduction - totalDiscount;
//     if (newBalance < 0) newBalance = 0;

//     setmonthlyFees(monthlyFeeDetails);
//     setscholarshipAmount(scholarshipDeduction);
//     settotalPaid(paid);
//     setbalance(newBalance);
//     settotalBill(totalBill);
//     seterror("");

//     if (totalDiscount > 0) {
//       const perMonthDiscount = totalDiscount / terms.length;
//       const discounts = terms.map((month) => ({
//         month,
//         discount: perMonthDiscount,
//       }));
//       setmonthlyDiscounts(discounts);
//     } else {
//       setmonthlyDiscounts([]);
//     }
//   };

//   const handleSelectStudent = async (e) => {
//     e.preventDefault();
//     if (!terms.length) return errorAlert("Please select at least one month");
//     if (!year) return errorAlert("Please select year");
//     if (!studentID) return errorAlert("Please select student");
//     if (!village) return errorAlert("Please select village");

//     setshow(false);
//     setloading(true);
//     seterror("");

//     try {
//       const transactionResponse = await axios.get(`/transactions/student/${studentID}`);
//       if (transactionResponse.data.error) {
//         throw new Error(`Transactions fetch failed: ${transactionResponse.data.error}`);
//       }

//       const studentResponse = await axios.get(`/students/student/${studentID}`);
//       if (!studentResponse.data?.student) {
//         throw new Error("Student data not found.");
//       }
//       const student = studentResponse.data.student;
//       setuser(student);

//       let scholarshipDoc = null;
//       if (student?.scholarship && student.scholarship !== "None") {
//         const scholarshipResponse = await axios.get(`/scholarships/${student.scholarship}`);
//         if (scholarshipResponse.data.error) {
//           console.warn(`Scholarship fetch failed: ${scholarshipResponse.data.error}`);
//         } else {
//           scholarshipDoc = scholarshipResponse.data?.doc || null;
//         }
//       }
//       setscholarship(scholarshipDoc);

//       const classIDLower = student?.classID?.toLowerCase();
//       if (!classIDLower) {
//         throw new Error("Student classID is missing.");
//       }
//       const feesResponse = await axios.get(`/fees/type/${classIDLower}/day`);
//       if (!feesResponse.data || !feesResponse.data.tution) {
//         throw new Error("Fee structure not found for this class.");
//       }
//       const feeStructure = feesResponse.data;
//       setfeetype(feeStructure);

//       const selectedVillage = villageOptions.find((v) => v.village === village);
//       const villageAmt = selectedVillage ? Number(selectedVillage.amount) : 0;
//       setVillageAmount(villageAmt);

//       recalculateBalance(transactionResponse.data, feeStructure, villageAmt, scholarshipDoc, student.date);

//       settransactions(transactionResponse.data);
//       setshow(true);
//     } catch (err) {
//       console.error("Error in handleSelectStudent:", err.message);
//       seterror(`Failed to fetch student or fee data: ${err.message}`);
//     } finally {
//       setloading(false);
//     }
//   };

//   const handleSelectClass = (id) => {
//     setloadingStudents(true);
//     setstudentOptions([]);
//     setstudentID("");
//     setclassID(id);
//     axios
//       .get(`/students/class/${id}`)
//       .then((res) => {
//         setloadingStudents(false);
//         if (res.data.error) {
//           errorAlert(res.data.error);
//           return;
//         }
//         setstudentOptions(res.data.users);
//       })
//       .catch((err) => {
//         console.error("Error fetching students:", err);
//         setloadingStudents(false);
//         errorAlert("Failed to fetch students.");
//       });
//   };

//   const handlePayement = async () => {
//     if (!amount || Number(amount) <= 0) {
//       errorAlert("Please enter a valid payment amount.");
//       return;
//     }
//     if (!date) {
//       errorAlert("Please select a payment date.");
//       return;
//     }
//     if (!paymentType) {
//       errorAlert("Please select a payment method.");
//       return;
//     }

//     const totalDiscount = Number(discount) || 0;
//     const amountPaid = Number(amount);
//     const effectiveBalance = balance + totalDiscount;
//     if (amountPaid > effectiveBalance) {
//       errorAlert("Payment amount exceeds balance after discount.");
//       return;
//     }

//     setloading(true);
//     try {
//       const allMonths = [
//         "April", "May", "June", "July", "August", "September",
//         "October", "November", "December", "January", "February", "March"
//       ];
//       const isAllMonthsSelected = allMonths.every(month => terms.includes(month));
//       const monthOrder = [
//         "April", "May", "June", "July", "August", "September",
//         "October", "November", "December", "January", "February", "March"
//       ];
//       const sortedTerms = [...terms].sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

//       let remainingPayment = amountPaid;
//       let remainingDiscount = totalDiscount;

//       for (const month of sortedTerms) {
//         const monthlyFee = monthlyFees.find((mf) => mf.month === month);
//         if (!monthlyFee) continue;

//         const monthlyBill = monthlyFee.total;
//         let paymentForMonth = 0;
//         let discountForMonth = 0;

//         // Apply payment first
//         if (remainingPayment > 0) {
//           if (remainingPayment >= monthlyBill) {
//             paymentForMonth = monthlyBill;
//             remainingPayment -= monthlyBill;
//           } else {
//             paymentForMonth = remainingPayment;
//             remainingPayment = 0;
//           }
//         }

//         // If payment doesn't cover the full bill, apply discount
//         const remainingBill = monthlyBill - paymentForMonth;
//         if (remainingBill > 0 && remainingDiscount > 0) {
//           if (remainingDiscount >= remainingBill) {
//             discountForMonth = remainingBill;
//             remainingDiscount -= remainingBill;
//           } else {
//             discountForMonth = remainingDiscount;
//             remainingDiscount = 0;
//           }
//         }

//         // Determine the academic year for the transaction
//         let transactionYear = year;
//         if (isAllMonthsSelected && ["January", "February", "March"].includes(month)) {
//           transactionYear = String(Number(year) + 1);
//         }

//         if (paymentForMonth > 0 || discountForMonth > 0) {
//           await axios.post("/transactions/create", {
//             date,
//             amount: paymentForMonth.toString(),
//             paymentMethod: paymentType,
//             type: "income",
//             description: remarks,
//             bank,
//             chequeNumber: chequeNo,
//             category: "fees",
//             fees: {
//               userID: studentID,
//               term: month,
//               academicYear: transactionYear,
//               applyTo,
//             },
//             transportFee: villageAmount.toString(),
//             Discount: discountForMonth.toString(),
//           });
//         }

//         if (remainingPayment <= 0 && remainingDiscount <= 0) break;
//       }

//       const transactionData = await axios.get(`/transactions/student/${studentID}`);
//       recalculateBalance(transactionData.data, feetype, villageAmount, scholarship, user.date);

//       settransactions(transactionData.data);
//       successAlert("Payment successfully made for selected months");
//       setdate("");
//       setamount("");
//       setdiscount("");
//       setremarks("");
//       setchequeNo("");
//       setbank("");
//       setpaymentType("");
//       setapplyTo({
//         all: false,
//         tuition: false,
//         examination: false,
//         transport: false,
//         maintenance: false,
//         admission: false,
//       });
//     } catch (err) {
//       console.error("Error in handlePayement:", err);
//       errorAlert("Transaction failed.");
//     } finally {
//       setloading(false);
//     }
//   };

//   return (
//     <div>
//       <h3 className="ml-3 mb-2">Student Fee Payment</h3>
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}
//       <div className="row">
//         <div className="col-sm-5">
//           <SearchStudent
//             loading={loadingStudents}
//             studentID={studentID}
//             setstudentID={setstudentID}
//             setclassID={handleSelectClass}
//             handleSearch={handleSelectStudent}
//             classID={classID}
//             year={year}
//             terms={terms}
//             setterms={setterms}
//             setyear={setyear}
//             studentOptions={studentOptions}
//             village={village}
//             setvillage={setvillage}
//             villageOptions={villageOptions}
//           />
//           {show && (
//             <div className="content__container mb-5" style={{ backgroundColor: "#EEF7FF" }}>
//               {scholarship?.percentage > 0 && (
//                 <div style={{ backgroundColor: "#EEF7FF" }}>
//                   <strong style={{ marginLeft: "33px" }}>
//                     Student granted {scholarship?.name} covering -{scholarship?.percentage}% of the fees (excluding admission)
//                   </strong>
//                 </div>
//               )}
//               {totalBill === null || error ? (
//                 <div className="content__container text-center">
//                   <h5 className="text-danger">{error || "Fees not set yet"}</h5>
//                 </div>
//               ) : (
//                 <>
//                   {balance > 0 ? (
//                     <PaymentForm
//                       balance={balance}
//                       amount={amount}
//                       year={year}
//                       scholarship={scholarship}
//                       scholarshipAmount={-scholarshipAmount}
//                       terms={terms}
//                       setterms={setterms}
//                       setyear={setyear}
//                       chequeNo={chequeNo}
//                       setchequeNo={setchequeNo}
//                       bank={bank}
//                       setbank={setbank}
//                       setamount={setamount}
//                       discount={discount}
//                       setdiscount={setdiscount}
//                       date={date}
//                       applyTo={applyTo}
//                       setapplyTo={setapplyTo}
//                       setdate={setdate}
//                       paymentType={paymentType}
//                       setpaymentType={setpaymentType}
//                       remarks={remarks}
//                       setremarks={setremarks}
//                       handlePayement={handlePayement}
//                       loading={loading}
//                     />
//                   ) : (
//                     <div className="content__container text-center">
//                       <h5 className="text-info">Fees fully paid for selected months</h5>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="col-sm-7">
//           {show && (
//             <ViewStudent
//               transactions={transactions}
//               scholarship={scholarship}
//               scholarshipAmount={-scholarshipAmount}
//               user={user}
//               balance={balance ?? 0}
//               feetype={feetype}
//               totalBill={totalBill ?? 0}
//               total={totalPaid}
//               id={studentID}
//               monthlyFees={monthlyFees}
//               village={village}
//               monthlyDiscounts={monthlyDiscounts}
//               totalDiscount={Number(discount) || 0}
//             />
//           )}
//         </div>
//       </div>
//       {loading && <Loading />}
//     </div>
//   );
// }

// export default BillPayment;

// // import React, { useState, useEffect } from "react";
// // import SearchStudent from "./SearchStudent";
// // import PaymentForm from "./PaymentForm";
// // import ViewStudent from "./ViewStudent";
// // import axios from "../../../store/axios";
// // import Loading from "../../../Loading";
// // import { errorAlert, successAlert } from "../../../utils";
// // import FeesList from "./FeesList";
// // import { Button } from "@coreui/coreui";
// // import NumberFormat from "react-number-format";

// // function BillPayment() {
// //   const [years, setyears] = useState("");
// //   const [term, setterm] = useState("");
// //   const [classID, setclassID] = useState("");
// //   const [studentID, setstudentID] = useState("");
// //   const [studentOptions, setstudentOptions] = useState([]);
// //   const [amount, setamount] = useState(0);
// //   const [date, setdate] = useState("");
// //   const [bank, setbank] = useState("");
// //   const [chequeNo, setchequeNo] = useState("");
// //   const [paymentType, setpaymentType] = useState("");
// //   const [applyTo, setapplyTo] = useState({
// //     all: false,
// //     tuition: false,
// //     examination: false,
// //     facility: false,
// //     maintenance: false,
// //     admission: false,
// //   });
// //   const [remarks, setremarks] = useState("");
// //   const [loading, setloading] = useState(false);
// //   const [transactions, settransactions] = useState([]);
// //   const [loadingStudents, setloadingStudents] = useState(false);
// //   const [user, setuser] = useState({});
// //   const [feetype, setfeetype] = useState({});
// //   const [balance, setbalance] = useState(0);
// //   const [totalBill, settotalBill] = useState(0);
// //   const [totalPaid, settotalPaid] = useState(0);
// //   const [scholarshipAmount, setscholarshipAmount] = useState(0);
// //   const [show, setshow] = useState(false);
// //   const [scholarship, setscholarship] = useState(null);
// //   const [payFullYear, setPayFullYear] = useState(false);
// //   const [yearlyTotalBill, setYearlyTotalBill] = useState(0);
// //   const [numTerms, setNumTerms] = useState(3);
// //   const [feeList, setFeeList] = useState(fees);
// //   const [transportFeesList, setTransportFeesList] = useState(transportFees);
// //   const [paymentList, setPaymentList] = useState([]);
// //   const [selectedYear, setSelectedYear] = useState("");

// //   const toggleFeeSelection = (selectedFee) => {
// //     selectedFee.isSelected = !selectedFee.isSelected;
// //     setFeeList([...feeList]);

// //     if (selectedFee.isSelected) {
// //       setPaymentList((prevList) => [...prevList, selectedFee]);
// //       setamount(amount + selectedFee.amount);
// //     } else {
// //       setamount(amount - selectedFee.amount);
// //       setPaymentList((prevList) =>
// //         prevList.filter((fee) => fee.name !== selectedFee.name)
// //       );
// //     }
// //   };

// //   const toggleTransportFeeSelection = (transportFee) => {
// //     transportFee.isSelected = !transportFee.isSelected;
// //     setTransportFeesList([...transportFeesList]);

// //     if (transportFee.isSelected) {
// //       setPaymentList((prevList) => [...prevList, transportFee]);
// //       setamount(amount + transportFee.amount);
// //     } else {
// //       setamount(amount - transportFee.amount);
// //       setPaymentList((prevList) =>
// //         prevList.filter((fee) => fee.name !== transportFee.name)
// //       );
// //     }
// //   };

// //   useEffect(() => {
// //     axios.get("/yeargroup").then((res) => {
// //       setyears(res.data);
// //     });
// //   }, []);

// //   const recalculateBalance = (
// //     updatedTransactions,
// //     currentBill,
// //     currentScholarship
// //   ) => {
// //     let paid = updatedTransactions?.reduce((accumulator, element) => {
// //       return Number(accumulator) + Number(element?.amount);
// //     }, 0);

// //     let scholarshipDeduction = currentScholarship
// //       ? (Number(currentScholarship.percentage) / 100) * currentBill
// //       : 0;

// //     setscholarshipAmount(scholarshipDeduction);
// //     settotalPaid(paid);
// //     setbalance(currentBill - paid - scholarshipDeduction);
// //   };

// //   const calculateFees = async (
// //     selectedStudentID,
// //     selectedTerm,
// //     selectedYear,
// //     isFullYear
// //   ) => {
// //     setloading(true);
// //     setshow(false);

// //     try {
// //       let studentData = await axios.get(
// //         `/students/student/${selectedStudentID}`
// //       );
// //       let student = studentData.data?.student;
// //       setuser(student);

// //       let scholarshipData = await axios.get(
// //         `/scholarships/${student?.scholarship}`
// //       );
// //       let currentScholarship = scholarshipData.data.doc
// //         ? scholarshipData.data.doc
// //         : null;
// //       setscholarship(currentScholarship);

// //       let termFeesData = await axios.get(
// //         `/fees/type/${student?.classID?.toLowerCase()}/${
// //           student?.status || "day"
// //         }`
// //       );
// //       setfeetype(termFeesData?.data);
// //       const examFeeAmount = Number(termFeesData?.data?.exam || 0);

// //       let transactionData = await axios.get(
// //         `/transactions/student/${selectedStudentID}`
// //       );
// //       let allTransactionsForYear = transactionData.data.filter(
// //         (e) => e.fees.academicYear === selectedYear
// //       );
// //       let thisTermTrans = allTransactionsForYear.filter(
// //         (e) => e.fees.term === selectedTerm
// //       );

// //       let hasPaidExamFeeThisYear = allTransactionsForYear.some(
// //         (txn) =>
// //           txn.fees?.applyTo?.examination === true && Number(txn.amount) > 0
// //       );

// //       let termBill = Object.entries(termFeesData?.data || {}).reduce(
// //         (t, [key, value]) => {
// //           if (
// //             ["tution", "facility", "maintenance", "admission", "exam"].includes(
// //               key
// //             )
// //           ) {
// //             return Number(t) + Number(value);
// //           }
// //           if (key === "exam" && !hasPaidExamFeeThisYear) {
// //             return Number(t) + Number(value);
// //           }
// //           return Number(t);
// //         },
// //         0
// //       );

// //       if (isFullYear) {
// //         let calculatedYearlyBill = 0;
// //         const baseTermBillWithoutExam = Object.entries(
// //           termFeesData?.data || {}
// //         ).reduce((t, [key, value]) => {
// //           if (
// //             ["tution", "facility", "maintenance", "admission", "exam"].includes(
// //               key
// //             )
// //           ) {
// //             return Number(t) + Number(value);
// //           }
// //           return Number(t);
// //         }, 0);
// //         calculatedYearlyBill = baseTermBillWithoutExam * numTerms;

// //         if (!hasPaidExamFeeThisYear && examFeeAmount > 0) {
// //           calculatedYearlyBill += examFeeAmount;
// //         }
// //         setYearlyTotalBill(calculatedYearlyBill);

// //         let yearlyPaid = allTransactionsForYear.reduce(
// //           (accumulator, element) => {
// //             return Number(accumulator) + Number(element?.amount);
// //           },
// //           0
// //         );

// //         let yearlyScholarshipDeduction = currentScholarship
// //           ? (Number(currentScholarship.percentage) / 100) * calculatedYearlyBill
// //           : 0;

// //         settransactions(allTransactionsForYear);
// //         settotalBill(calculatedYearlyBill);
// //         settotalPaid(yearlyPaid);
// //         setscholarshipAmount(yearlyScholarshipDeduction);
// //         setbalance(
// //           calculatedYearlyBill - yearlyPaid - yearlyScholarshipDeduction
// //         );
// //       } else {
// //         let termPaid = thisTermTrans.reduce((accumulator, element) => {
// //           return Number(accumulator) + Number(element?.amount);
// //         }, 0);

// //         let termScholarshipDeduction = currentScholarship
// //           ? (Number(currentScholarship.percentage) / 100) * termBill
// //           : 0;

// //         settransactions(thisTermTrans);
// //         settotalBill(termBill);
// //         settotalPaid(termPaid);
// //         setscholarshipAmount(termScholarshipDeduction);
// //         setbalance(termBill - termPaid - termScholarshipDeduction);
// //         setYearlyTotalBill(0);
// //       }

// //       setloading(false);
// //       setshow(true);
// //     } catch (error) {
// //       console.error("Error calculating fees:", error);
// //       errorAlert("Failed to calculate fees. Please check details.");
// //       setloading(false);
// //       setshow(false);
// //     }
// //   };

// //   const handleSelectStudent = async (e) => {
// //     e.preventDefault();
// //     /*     if (!term) return errorAlert("Please select month");
// //     if (!years) return errorAlert("Please select years"); */
// //     if (!studentID) return errorAlert("Please select student");

// //     await calculateFees(studentID, term, years, payFullYear);
// //   };

// //   const handlePayFullYearToggle = async (e) => {
// //     const isChecked = e.target.checked;
// //     setPayFullYear(isChecked);

// //     if (show && studentID && term && years) {
// //       await calculateFees(studentID, term, years, isChecked);
// //     }
// //   };

// //   const handleSelectClass = (id) => {
// //     setloadingStudents(true);
// //     setstudentOptions([]);
// //     setstudentID("");
// //     setclassID(id);
// //     axios
// //       .get(`/students/class/${id}`)
// //       .then((res) => {
// //         setloadingStudents(false);
// //         if (res.data.error) {
// //           errorAlert(res.data.error);
// //           return;
// //         }
// //         setstudentOptions(res.data.users);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         setloadingStudents(false);
// //       });
// //   };

// //   const handlePayement = () => {
// //     setloading(true);
// //     axios
// //       .post("/transactions/create", {
// //         date,
// //         amount,
// //         paymentMethod: paymentType,
// //         type: "income",
// //         description: remarks,
// //         bank,
// //         chequeNumber: chequeNo,
// //         category: "fees",
// //         fees: {
// //           userID: studentID,
// //           term,
// //           academicYear: years,
// //           applyTo,
// //         },
// //       })
// //       .then((res) => {
// //         setloading(false);
// //         if (res.data.error) {
// //           errorAlert(res.data.error);
// //           return;
// //         }

// //         let newTransactions = [res.data.doc, ...transactions];
// //         settransactions(newTransactions);

// //         recalculateBalance(newTransactions, totalBill, scholarship);

// //         successAlert("Payment successfully made");
// //         setdate("");
// //         setamount(0);
// //         setremarks("");
// //         setchequeNo("");
// //         setbank("");
// //         setpaymentType("");
// //       })
// //       .catch(() => {
// //         setloading(false);
// //         errorAlert("Transaction Failed");
// //       });
// //   };

// //   return (
// //     <div>
// //       <h3 className="ml-3 mb-2">Student Fee Payment</h3>
// //       <div className="w-100">
// //         <SearchStudent
// //           loading={loadingStudents}
// //           studentID={studentID}
// //           setstudentID={setstudentID}
// //           setclassID={handleSelectClass}
// //           handleSearch={handleSelectStudent}
// //           classID={classID}
// //           studentOptions={studentOptions}
// //           years={years}
// //           selectedYear={selectedYear}
// //           setSelectedYear={setSelectedYear}
// //         />
// //         {/*  <div className="content__container row mb-3 align-items-center">
// //             <div className="col-sm-9 offset-sm-3">
// //               <div className="form-check">
// //                 <input
// //                   className="form-check-input"
// //                   type="checkbox"
// //                   id="payFullYearCheck"
// //                   checked={payFullYear}
// //                   onChange={handlePayFullYearToggle}
// //                   disabled={loading || loadingStudents}
// //                 />
// //                 <label className="form-check-label" htmlFor="payFullYearCheck">
// //                   Pay Full Year Fees
// //                 </label>
// //               </div>
// //             </div>
// //           </div> */}

// //         {loading && !show && <Loading />}
// //       </div>
// //       {show && (
// //         <ViewStudent
// //           transactions={transactions}
// //           scholarship={scholarship}
// //           scholarshipAmount={-scholarshipAmount}
// //           user={user}
// //           balance={balance}
// //           feetype={feetype}
// //           totalBill={totalBill}
// //           total={totalPaid}
// //           id={studentID}
// //           payFullYear={payFullYear}
// //         />
// //       )}
// //       {loading && !show && <Loading />}
// //       {show && (
// //         <FeesList
// //           feeList={feeList}
// //           handleSelectFee={toggleFeeSelection}
// //           transportFeesList={transportFeesList}
// //           handleSelectTransportFee={toggleTransportFeeSelection}
// //         />
// //       )}

// //       {show && (
// //         <div
// //           className="content__container row mb-3 align-items-center"
// //           style={{
// //             marginTop: "30px",
// //             marginBottom: "30px",
// //             backgroundColor: "#EEF7FF",
// //           }}
// //         >
// //           <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
// //             Make Payment
// //           </h3>
// //           <div className="row mb-3 align-items-center">
// //             <div className="row mb-3">
// //               <label className="col-sm-3 col-form-label">Total Amount : </label>
// //               <div className="col-sm-9">
// //                 <NumberFormat
// //                   value={amount}
// //                   displayType={"text"}
// //                   thousandSeparator={true}
// //                   prefix={"₹"}
// //                   decimalSeparator="."
// //                   decimalScale={2}
// //                 />
// //               </div>
// //             </div>

// //             {/* payment mode options */}
// //             <div className="row mb-3">
// //               <label className="col-sm-3 col-form-label">Remarks</label>
// //               <div className="col-sm-9">
// //                 <select
// //                   style={{ backgroundColor: "#ffffff" }}
// //                   className="form-control"
// //                   value={paymentType}
// //                   onChange={(e) => setpaymentType(e.target.value)}
// //                 >
// //                   <option value="cash">Cash</option>
// //                   <option value="cheque">Cheque</option>
// //                   <option value="online">Online</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="row mb-3">
// //               <label className="col-sm-3 col-form-label">Remarks</label>
// //               <div className="col-sm-9">
// //                 <textarea
// //                   style={{ backgroundColor: "#ffffff" }}
// //                   rows={5}
// //                   className="form-control"
// //                   value={remarks}
// //                   onChange={(e) => setremarks(e.target.value)}
// //                   name="remarks"
// //                 />
// //               </div>
// //             </div>

// //             <button
// //               onClick={handlePayement}
// //               className="btn"
// //               style={{ backgroundColor: "#2ad76c", color: "#fff" }}
// //             >
// //               Pay
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default BillPayment;

// // const fees = [
// //   {
// //     name: "Exam Fees",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "Maintenance Fees",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "Facility Fees",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "April",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "May",
// //     type: "Tuition Fees",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "June",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "July",
// //     type: "Tuition Fees",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "August",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "September",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "October",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "November",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "December",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "January",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "February",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "March",
// //     amount: 1000,
// //     type: "Tuition Fees",
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// // ];

// // const transportFees = [
// //   {
// //     name: "April",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "May",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "June",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "July",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "August",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "September",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "October",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "November",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "December",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "January",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "February",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// //   {
// //     name: "March",
// //     amount: 1000,
// //     status: "Unpaid",
// //     isSelected: false,
// //   },
// // ];