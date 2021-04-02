import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const Images = (response) => {
  let a = "";

  const tagImage = (e) => {
    for (var i = 0; i < response.testObject.length; i++) {
      if (e.target.src === response.testObject[i].urls[0]) {
        a = response.testObject[i].tag;
        response.imageTag(a);
      }
    }
  };
  if (response.arr) {
    return (
      <div
        className="card-group"
        style={{
          marginLeft: "25px",
          marginTop: "25px",
          justifyContent: "flex-start",
        }}
      >
        {response.objectUrls &&
          response.objectUrls.map((item, index) => {

            return (
              <div
                className="card"
                key={index}
                style={{
                  width: "18rem",
                  height: "18rem",
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  margin: "20px",
                }}
              >
                <img
                  className="card-img-top"
                  style={{ width: "18rem", height: "18rem" }}
                  key={index}
                  src={item}
                  onClick={tagImage}
                />
              </div>
            );
          })}
      </div>
    );
  }
};

export default Images;
