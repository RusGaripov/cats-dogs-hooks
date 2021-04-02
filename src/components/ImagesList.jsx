import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "../hooks/useFetch";
import Images from "./Images";
import Group from "./Group";
import Error from "../components/Error/Error";
import useLocalStorage from "../hooks/useLocalStorage";

const ImagesList = () => {
  const [tag, setTag] = useState("");

  const [{ response, isLoading, error }, doFetch] = useFetch([""]);

  const [imageUrl, setImageUrl] = useLocalStorage("imageUrl");
  const [clean, setCleaner] = useState(false);
  const [group, setGroup] = useState(false);
  var arr = [];

  var testObject = [];
  var objectUrls = [];

  testObject = JSON.parse(localStorage.getItem("testObject")) || [];
  arr = JSON.parse(localStorage.getItem("arr")) || [];
  objectUrls = JSON.parse(localStorage.getItem("objectUrls")) || [];

  useEffect(() => {
    arr = testObject;
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].tag === arr[j].tag) {
          arr[i].urls.push(testObject[j].urls[0]);
        }
      }
    }

    function itemCheck(item) {
      if (arr.indexOf(item.tag) === -1) {
        arr.push(item.tag);
        return true;
      }
      return false;
    }
    arr = arr.filter((item) => itemCheck(item));
    localStorage.setItem("arr", JSON.stringify(arr));

    if (group === true) {
      document.getElementById("group").innerHTML = "Разгруппировать";
    } else {
      localStorage.setItem("objectUrls", JSON.stringify(objectUrls));
      document.getElementById("group").innerHTML = "Группировать";
    }
  }, [group]);

  useEffect(() => {}, [response]);

  useEffect(() => {
    if (response) {
      testObject.push({ tag: tag, urls: [response.data.image_url] });
      objectUrls.push(response.data.image_url);

      if (response.data.length === 0)
        alert(`No one image with tag ${tag} found`);
      localStorage.setItem("testObject", JSON.stringify(testObject));
      localStorage.setItem("objectUrls", JSON.stringify(objectUrls));
      localStorage.setItem("arr", JSON.stringify(arr));
      setImageUrl(response.data.image_url);
      arr = testObject;

      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].tag === arr[j].tag) {
            arr[i].urls.push(testObject[j].urls[0]);
          }
        }
      }

      function itemCheck(item) {
        if (arr.indexOf(item.tag) === -1) {
          arr.push(item.tag);
          return true;
        }
        return false;
      }
      arr = arr.filter((item) => itemCheck(item));

      localStorage.setItem("arr", JSON.stringify(arr));
    }
    setTag("");
  }, [response]);

  useEffect(() => {
    localStorage.clear();
    testObject = [];
    setImageUrl([]);
    setTag("");
  }, [clean]);

  const handleSubmit = (event) => {
    event.preventDefault();
    doFetch();
  };

  const imageTag = (a) => {
    setTag(a);
    alert(a);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "600px",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <input
          required
          pattern="[a-z,A-Z]{1,10}"
          title="Для корректной загрузки данных поле обязательно должно содержать данные, причем допускаются только латинские буквы, допускается не более 10 символов"
          type="text"
          placeholder="введите тег"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          style={{ marginRight: "15px" }}
        ></input>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-success"
          style={{ marginRight: "15px" }}
        >
          Загрузить
        </button>
        <button
          type="button"
          onClick={() => setCleaner(!clean)}
          className="btn btn-danger"
          style={{ marginRight: "15px" }}
        >
          Очистить
        </button>
        <button
          type="button"
          onClick={() => setGroup(!group)}
          className="btn btn-warning"
          id="group"
        >
          Группировать
        </button>
      </form>

      {response && !group && (
        <Images
          imageTag={imageTag}
          objectUrls={objectUrls}
          testObject={testObject}
          arr={arr}
          response={response.data.image_url}
        />
      )}

      {group && (
        <Group
          imageTag={imageTag}
          arr={arr}
          isLoading={isLoading}
          error={error}
          objectUrls={objectUrls}
          testObject={testObject}
          response={response.data.image_url}
        />
      )}

      {error && <Error error={error} />}
    </div>
  );
};

export default ImagesList;
