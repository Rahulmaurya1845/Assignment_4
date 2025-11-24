import React from "react";
import { useForm } from "react-hook-form";

export default function AddClassGroup({ name, setname, onSubmit, loading }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content__container" style={{ backgroundColor: "#EEF7FF" }}>
      <h3>Add New Class Group</h3>
      <div className="mb-3">
        <label className="form-label"> Name</label>
        <input
          style={{ backgroundColor: "#ffffff" }}
          type="text"
          value={name}
          ref={register({ required: true })}
          onChange={(e) => setname(e.target.value)}
          className="form-control"
          name="name"
        />
        {errors.name && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <button disabled={loading} type="submit" className="btn red__btn">
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {"Add"}
        </button>
      </div>
    </form>
  );
}
