import { useState, useEffect } from "react";
import axios from "axios";

export default (url) => {
  const baseUrl =
    "https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    if (url[0] === "delay") {
      const axiosFunc = () => {
        axios(
          "https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx"
        )
          .then((res) => {
            setResponse(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error.response.data);
            setIsLoading(false);
          });
      };
      setInterval(axiosFunc, 3000);
    } else {
      for (var i = 0; i < url.length; i++) {
        axios(baseUrl + url[i], options)
          .then((res) => {
            setResponse(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error.response.data);
            setIsLoading(false);
          });
      }
    }
  }, [isLoading, url[0], options]);

  return [{ isLoading, response, error }, doFetch];
};
