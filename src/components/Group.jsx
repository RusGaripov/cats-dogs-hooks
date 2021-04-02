import React from "react";

const Group = (response) => {
  let a = "";
  const tagImage = (e) => {
    for (var i = 0; i < response.testObject.length; i++) {
      if (e.target.src === response.objectUrls[i]) {
        a = response.testObject[i].tag;
        response.imageTag(a);
      }
    }
  };

  if (response && response.arr !== []) {
    return (
      <div>
        {Object.keys(response.arr).map((num, index) => (
          <div
            style={{
              marginLeft: "25px",
              marginTop: "25px",
            }}
            num={num}
            key={index}
          >
            <div style={{ margin: "20px" }}>{response.arr[num].tag}</div>
            {response.arr[0] &&
              response.arr[num].urls.map((item, index) => {
                return (
                  <div
                    className="card-group"
                    style={{
                      display: "inline-flex",
                      width: "18rem",
                      height: "18rem",
                      maxWidth: "18rem",
                      minWidth: "18rem",
                      margin: "20px",
                    }}
                  >
                    <img
                      item={index}
                      src={item}
                      onClick={tagImage}
                      className="card-img-top"
                      style={{ width: "18rem", height: "18rem" }}
                    />
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    );
  }
};

export default Group;
