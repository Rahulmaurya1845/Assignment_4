import React, { useState, useEffect } from "react";
import Table from "./SalesTable";
import AddSales from "./AddSales";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useHistory } from "react-router-dom";

function Sales() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [buyitems, setBuyitems] = useState([
    {
      qty: 0,
      rate: 0,
      discount: 0.0,
      amount: 0,
      name: "",
      id: 0,
      itemID: "",
    },
  ]);

  useEffect(() => {
    axios.get("/store/sales").then((res) => {
      setData(res.data);
      setFilteredData(res.data);
      fetchStudentDetails(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/store/items").then((res) => {
      setItems(res.data);
    });
  }, []);


  const fetchStudentDetails = async (salesData) => {
    let studentData = {};

    for (let sale of salesData) {
      if (!studentData[sale.name]) {
        try {
          const res = await axios.get(`/students/student/${sale.name}`);
          studentData[sale.name] = res.data.student;
        } catch (error) {
          console.error(`Error fetching student ${sale.name}:`, error);
        }
      }
    }

    setStudentDetails(studentData);
  };


  const handleSearch = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((sale) =>
        sale.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (classQuery) {
      filtered = filtered.filter(
        (sale) =>
          studentDetails[sale.name]?.classID?.toLowerCase() ===
          classQuery.toLowerCase()
      ); // 🔥 Exact match for class
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, classQuery, data, studentDetails]); // Re-run filter when inputs or data change

  const calculateAmount = (rate, discount, qty) => {
    if (rate || discount || qty) {
      let amnt = Number(rate) * Number(qty);
      let finalAmount = amnt - Number(discount);
      return finalAmount > 0 ? finalAmount.toFixed(2) : "0.00";
    }
    return "0.00";
  };

  const handleChangeDiscount = (e, i) => {
    let value = e.trim() === "" ? "" : Number(e);
    setBuyitems(
      buyitems.map((obj) =>
        obj.id === i
          ? {
            ...obj,
            discount: value,
            amount: calculateAmount(obj.rate, value, obj.qty),
          }
          : obj
      )
    );
  };

  const handleChangeQty = (e, i) => {
    setBuyitems(
      buyitems.map((obj) =>
        obj.id === i
          ? {
            qty: Number(e),
            amount: calculateAmount(obj.rate, obj.discount, e),
            name: obj.name,
            rate: obj.rate,
            discount: obj.discount,
            itemID: obj.itemID,
            id: i,
          }
          : obj
      )
    );
  };

  const handleSetitem = (id, index) => {
    let item = items.find((e) => e._id === id);
    setBuyitems(
      buyitems.map((obj) =>
        obj.id === index
          ? {
            name: item.name,
            rate: item.price,
            itemID: item._id,
            amount: item.price,
            discount: 0.0,
            id: index,
            qty: 1,
          }
          : obj
      )
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setBuyitems([
      ...buyitems,
      {
        qty: 0,
        rate: 0,
        discount: 0.0,
        amount: 0,
        name: "",
        id: buyitems.length,
        itemID: "",
      },
    ]);
  };

  const totalprice = buyitems.reduce((sum, obj) => sum + Number(obj.amount), 0);

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!name) {
      return errorAlert("please select student");
    }
    setLoading(true);
    axios
      .post("/store/sales/create", {
        amountPaid: amount,
        totalCost: totalprice,
        name,
        items: buyitems,
        seller: "admin",
      })
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }
        successAlert("Payment successfully added");
        history.push(`/store/sales/receipt/${res.data.doc?._id}`);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h3>Store Sales</h3>
      <div
        className="mb-3 d-flex justify-content-between content__container"
        style={{ backgroundColor: "#EEF7FF" }}
      >
        <div>
          <button onClick={() => setOpen(true)} className="btn blue__btn">
            New Sale
          </button>
        </div>
        <div className="d-flex">

          <input
            placeholder="Search by Student ID..."
            className="form-control mx-2"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: "#ffffff" }}
          />

          <input
            placeholder="Search by Class..."
            className="form-control"
            type="text"
            value={classQuery}
            onChange={(e) => setClassQuery(e.target.value)}
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>
      </div>

      <Table data={filteredData} studentDetails={studentDetails} />

      <AddSales
        student={name}
        setstudent={setName}
        amount={amount}
        setamount={setAmount}
        buyitems={buyitems}
        handleChangeQty={handleChangeQty}
        handleAddItem={handleAddItem}
        items={items}
        open={open}
        loading={loading}
        handleAddSale={handleAddSale}
        totalprice={totalprice}
        handleChangeDiscount={handleChangeDiscount}
        handleSetitem={handleSetitem}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Sales;
