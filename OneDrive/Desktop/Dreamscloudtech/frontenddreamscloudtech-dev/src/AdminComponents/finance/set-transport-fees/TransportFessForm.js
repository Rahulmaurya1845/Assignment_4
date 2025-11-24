import React, { useState } from 'react'
import { currentCurrency, errorAlert, successAlert } from "../../../utils";
import { useForm } from 'react-hook-form';
import axios from "../../../store/axios";

function TransportFessForm() {
    const { register, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [villageName, setVillageName] = useState("");
    const [amount, setAmount] = useState("");
    const handleSubmit = () => {
        setLoading(true);
        axios.post("/transport/add-fees", { village: villageName, amount }).then((res) => {
            setLoading(false);
            if (res.data.success) {
                successAlert("Transport fees created successfully");
                setVillageName("");
                setAmount("");
            } else {
                errorAlert("Something went wrong");
            }
        });
    };
    return (
        <div>
            <form className="row content__container" action="">

                <div className="col-md-10 mb-3">
                  

                    <div className="row mb-2">
                        <label className="col-2 form-label">Village name</label>
                        <div className="col-10">
                            <div className="input-group">
                               
                                <input
                                    value={villageName}
                                    onChange={(e) => setVillageName(e.target.value)}
                                    type="string"
                                    ref={register({ min: 0 })}
                                    className="form-control"
                                    name="maintenance"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label className="col-2 form-label">Amount</label>
                        <div className="col-10">
                            <div className="input-group">
                                <div className="input-group-text">{currentCurrency()}</div>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    ref={register({ min: 0 })}
                                    className="form-control"
                                    name="exam"
                                />
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="col-md-6 md-3">
                    <button
                        disabled={loading}
                        onClick={() => handleSubmit()}
                        className="btn blue__btn"
                    >
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        {"Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TransportFessForm