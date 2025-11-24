import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

function CampusForm({ name, setname, location, setlocation, onSubmit, isEdit, loading }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const [textareaRows, setTextareaRows] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                setTextareaRows(10);
            } else {
                setTextareaRows(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setValue("name", name);
        setValue("location", location);
    }, [name, location, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
                <label className="col-xs-12 col-md-3 col-form-label" style={{ fontWeight: 'bold' }}>Name</label>
                <div className="col-sm-12 col-md-9">
                    <input
                        style={{ backgroundColor: "#ffffff" }}
                        type="text"
                        {...register('name', { required: "Name is required" })}
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    />
                    {errors.name && (
                        <span className="form-error text-danger mb-2">{errors.name.message}</span>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-xs-12 col-md-3 col-form-label" style={{ fontWeight: 'bold' }}>Location</label>
                <div className="col-sm-12 col-md-9">
                    <textarea
                        placeholder="Location"
                        style={{ backgroundColor: "#ffffff" }}
                        rows={textareaRows}
                        {...register('location', { required: "Location is required" })}
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                        className={`form-control ${errors.location ? "is-invalid" : ""}`}
                    ></textarea>
                    {errors.location && (
                        <span className="form-error text-danger mb-2">{errors.location.message}</span>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <div className="offset-md-3 col-xs-12 col-md-9">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn red__btn"
                    >
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {isEdit ? "Save Changes" : "Add"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CampusForm;
