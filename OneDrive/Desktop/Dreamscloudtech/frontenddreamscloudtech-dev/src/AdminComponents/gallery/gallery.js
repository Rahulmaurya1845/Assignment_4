import React, { useState, useEffect, useRef } from "react";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Fetch all images when the component mounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/images`)
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error("Error fetching images:", err));
    }, []);

    // Upload Image
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/images/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setImages((prev) => [data.image, ...prev]);
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    // Delete Image
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/images/delete/${id}`, {
                method: "DELETE",
            });

            setImages((prev) => prev.filter((img) => img._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (

        <div style={styles.container}>
            <h2 style={styles.heading}>Gallery</h2>

            {/* <input type="file" onChange={handleUpload} disabled={uploading} /> */}
            {uploading && <p style={styles.uploading}>Uploading...</p>}

            <div style={styles.gallery}>
                {images.length === 0 ? (
                    <p>No images found.</p>
                ) : (
                    images.map((img) => (
                        <div key={img._id} style={styles.card} data-id="card">
                            <img
                                src={img.image}

                                alt="gallery"
                                style={styles.image}
                                onClick={() => setSelectedImage(img.image)}
                            />
                            <button
                                onClick={() => handleDelete(img._id)}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    style={styles.hiddenInput}
                    onChange={handleUpload}
                    disabled={uploading}
                />

                {/* Custom Add Button */}
                <button
                    style={styles.addButton}
                    onClick={() => fileInputRef.current.click()}
                    title="Add Image"
                >
                    + Add
                </button>
                {/* Modal View */}
                {selectedImage && (
                    <div
                        style={styles.modalOverlay}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button style={styles.closeButton} onClick={() => setSelectedImage(null)}>×</button>
                        <img
                            src={selectedImage}
                            alt="fullscreen"
                            style={styles.modalImage}
                        />
                    </div>
                )}
            </div>


            <style>
                {`
          [data-id="card"] {
            position: relative;
            overflow: hidden;
          }
          [data-id="card"] button {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 6px 14px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          [data-id="card"]:hover button {
            opacity: 1;
          }
        `}
            </style>
        </div>


    );
};


const styles = {
    container: {
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
    },
    heading: {
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    uploading: {
        color: "#28a745",
        fontWeight: "bold",
        marginTop: "10px",
    },
    gallery: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "30px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        height: "350px", // fix height for consistent cards
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    image: {
        width: "100%",
        height: "100%", // consistent image height
        objectFit: "contain",
        borderRadius: "6px",

    },
    button: {
        marginTop: "10px",
        padding: "6px 14px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        position: "absolute",
        bottom: "15px",
        // padding: "6px 14px",
        // backgroundColor: "#dc3545",
        // color: "#fff",
        // border: "none",
        // borderRadius: "5px",
        // cursor: "pointer",
        transition: "opacity 0.3s ease",
    },

    hiddenInput: {
        display: "none",
    },
    addButton: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px 16px",
        borderRadius: "50%",
        fontSize: "20px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '40px',
        cursor: 'pointer',
    },
    modalImage: {
        maxHeight: '90%',
        maxWidth: '90%',
        objectFit: 'contain',
        borderRadius: '12px',
        backgroundColor: '#fff',
        padding: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        fontSize: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },


};

export default Gallery;